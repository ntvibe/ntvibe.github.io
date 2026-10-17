// gel lab.: custom depth-resolved jelly transport shader
// Live homogeneous-medium approximation; not an offline volumetric path tracer.
// Entry points: vsFull/fsCopy, vsJelly/fsJelly, vsLine/fsLine.
// Bindings 4/5 are current light-space entry and exit depth maps.
// Binding 6 contains 72 animated ellipsoid frames for the internal air pockets.


struct U {
  viewProj: mat4x4f,
  view: mat4x4f,
  invViewProj: mat4x4f,
  lightVP: mat4x4f,
  topVP: mat4x4f,
  camPos: vec4f,     // xyz, w = time
  camFwd: vec4f,
  keyDir: vec4f,     // xyz toward light, w = intensity
  screen: vec4f,     // w, h, 1/w, 1/h
  flesh: vec4f,      // transmission tint of the flesh
  fleshDeep: vec4f,  // scattering albedo of the flesh
  pale: vec4f,
  skin: vec4f,
  stripe: vec4f,
  seed: vec4f,
  shape: vec4f,      // T, Ro, internal depth-blur strength, reduced scattering coefficient
  misc: vec4f,       // exposure, meshAlpha, floorY, unused
  bg: vec4f,
  shadowTint: vec4f,
};

const PI = 3.14159265;

fn hash3(p: vec3f) -> f32 {
  var q = fract(p * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
fn vnoise(p: vec3f) -> f32 {
  let i = floor(p); let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = mix(mix(hash3(i + vec3f(0,0,0)), hash3(i + vec3f(1,0,0)), u.x), mix(hash3(i + vec3f(0,1,0)), hash3(i + vec3f(1,1,0)), u.x), u.y);
  let b = mix(mix(hash3(i + vec3f(0,0,1)), hash3(i + vec3f(1,0,1)), u.x), mix(hash3(i + vec3f(0,1,1)), hash3(i + vec3f(1,1,1)), u.x), u.y);
  return mix(a, b, u.z);
}
fn fbm(p: vec3f) -> f32 {
  return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.13 + 7.1) + 0.15 * vnoise(p * 4.37 + 3.3);
}

// rounded rectangle softbox seen along direction d
fn softbox(d: vec3f, c: vec3f, up: vec3f, size: vec2f, blur: f32) -> f32 {
  let cd = dot(d, c);
  if (cd <= 0.0) { return 0.0; }
  let t1 = normalize(cross(up, c));
  let t2 = cross(c, t1);
  let uv = vec2f(dot(d, t1), dot(d, t2)) / cd;
  let q = abs(uv) - size;
  let sd = length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - 0.008;
  let profile=exp(-dot(uv/size,uv/size)*0.42);
  return (1.0-smoothstep(-blur,blur,sd))*profile;
}

// Photographed studio radiance and finite emitter cards are baked together.
// Filtering preserves linear energy; no procedural light evaluation per pixel.
@group(0) @binding(7) var studioRadiance:texture_2d<f32>;
@group(0) @binding(8) var studioSampler:sampler;
fn studioEnv(d:vec3f,rough:f32,bg:vec3f)->vec3f {
 let direction=normalize(d);
 let uv=vec2f(atan2(direction.z,direction.x)/(2.0*PI)+0.62,acos(clamp(direction.y,-1.0,1.0))/PI);
 let footprint=max(1.0,rough*rough*f32(textureDimensions(studioRadiance).x)/(2.0*PI));
 let lod=clamp(log2(footprint),0.0,f32(textureNumLevels(studioRadiance)-1u));
 return textureSampleLevel(studioRadiance,studioSampler,uv,lod).rgb;
}
// Offline, solid-angle weighted 9-coefficient RGB SH of the baked studio.
// Cosine convolution bands: pi, 2pi/3, pi/4; returns irradiance E/pi.
fn studioDiffuse(N:vec3f)->vec3f {
 let n=normalize(N);
 var E=vec3f(0.0);
 E+=vec3f(1.4637586702,1.4430671119,1.5475497617)*(0.2820947918);
 E+=vec3f(-0.2742073927,-0.0205879231,0.1544125487)*(0.4886025119*n.x);
 E+=vec3f(0.4180685827,0.3755104544,0.3963415204)*(0.4886025119*n.y);
 E+=vec3f(0.1433423318,0.1421012581,0.1302945371)*(0.4886025119*n.z);
 E+=vec3f(-0.0723775823,-0.0153932425,0.0180955461)*(1.0925484306*n.x*n.y);
 E+=vec3f(0.0709159241,0.0575905484,0.0377956440)*(1.0925484306*n.y*n.z);
 E+=vec3f(-0.0285285373,-0.0471065635,-0.0569544673)*(0.3153915653*(3.0*n.z*n.z-1.0));
 E+=vec3f(-0.1192135316,-0.0265151579,0.0503696553)*(1.0925484306*n.x*n.z);
 E+=vec3f(0.1561991575,0.1840332693,0.2149281492)*(0.5462742153*(n.x*n.x-n.y*n.y));
 return max(E,vec3f(0.0));
}

// Exact unpolarized dielectric Fresnel, including the gel-to-air critical angle.
fn dielectricFresnel(cosine:f32,etaI:f32,etaT:f32)->f32{
 let c=clamp(abs(cosine),0.0,1.0);let eta=etaI/etaT;
 let sinT2=eta*eta*(1.0-c*c);
 if(sinT2>=1.0){return 1.0;}
 let ct=sqrt(max(0.0,1.0-sinT2));
 let rs=(etaI*c-etaT*ct)/max(etaI*c+etaT*ct,0.00001);
 let rp=(etaT*c-etaI*ct)/max(etaT*c+etaI*ct,0.00001);
 return (rs*rs+rp*rp)*0.5;
}

fn ggx(N: vec3f, V: vec3f, L: vec3f, rough: f32) -> f32 {
  let H = normalize(V + L);
  let a = max(rough * rough, 0.002);
  let a2 = a * a;
  let NdH = max(dot(N, H), 0.0);
  let NdL = max(dot(N, L), 0.0);
  let NdV = max(dot(N, V), 1e-3);
  let dd = NdH * NdH * (a2 - 1.0) + 1.0;
  let D = a2 / (PI * dd * dd);
  let k = a * 0.5;
  let G = (NdL / (NdL * (1.0 - k) + k)) * (NdV / (NdV * (1.0 - k) + k));
  return D * G / max(4.0 * NdL * NdV, 1e-3) * NdL;
}

fn linearDepth(p: vec3f) -> f32 { return dot(p - u.camPos.xyz, u.camFwd.xyz); }


@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var sceneTex: texture_2d<f32>;
@group(0) @binding(2) var backTex: texture_2d<f32>;
@group(0) @binding(3) var lin:sampler;
@group(0) @binding(4) var lightEntry:texture_depth_2d;
@group(0) @binding(5) var lightExit:texture_depth_2d;

@vertex fn vsFull(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u)) * 2.0 - 1.0;
  return vec4f(p, 0.0, 1.0);
}
struct MaterialOut {
 @location(0) surface: vec4f,
 @location(1) diffusion: vec4f,
 @location(2) guide: vec4f,
};
@fragment fn fsCopy(@builtin(position) fc: vec4f) -> MaterialOut {
 var o:MaterialOut;o.surface=vec4f(textureLoad(sceneTex,vec2i(fc.xy),0).rgb,0.0);
 o.diffusion=vec4f(0.0);o.guide=vec4f(0.0);return o;
}

struct VIn { @location(0) p: vec3f, @location(1) n: vec3f, @location(2) rest: vec3f, @location(3) mat: f32 };
struct VOut { @builtin(position) pos: vec4f, @location(0) wp: vec3f, @location(1) n: vec3f, @location(2) rest: vec3f, @location(3) @interpolate(flat) cut:f32 };
@vertex fn vsJelly(v: VIn) -> VOut {
  var o: VOut;
  o.pos = u.viewProj * vec4f(v.p, 1.0);
  o.wp = v.p; o.n = v.n; o.rest = v.rest; o.cut=select(0.0,1.0,v.mat==3.0);
  return o;
}

fn toUV(p: vec3f) -> vec2f {
  let c = u.viewProj * vec4f(p, 1.0);
  let n = c.xy / c.w;
  return vec2f(n.x * 0.5 + 0.5, 0.5 - n.y * 0.5);
}

fn readBack(uv:vec2f)->vec4f {
 let p=clamp(uv*u.screen.xy-0.5,vec2f(0.0),u.screen.xy-1.001);
 let lo=vec2i(floor(p));let f=fract(p);let hi=min(lo+vec2i(1),vec2i(u.screen.xy)-1);
 let a=textureLoad(backTex,lo,0);let b=textureLoad(backTex,vec2i(hi.x,lo.y),0);
 let c=textureLoad(backTex,vec2i(lo.x,hi.y),0);let d=textureLoad(backTex,hi,0);
 let wa=(1.0-f.x)*(1.0-f.y)*select(0.0,1.0,a.r>0.0);
 let wb=f.x*(1.0-f.y)*select(0.0,1.0,b.r>0.0);
 let wc=(1.0-f.x)*f.y*select(0.0,1.0,c.r>0.0);
 let wd=f.x*f.y*select(0.0,1.0,d.r>0.0);
 return (a*wa+b*wb+c*wc+d*wd)/max(wa+wb+wc+wd,0.0001);
}


// Custom homogeneous jelly medium. Lengths are simulation units (1 unit ~= 3.5 cm).
// The coefficients below are art-directed, not measurements of a particular food.
const GEL_IOR:f32=1.38;
const SIGMA_S:f32=0.28;
const ANISOTROPY:f32=0.65;
const VOLUME_STEPS:i32=8;
const PROJECTION_TAN_HALF_FOV:f32=0.2400788;
// Spectral scattering and absorption share the same finite radiance budget.
// The medium's RGB scattering albedo produces dye colour before diffusion.
fn scatteringCoefficient()->vec3f{return vec3f(SIGMA_S)*clamp(u.fleshDeep.rgb,vec3f(0.05),vec3f(1.0));}
fn reducedCoefficient()->vec3f{return scatteringCoefficient()*(1.0-ANISOTROPY);}


fn phaseHG(cosTheta:f32,g:f32)->f32 {
 let denominator=max(1.0+g*g-2.0*g*cosTheta,0.001);
 return (1.0-g*g)/(4.0*PI*denominator*sqrt(denominator));
}

// The actual entry/exit surfaces are rendered in light space each frame.
// Unlike a view-thickness glow, this measures attenuation from the lamp to an
// interior point of the current deformed volume.
fn lightDistance(p:vec3f,fallback:f32)->f32 {
 let q=u.lightVP*vec4f(p,1.0);
 let uv=vec2f(q.x*0.5+0.5,0.5-q.y*0.5);
 if(any(uv<vec2f(0.0))||any(uv>vec2f(1.0))){return fallback;}
 let size=vec2i(textureDimensions(lightEntry));
 let texel=clamp(uv*vec2f(size)-0.5,vec2f(0.0),vec2f(size)-1.001);
 let base=vec2i(floor(texel));let f=fract(texel);
 let center=clamp(vec2i(uv*vec2f(size)),vec2i(0),size-1);
 let rear=textureLoad(lightExit,center,0);
 var entry=0.0;var valid=0.0;
 // Bilinear light-entry depth removes the grid imprint of coarse quadrature.
 for(var y=0;y<2;y++){for(var x=0;x<2;x++){
  let depth=textureLoad(lightEntry,min(base+vec2i(x,y),size-1),0);
  let w=select(1.0-f.x,f.x,x==1)*select(1.0-f.y,f.y,y==1);
  if(depth<0.9999&&rear>depth){entry+=depth*w;valid+=w;}
 }}
 if(valid<0.001){return fallback;}
 return max(0.0,q.z-entry/valid)*13.9;

}

struct VolumeLighting { single:vec3f,multiple:vec3f };
fn integrateVolume(entry:vec3f,exit:vec3f,ray:vec3f,sigmaA:vec3f)->VolumeLighting {
 let distance=max(length(exit-entry),0.001);
 let stepSize=distance/f32(VOLUME_STEPS);
 let sigmaS=scatteringCoefficient();
 let sigmaT=sigmaA+sigmaS;
 let reducedS=reducedCoefficient();
 let sigmaTransport=sqrt(3.0*sigmaA*(sigmaA+reducedS));
 let transportAlbedo=reducedS/(sigmaA+reducedS);
 let lampAxis=u.keyDir.xyz;
 let lampX=normalize(cross(lampAxis,vec3f(0.0,1.0,0.0)));let lampY=cross(lampX,lampAxis);
 var phase=0.0;
 for(var sample=0;sample<7;sample++){
  let phi=f32(sample)*2.399963;let radius=sqrt((f32(sample)+0.5)/7.0)*0.22;
  let direction=normalize(lampAxis+(lampX*cos(phi)+lampY*sin(phi))*radius);
  // A normalized forward/backward mixture keeps wide-angle fill physical.
  let cosine=clamp(dot(ray,direction),-1.0,1.0);
  phase+=(0.86*phaseHG(cosine,ANISOTROPY)+0.14*phaseHG(cosine,-0.18))/7.0;
 }
 // Two-sided boundary illumination in a local plane-parallel slab. This is
 // diffuse incoming radiance, not an emissive interior or a surface wrap.
 let frontAmbient=studioDiffuse(-ray)*0.18+vec3f(0.025);
 let backAmbient=studioDiffuse(ray)*0.26+vec3f(0.055);
 let lamp=vec3f(1.0,0.93,0.86)*u.keyDir.w;
 // Exact view attenuation over each segment avoids dimming or oversampling
 // when the deterministic quadrature is reduced from 32 to eight samples.
 let segmentIntegral=(vec3f(1.0)-exp(-sigmaT*stepSize))/sigmaT;
 var o:VolumeLighting;o.single=vec3f(0.0);o.multiple=vec3f(0.0);
 for(var k=0;k<VOLUME_STEPS;k++){
  let travel=(f32(k)+0.5)*stepSize;
  let point=entry+ray*travel;
  let illuminationPath=lightDistance(point,distance*0.5);
  let viewIntegral=exp(-sigmaT*f32(k)*stepSize)*segmentIntegral;
  let lightTransmission=exp(-sigmaT*illuminationPath);
  // Beer-Lambert transport and normalized Henyey-Greenstein single scattering.
  o.single+=viewIntegral*lightTransmission*lamp*sigmaS*phase;
  // A finite-body reduced-scattering diffusion source. It fills the deep body,
  // rather than adding the same wrapped-light term to every surface fragment.
  let diffuseSource=lamp*transportAlbedo*exp(-sigmaTransport*illuminationPath)
    *(1.0-exp(-reducedS*illuminationPath))*reducedS/(4.0*PI);
  let boundaryFill=sigmaS*0.5*(frontAmbient*exp(-sigmaT*travel)
    +backAmbient*exp(-sigmaT*(distance-travel)));
  o.multiple+=viewIntegral*(diffuseSource+boundaryFill);
 }
 return o;
}

struct InternalRadiance { ballistic:vec3f,scattered:vec3f,blurPixels:f32 };
fn sampleInternal(uv:vec2f,front:f32,cosView:f32,maxPath:f32,sigmaA:vec3f)->InternalRadiance {
 let sharp=textureSampleLevel(sceneTex,lin,uv,0.0);
 // Only level-zero depth is used. Averaging radiance mips must never invent depth.
 let path=clamp((sharp.a-front)/cosView,0.0,maxPath);
 let reducedS=SIGMA_S*(1.0-ANISOTROPY);
 // The transmitted background is filtered with an optical-path-dependent cone.
 // Air pockets are evaluated separately by embeddedBubbles below.
 let variance=reducedS*path*path*path/3.0;
 let worldSigma=sqrt(max(variance,0.0))*0.16*max(u.shape.z,0.0);
 let projection=u.screen.y/(2.0*PROJECTION_TAN_HALF_FOV*max(front,0.1));
 let sigmaPixels=worldSigma*projection;
 let lod=clamp(log2(max(1.0,sigmaPixels*1.25)),0.0,f32(textureNumLevels(sceneTex)-1u));
 var soft=vec3f(0.0);var norm=0.0;
 for(var k=0;k<9;k++){
  let angle=f32(k)*2.399963;
  let radius=sqrt((f32(k)+0.5)/9.0);
  let offset=vec2f(cos(angle),sin(angle))*sigmaPixels*radius*u.screen.zw;
  let w=exp(-radius*radius*0.5);
  soft+=textureSampleLevel(sceneTex,lin,clamp(uv+offset,vec2f(0.001),vec2f(0.999)),lod).rgb*w;
  norm+=w;
 }
 soft/=norm;
 let tau=(sigmaA+scatteringCoefficient())*path;
 let ballisticWeight=exp(-tau);
 let scatteringAlbedo=scatteringCoefficient()/(sigmaA+scatteringCoefficient());
 let scatteredWeight=(vec3f(1.0)-ballisticWeight)*scatteringAlbedo*exp(-sigmaA*path*0.35);
 // Preserve the radiance budget; redistribution cannot exceed the input energy.
 let remaining=vec3f(1.0)-ballisticWeight;
 var o:InternalRadiance;
 // Forward-filter the attenuated background as well as the scattered lobe.
 let forwardLOD=clamp(log2(max(1.0,sigmaPixels*0.65)),0.0,f32(textureNumLevels(sceneTex)-1u));
 let forward=textureSampleLevel(sceneTex,lin,uv,forwardLOD).rgb;
 o.ballistic=forward*ballisticWeight;
 o.scattered=soft*min(scatteredWeight,remaining);
 o.blurPixels=sigmaPixels;
 return o;
}

struct Bubble { center:vec4f, inverseX:vec4f,inverseY:vec4f,inverseZ:vec4f };
struct BubbleVolume { pockets:array<Bubble,72> };
@group(0) @binding(6) var<uniform> bubbleVolume:BubbleVolume;
@group(0) @binding(9) var<storage,read> bubbleCache:array<vec4f,72>;
struct BubbleLight { radiance:vec3f,occlusion:f32 };
fn localPoint(b:Bubble,p:vec3f)->vec3f{
 return vec3f(dot(b.inverseX.xyz,p),dot(b.inverseY.xyz,p),dot(b.inverseZ.xyz,p));
}
fn pocketNormal(b:Bubble,q:vec3f)->vec3f{
 return normalize(b.inverseX.xyz*q.x+b.inverseY.xyz*q.y+b.inverseZ.xyz*q.z);
}
// Evaluate a real curved air interface, not an emissive annulus.
fn pocketSample(b:Bubble,origin:vec3f,ray:vec3f,maxTravel:f32,blur:f32)->vec4f{
 let o=localPoint(b,origin-b.center.xyz);let d=localPoint(b,ray);
 let a=dot(d,d);let halfB=dot(o,d);let c=dot(o,o)-1.0;
 let determinant=halfB*halfB-a*c;
 if(determinant<=0.0){return vec4f(0.0);}
 let travel=(-halfB-sqrt(determinant))/a;
 if(travel<=0.002||travel>=maxTravel){return vec4f(0.0);}
 let point=origin+ray*travel;let n=pocketNormal(b,o+d*travel);
 let facing=clamp(dot(n,-ray),0.0,1.0);
 let spread=0.015+min(blur,0.5)*0.22;
 let F=(dielectricFresnel(facing,GEL_IOR,1.0)*2.0
   +dielectricFresnel(clamp(facing-spread,0.0,1.0),GEL_IOR,1.0)
   +dielectricFresnel(clamp(facing+spread,0.0,1.0),GEL_IOR,1.0))*0.25;
 // A cavity also reflects the diffuse radiance already travelling in the gel.
 // Without this term, air voids reflect black studio directions and disappear.
 let localA=-log(clamp(u.flesh.rgb,vec3f(0.02),vec3f(0.995)))*1.05;
 let lampPath=lightDistance(point,0.5);
 let gelIncident=studioDiffuse(n)*exp(-localA*lampPath)*0.30+vec3f(1.0,0.93,0.86)*u.keyDir.w
   *scatteringCoefficient()/(4.0*PI)*exp(-(localA+scatteringCoefficient())*lampPath);
 let reflected=studioEnv(reflect(ray,n),0.12+min(blur,0.7)*0.35,u.bg.rgb)+gelIncident;
 var radiance=reflected*F;
 var shadow=F*0.55;
 let inAir=refract(ray,n,GEL_IOR);
 if(dot(inAir,inAir)>0.001){
  // Trace the second interface of the same animated ellipsoid.
  let airLocal=localPoint(b,inAir);let q=localPoint(b,point-b.center.xyz);
  let chord=-2.0*dot(q,airLocal)/max(dot(airLocal,airLocal),0.00001);
  let exitPoint=point+inAir*max(chord,0.0);
  let exitNormal=pocketNormal(b,localPoint(b,exitPoint-b.center.xyz));
  let escaped=refract(inAir,-exitNormal,1.0/GEL_IOR);
  let exitF=dielectricFresnel(dot(inAir,exitNormal),1.0,GEL_IOR);
  let lens=studioEnv(escaped,0.14,u.bg.rgb);
  radiance+=lens*(1.0-F)*(1.0-exitF)*0.16;
  // The air void reduces pigment absorption, giving a dim clear core.
  radiance+=u.flesh.rgb*0.024*(1.0-F);
  shadow+=(1.0-F)*0.10;
 }
 return vec4f(radiance,shadow);
}
fn embeddedBubbles(entry:vec3f,ray:vec3f,distance:f32,sigmaA:vec3f)->BubbleLight{
 var result:BubbleLight;result.radiance=vec3f(0.0);result.occlusion=0.0;
 let helper=select(vec3f(0.0,1.0,0.0),vec3f(1.0,0.0,0.0),abs(ray.y)>0.9);
 let axisX=normalize(cross(ray,helper));let axisY=cross(axisX,ray);
 for(var k=0;k<72;k++){
  let b=bubbleVolume.pockets[k];if(b.center.w<0.002){continue;}let o=localPoint(b,entry-b.center.xyz);let d=localPoint(b,ray);
  let centerTravel=-dot(o,d)/max(dot(d,d),0.00001);
  if(centerTravel<=0.0||centerTravel>=distance){continue;}
  let nearTravel=max(0.0,centerTravel-b.center.w);
  let reducedS=SIGMA_S*(1.0-ANISOTROPY);
  // The clearer medium uses a low bulk scattering coefficient. Keep the
  // image-space diffusion cone art-directed independently, so a deep pocket
  // visibly loses fine detail without turning the entire gel cloudy again.
  let sigma=sqrt(reducedS*nearTravel*nearTravel*nearTravel/3.0)*0.18*u.shape.z;
  let sigmaLocal=sigma/max(b.center.w,0.005);
  if(length(o+d*centerTravel)>1.0+sigmaLocal*2.4){continue;}
  // Convolve full 3D interface responses with the optical-depth cone.
  // Near pockets keep curved specular highlights; far pockets blur all features.
  var light=vec4f(0.0);
  if(sigmaLocal<0.45){light=pocketSample(b,entry,ray,distance,sigmaLocal);}
  if(sigmaLocal>0.14){
   // At large cone widths, direct sparse ray quadrature produces visible beads.
   // Integrate the pocket's hemispherical response, then convolve that moment
   // with a normalized spatial kernel. This retains colored cavity radiance
   // while deep pockets broaden continuously, rather than becoming glowing rings.
   // The blurred angular response is shared by all pixels of this pocket.
   // A 72-item GPU cache updates it once per frame after the light-depth maps.
   let mean=bubbleCache[k];
   let variance=0.27+sigmaLocal*sigmaLocal;
   let kernel=exp(-dot(o+d*centerTravel,o+d*centerTravel)/(2.0*variance))*0.27/variance;
   light=mix(light,mean*kernel,smoothstep(0.14,0.45,sigmaLocal));
  }
  let tint=exp(-(sigmaA+scatteringCoefficient()*0.65)*nearTravel);
  result.radiance+=light.rgb*tint;
  result.occlusion+=light.a*exp(-SIGMA_S*nearTravel);
 }
 result.occlusion=clamp(result.occlusion,0.0,0.85);return result;
}

@fragment fn fsJelly(i:VOut,@builtin(front_facing) ff:bool) -> MaterialOut {
 let smoothNormal=normalize(i.n);
 let gradientX=dpdx(smoothNormal);let gradientY=dpdy(smoothNormal);
 let normalVariance=dot(gradientX,gradientX)+dot(gradientY,gradientY);
 var N=smoothNormal;if(!ff){N=-N;}
 let P=i.wp;let V=normalize(u.camPos.xyz-P);let L=u.keyDir.xyz;
 let NdV=max(dot(N,V),0.001);let NdL=dot(N,L);
 let pix=vec2i(i.pos.xy);let uv=i.pos.xy*u.screen.zw;
 let front=linearDepth(P);let rear=readBack(uv);
 let cosView=max(dot(-V,u.camFwd.xyz),0.35);
 let thickness=clamp((rear.r-front)/cosView,0.025,3.0);
 let sigmaA=-log(clamp(u.flesh.rgb,vec3f(0.02),vec3f(0.995)))*1.05;
  // Trace the wet interface in screen space; fitted air pockets are evaluated
 // along this refracted path, independently of screen-space inclusion textures.
 let refracted=refract(-V,N,1.0/GEL_IOR);
 var exit=P+refracted*thickness;
 var exitNormal=-N;
 if(dot(rear.gba,rear.gba)>0.01){exitNormal=normalize(rear.gba);}
 var previous=P+refracted*0.003;
 for(var step=1;step<=18;step++){
  let candidate=P+refracted*(thickness*f32(step)/14.0+0.003);
  let sampleUV=toUV(candidate);
  let back=readBack(sampleUV);
  if(back.r>front+0.01&&linearDepth(candidate)>=back.r){
   var lo=previous;var hi=candidate;
   for(var k=0;k<5;k++){
    let mid=(lo+hi)*0.5;let mUV=toUV(mid);
    let depth=readBack(mUV).r;
    if(linearDepth(mid)<depth){lo=mid;}else{hi=mid;}
   }
   exit=(lo+hi)*0.5;exitNormal=normalize(back.gba);break;
  }
  previous=candidate;
 }
 let opticalLength=length(exit-P);
 var outgoing=refract(refracted,-exitNormal,GEL_IOR);
 if(dot(outgoing,outgoing)<0.001){outgoing=reflect(refracted,exitNormal);}
 let ruv=mix(uv,toUV(exit),0.78);
 let pockets=embeddedBubbles(P,refracted,opticalLength,sigmaA);
 let internal=sampleInternal(clamp(ruv,vec2f(0.001),vec2f(0.999)),front,max(dot(refracted,u.camFwd.xyz),0.30),opticalLength,sigmaA);
 let volume=integrateVolume(P,exit,refracted,sigmaA);
 let exitFresnel=dielectricFresnel(dot(refracted,exitNormal),GEL_IOR,1.0);
 // The transmitted view meets the dark studio cyclorama. Softboxes belong
 // to reflections and illumination, not a second set of visible lamps pasted
 // behind the object; that was producing a blown white patch over the cap.
 var exitLight=u.bg.rgb*0.70+vec3f(0.018,0.021,0.032)*max(outgoing.y,0.0);
 // The downward refracted ray sees the dark reflective stage rather than sky.
 if(outgoing.y<0.0){
  let floorP=exit+outgoing*max(0.0,-exit.y/outgoing.y);
  let floorUV=toUV(floorP);
  let scatterCone=sqrt(SIGMA_S*(1.0-ANISOTROPY)*pow(opticalLength,3.0)/3.0)*0.16*u.shape.z;
  let pixels=scatterCone*u.screen.y/(2.0*PROJECTION_TAN_HALF_FOV*max(front,0.1));
  let lod=clamp(log2(max(1.0,pixels)),0.0,f32(textureNumLevels(sceneTex)-1u));
  exitLight=textureSampleLevel(sceneTex,lin,clamp(floorUV,vec2f(0.001),vec2f(0.999)),lod).rgb;
 }
 let backReflect=studioEnv(reflect(refracted,exitNormal),clamp(0.30+opticalLength*0.28,0.30,0.88),u.bg.rgb)*min(exitFresnel,0.45);
 let transmissionTint=exp(-sigmaA*opticalLength);
 // Single scattering is depth-integrated and volume illumination is spatially
 // diffused by the separate RGB transport passes.
 let diffusion=volume.multiple;
 // Already filtered background and pocket radiance bypass the second
 // surface-diffusion convolution so depth filtering stays local to each pocket.
 let micro=vnoise(i.rest*70.0);
 let rough=sqrt(pow(mix(0.105,0.19,i.cut)+micro*0.008,2.0)+min(normalVariance*0.8,0.012));
 let F0=pow((GEL_IOR-1.0)/(GEL_IOR+1.0),2.0);
 let fresnel=dielectricFresnel(NdV,1.0,GEL_IOR);
 let R=reflect(-V,N);
 let reflected=studioEnv(R,rough,u.bg.rgb);
 let direct=vec3f(0.0); // The finite studio softboxes already supply the surface illumination.
 let attenuation=transmissionTint*exp(-scatteringCoefficient()*opticalLength);
 let transmitted=internal.ballistic*0.15+exitLight*attenuation*(1.0-exitFresnel)*0.85
   +backReflect*attenuation*0.35;
 let sharp=(transmitted*(1.0-pockets.occlusion)+pockets.radiance
   +volume.single*(1.0-pockets.occlusion))*(1.0-fresnel)+reflected*fresnel+direct;
 var o:MaterialOut;
 o.surface=vec4f(sharp,1.0);
 o.diffusion=vec4f(diffusion*(1.0-fresnel)*(1.0-pockets.occlusion),front);
 o.guide=vec4f(N,max(opticalLength,0.025));
 return o;
}

// ── mesh overlay ──
struct LOut { @builtin(position) pos: vec4f, @location(0) d: f32 };
@vertex fn vsLine(@location(0) p: vec3f) -> LOut {
  var o: LOut; o.pos = u.viewProj * vec4f(p, 1.0); o.d = linearDepth(p); return o;
}
@fragment fn fsLine(i:LOut) -> MaterialOut {
 let a=u.misc.y*mix(0.9,0.35,clamp((i.d-5.0)*0.5,0.0,1.0));
 var o:MaterialOut;o.surface=vec4f(vec3f(0.78,0.71,0.94)*a,a);
 o.diffusion=vec4f(0.0);o.guide=vec4f(0.0);return o;
}
