var e={scattering:.28,anisotropy:.65,absorptionScale:1.05},t={Ri:.96,rho:.14,T:.98,bevel:.14,skin:0,pale:0,ridges:12};t.Ro=t.Ri+t.rho;var n={fluted:{name:`Fluted`,height:.98,fit:1.08,icon:`<path d="M9 6q11-5 22 0l5 23q-16 7-32 0zM14 5l-3 27M20 4v29M26 5l3 27M7 9q13 5 26 0"/>`},bloom:{name:`Bloom`,height:.82,fit:1.12,icon:`<path d="M20 7c5-8 11-2 9 3 8-2 12 6 6 10 6 6 0 13-6 10 0 8-10 10-12 3-7 5-13-2-9-8-8-2-8-11-1-13-1-7 8-10 13-5z"/>`},dome:{name:`Dome`,height:1.04,fit:1.08,icon:`<path d="M4 29C4 0 36 0 36 29q-16 6-32 0z"/>`},pillow:{name:`Pillow`,height:.76,fit:1.12,icon:`<path d="M12 7h16q6 0 8 10l2 9q-1 5-9 5H11q-9 0-9-5l2-9q2-10 8-10z"/>`},pebble:{name:`Pebble`,height:.92,fit:1.2,icon:`<path d="M3 23C4 5 27 1 35 13s-3 19-17 19C6 32 1 29 3 23z"/>`},twist:{name:`Twist`,height:1.02,fit:1.1,icon:`<path d="M11 10C4 4 22-2 26 5c9 1 10 8 5 12 9 4 6 11-2 14-12 7-25 1-23-6-7-5-2-11 5-15zM11 10q12 3 15-5M6 25q16-1 25-8M10 33q13-6 24-9"/>`}},r=`fluted`;function i(e,n,i){let a=Math.hypot(e,i)/t.Ro,o=n/t.T,s=Math.atan2(i,e);if(r===`dome`){let t=.16+.9*Math.sqrt(Math.max(.035,1-.96*a*a));return[e*.98,n*t,i*.98]}if(r===`bloom`){let t=1+.17*Math.cos(6*s)*Math.min(1,a*a*1.6),r=.99-.12*o;return[e*t*r,n*(.8+.03*(1-a*a)),i*t*r]}if(r===`pillow`){let t=1+((Math.cos(s)**4+Math.sin(s)**4)**-.25-1)*Math.min(1,a*a),r=.9+.1*Math.sin(Math.PI*o);return[e*t*r*.92,n*(.67+.11*(1-a*a)),i*t*r*.83]}if(r===`pebble`){let t=.49+.46*Math.sqrt(Math.max(.08,1-.87*a*a)),r=.91+.08*Math.sin(Math.PI*o);return[e*1.18*r,n*t,i*.72*r]}let c=s+(o-.5)*.92,l=1+.105*Math.cos(8*s)*Math.min(1,a*a*1.6),u=(.96-.08*o)*l,d=Math.hypot(e,i)*u;return[Math.cos(c)*d,n*(1.01+.02*(1-a*a)),Math.sin(c)*d]}function a(e,n,a){if(r!==`fluted`)return i(e,n,a);let o=Math.atan2(a,e),s=Math.hypot(e,a)/t.Ro,c=Math.min(1,Math.max(0,(s-.24)/.66)),l=Math.PI*2/t.ridges,u=o-Math.round(o/l)*l,d=.8*Math.cos(u)+Math.sqrt(Math.max(0,.28**2-(.8*Math.sin(u))**2)),f=u+(u<0?l:-l),p=.28**2-(.8*Math.sin(f))**2,m=p>0?.8*Math.cos(f)+Math.sqrt(p):0,h=(d+Math.log1p(Math.exp((m-d)*32))/32)/1.02,g=n/t.T,_=Math.min(1,Math.max(0,(g-.65)/.35)),v=c*(1-.42*_*_*(3-2*_)),y=(1-.14*g)*(1+(h-1)*v),b=.018*(n/t.T)**4*Math.max(0,1-(e*e+a*a)/(t.Ro-t.bevel)**2)**2,x=.055*g**5*c**4*(.5+.5*Math.cos(o*t.ridges));return[e*y,n+b+x,a*y]}function o(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function s(e,n,r=0){return Math.hypot(e,n)-t.Ro+r}function c(e,n){let r=Math.ceil(Math.max(2*Math.PI*t.Ro/e,2*Math.PI/n));return Array.from({length:r},(e,n)=>{let i=2*Math.PI*n/r,a=[Math.cos(i),Math.sin(i)];return{q:a.map(e=>e*t.Ri),n:a}})}function l(e){let t=e.length/2,n=1/0,r=1/0,i=-1/0,a=-1/0;for(let o=0;o<t;o++)n=Math.min(n,e[2*o]),i=Math.max(i,e[2*o]),r=Math.min(r,e[2*o+1]),a=Math.max(a,e[2*o+1]);let o=Math.max(i-n,a-r)*20,s=(n+i)/2,c=(r+a)/2,l=Array.from(e);l.push(s-o,c-o,s+o,c-o,s,c+o);let u=[],d=(e,t,n)=>{let r=l[2*e],i=l[2*e+1],a=l[2*t],o=l[2*t+1],s=l[2*n],c=l[2*n+1],u=2*(r*(o-c)+a*(c-i)+s*(i-o)),d=r*r+i*i,f=a*a+o*o,p=s*s+c*c,m=(d*(o-c)+f*(c-i)+p*(i-o))/u,h=(d*(s-a)+f*(r-s)+p*(a-r))/u;return{a:e,b:t,c:n,x:m,y:h,r2:(r-m)**2+(i-h)**2}};u.push(d(t,t+1,t+2));for(let e=0;e<t;e++){let t=l[2*e],n=l[2*e+1],r=[],i=[];for(let e of u)((t-e.x)**2+(n-e.y)**2<e.r2*(1+1e-9)?r:i).push(e);let a=new Map;for(let e of r)for(let[t,n]of[[e.a,e.b],[e.b,e.c],[e.c,e.a]]){let e=t<n?t*100003+n:n*100003+t,r=a.get(e);r?r.count++:a.set(e,{e0:t,e1:n,count:1})}u=i;for(let t of a.values())t.count===1&&u.push(d(t.e0,t.e1,e))}let f=[];for(let e of u){if(e.a>=t||e.b>=t||e.c>=t)continue;let n=l[2*e.a],r=l[2*e.a+1];(l[2*e.b]-n)*(l[2*e.c+1]-r)-(l[2*e.b+1]-r)*(l[2*e.c]-n)>0?f.push(e.a,e.b,e.c):f.push(e.a,e.c,e.b)}return f}function u(e,n){let r=[],{Ro:i,rho:a}=t,o=e*Math.sqrt(3)/2,s=0;for(let t=-i-.2;t<i+.2;t+=o,s++){let a=s%2*e/2;for(let o=-i-.2+a;o<i+.2;o+=e)n(o,t)&&r.push(o,t)}return r}function d(e=.15,n=3){let{T:r,Ro:i,skin:o,pale:d}=t,p=c(e*.32,.2),m=[];for(let e of p)m.push(e.q[0]+e.n[0]*t.rho,e.q[1]+e.n[1]*t.rho);let h=[];for(let t=0;t<m.length;t+=2){let n=!1;for(let r=0;r<h.length;r+=2)if(Math.hypot(h[r]-m[t],h[r+1]-m[t+1])<e*.13){n=!0;break}n||h.push(m[t],m[t+1])}let g=u(e,(t,n)=>s(t,n)<-e*.55),_=h.concat(g),v=l(_),y=[];for(let e=0;e<v.length;e+=3){let t=v[e],n=v[e+1],r=v[e+2],i=_[2*t],a=_[2*t+1],o=_[2*n],s=_[2*n+1],c=_[2*r],l=_[2*r+1];Math.abs((o-i)*(l-a)-(s-a)*(c-i))/2/Math.max((o-i)**2+(s-a)**2,(c-o)**2+(l-s)**2,(i-c)**2+(a-l)**2)>.12&&y.push(t,n,r)}let b=new Int32Array(_.length/2).fill(-1),x=[];for(let e of y)b[e]<0&&(b[e]=x.length/2,x.push(_[2*e],_[2*e+1]));let S=y.map(e=>b[e]),C=x.length/2,w=n+1,T=new Float32Array(C*w*3);for(let e=0;e<w;e++)for(let t=0;t<C;t++){let i=(e*C+t)*3;T.set(a(x[2*t],r*e/n,x[2*t+1]),i)}let E=[];for(let e=0;e<n;e++)for(let t=0;t<S.length;t+=3){let n=[S[t],S[t+1],S[t+2]].sort((e,t)=>e-t),r=e*C+n[0],i=e*C+n[1],a=e*C+n[2],o=r+C,s=i+C,c=a+C;E.push(r,i,a,o,i,a,o,s,a,o,s,c)}for(let e=0;e<E.length;e+=4)if(f(T,E[e],E[e+1],E[e+2],E[e+3])<0){let t=E[e+2];E[e+2]=E[e+3],E[e+3]=t}let D=C*w,O=new Uint8Array(D);return{rest:T,tets:new Uint32Array(E),region:O,n2:C,layers:n}}function f(e,t,n,r,i){let a=e[3*t],o=e[3*t+1],s=e[3*t+2],c=e[3*n]-a,l=e[3*n+1]-o,u=e[3*n+2]-s,d=e[3*r]-a,f=e[3*r+1]-o,p=e[3*r+2]-s,m=e[3*i]-a,h=e[3*i+1]-o,g=e[3*i+2]-s;return(c*(f*g-p*h)-l*(d*g-p*m)+u*(d*h-f*m))/6}function p(){let{T:e,bevel:n,rho:r,Ro:i}=t,d=[],f=[],p=[],m=[],h=(e,t,n,r,i=0,a=1,o=0)=>(d.push(e,t,n),f.push(i,a,o),p.push(r),d.length/3-1),g=c(.055,.09),_=g.length,v=[];for(let e=0;e<=5;e++){let t=-Math.PI/2+Math.PI/2*e/5;v.push({d:r-n+n*Math.cos(t),y:n+n*Math.sin(t),ny:Math.sin(t),nr:Math.cos(t)})}for(let t=1;t<8;t++)v.push({d:r,y:n+(e-2*n)*t/8,ny:0,nr:1});for(let t=0;t<=5;t++){let i=Math.PI/2*t/5;v.push({d:r-n+n*Math.cos(i),y:e-n+n*Math.sin(i),ny:Math.sin(i),nr:Math.cos(i)})}let y=[];for(let e of v){y.push(d.length/3);for(let t of g)h(t.q[0]+t.n[0]*e.d,e.y,t.q[1]+t.n[1]*e.d,0,t.n[0]*e.nr,e.ny,t.n[1]*e.nr)}for(let e=0;e<v.length-1;e++)for(let t=0;t<_;t++){let n=y[e]+t,r=y[e]+(t+1)%_,i=y[e+1]+t,a=y[e+1]+(t+1)%_;m.push(n,i,r,r,i,a)}let b=r-n,x=[];for(let e of g)x.push(e.q[0]+e.n[0]*b,e.q[1]+e.n[1]*b);let S=u(.075,(e,t)=>s(e,t,n)<-.045),C=x.concat(S),w=l(C),T=y[v.length-1],E=y[0],D=[],O=[];for(let t=0;t<C.length/2;t++)t<_?(D.push(T+t),O.push(E+t)):(D.push(h(C[2*t],e,C[2*t+1],0,0,1,0)),O.push(h(C[2*t],0,C[2*t+1],0,0,-1,0)));for(let e=0;e<w.length;e+=3){let t=w[e],n=w[e+1],r=w[e+2];m.push(D[t],D[r],D[n]),m.push(O[t],O[n],O[r])}let k=m.length,A=[],j=m.length,M=m.length,N=o(1049),P=[];for(let t=0;t<72;t++){let n=N()*Math.PI*2,r=Math.sqrt(N())*.8,i=t<24?.02+N()**2*.04:.007+N()**2*.012;P.push([Math.cos(n)*r,.16+N()*(e-.32),Math.sin(n)*r,i])}for(let[e,t,n,r]of P){let i=d.length/3;for(let i=0;i<=12;i++){let a=Math.PI*i/12;for(let i=0;i<20;i++){let o=2*Math.PI*i/20,s=Math.sin(a)*Math.cos(o),c=Math.cos(a),l=Math.sin(a)*Math.sin(o);h(e+s*r,t+c*r,n+l*r,2,s,c,l)}}for(let e=0;e<12;e++)for(let t=0;t<20;t++){let n=i+e*20+t,r=i+e*20+(t+1)%20,a=n+20,o=r+20;m.push(n,r,a,r,o,a)}}let F=m.length-M;for(let e=0;e<d.length;e+=3){let t=a(d[e],d[e+1],d[e+2]);d[e]=t[0],d[e+1]=t[1],d[e+2]=t[2]}for(let e=0;e<m.length;e+=3){let t=m[e],n=m[e+1],r=m[e+2],i=[d[3*n]-d[3*t],d[3*n+1]-d[3*t+1],d[3*n+2]-d[3*t+2]],a=[d[3*r]-d[3*t],d[3*r+1]-d[3*t+1],d[3*r+2]-d[3*t+2]],o=[i[1]*a[2]-i[2]*a[1],i[2]*a[0]-i[0]*a[2],i[0]*a[1]-i[1]*a[0]],s=0;for(let e of[t,n,r])s+=o[0]*f[3*e]+o[1]*f[3*e+1]+o[2]*f[3*e+2];s<0&&(m[e+1]=r,m[e+2]=n)}return{rest:new Float32Array(d),restNormal:new Float32Array(f),mat:new Float32Array(p),index:new Uint32Array(m),body:{first:0,count:k},seeds:{first:j,count:0},bubbles:{first:M,count:F},seedCount:A.length}}function m(e,t){let n=Array.from({length:e},()=>new Set),r=new Map,i=(t,i,a)=>{n[t].add(i),n[i].add(t);let o=t<i?t+`:`+i:i+`:`+t,s=r.get(o);return s||(s={a:t,b:i,opposites:[],id:e+r.size},r.set(o,s)),s.opposites.push(a),s.id},a=[];for(let e=0;e<t.length;e+=3){let n=t[e],r=t[e+1],o=t[e+2],s=i(n,r,o),c=i(r,o,n),l=i(o,n,r);a.push(n,s,l,r,c,s,o,l,c,s,c,l)}let o=[0],s=[],c=[],l=(e,t)=>{s.push(...e),c.push(...t),o.push(s.length)},u=Array.from({length:e},()=>[]);for(let e of r.values()){if(e.opposites.length>2)throw Error(`Non-manifold subdivision cage`);e.opposites.length===1&&(u[e.a].push(e.b),u[e.b].push(e.a))}for(let t=0;t<e;t++){let e=Array.from(n[t]),r=e.length;if(u[t].length===2)l([t,...u[t]],[.75,.125,.125]);else{let n=(.625-(.375+.25*Math.cos(2*Math.PI/r))**2)/r;l([t,...e],[1-r*n,...e.map(()=>n)])}}for(let e of r.values())e.opposites.length===2?l([e.a,e.b,...e.opposites],[.375,.375,.125,.125]):l([e.a,e.b],[.5,.5]);return{offsets:new Uint32Array(o),sources:new Uint32Array(s),weights:new Float32Array(c),positions:new Float32Array((e+r.size)*3),index:new Uint32Array(a),closed:Array.from(r.values()).every(e=>e.opposites.length===2)}}function h(e,t){let n=e.positions;for(let r=0;r<n.length/3;r++){let i=0,a=0,o=0;for(let n=e.offsets[r];n<e.offsets[r+1];n++){let r=e.sources[n]*3,s=e.weights[n];i+=t[r]*s,a+=t[r+1]*s,o+=t[r+2]*s}n[r*3]=i,n[r*3+1]=a,n[r*3+2]=o}return n}function g(e,t=2){let n=e.mat.indexOf(2),r=[],i=e.rest.subarray(0,n*3),a=e.index.subarray(0,e.body.count);for(let e=0;e<t;e++){let e=m(i.length/3,a);r.push(e),i=h(e,i),a=e.index}let o=i.length/3,s=e.rest.subarray(n*3),c=new Float32Array(i.length+s.length);c.set(i),c.set(s,i.length);let l=new Uint32Array(a.length+e.bubbles.count);l.set(a);for(let t=0;t<e.bubbles.count;t++)l[a.length+t]=e.index[e.bubbles.first+t]-n+o;let u=new Float32Array(c.length/3);return u.fill(2,o),{rest:c,restNormal:new Float32Array(c.length),mat:u,index:l,body:{first:0,count:a.length},seeds:{first:a.length,count:0},bubbles:{first:a.length,count:e.bubbles.count},seedCount:0,subdivision:{levels:t,stages:r,bodyVertices:n,highCount:o,cage:e}}}function _(e,t,n){let r=t.length/4,i=n.length/3,a=.2,o=new Map,s=(e,t,n)=>(e+512)*1048576+(t+512)*1024+(n+512),c=new Float64Array(r*9);for(let n=0;n<r;n++){let r=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0],l=[t[4*n],t[4*n+1],t[4*n+2],t[4*n+3]];for(let t of l)for(let n=0;n<3;n++)r[n]=Math.min(r[n],e[3*t+n]),i[n]=Math.max(i[n],e[3*t+n]);for(let e=Math.floor(r[0]/a);e<=Math.floor(i[0]/a);e++)for(let t=Math.floor(r[1]/a);t<=Math.floor(i[1]/a);t++)for(let c=Math.floor(r[2]/a);c<=Math.floor(i[2]/a);c++){let r=s(e,t,c),i=o.get(r);i||o.set(r,i=[]),i.push(n)}let u=l[0],d=[];for(let t=1;t<4;t++)for(let n=0;n<3;n++)d.push(e[3*l[t]+n]-e[3*u+n]);let f=[d[0],d[3],d[6],d[1],d[4],d[7],d[2],d[5],d[8]],p=1/(f[0]*(f[4]*f[8]-f[5]*f[7])-f[1]*(f[3]*f[8]-f[5]*f[6])+f[2]*(f[3]*f[7]-f[4]*f[6]));c[9*n+0]=(f[4]*f[8]-f[5]*f[7])*p,c[9*n+1]=(f[2]*f[7]-f[1]*f[8])*p,c[9*n+2]=(f[1]*f[5]-f[2]*f[4])*p,c[9*n+3]=(f[5]*f[6]-f[3]*f[8])*p,c[9*n+4]=(f[0]*f[8]-f[2]*f[6])*p,c[9*n+5]=(f[2]*f[3]-f[0]*f[5])*p,c[9*n+6]=(f[3]*f[7]-f[4]*f[6])*p,c[9*n+7]=(f[1]*f[6]-f[0]*f[7])*p,c[9*n+8]=(f[0]*f[4]-f[1]*f[3])*p}let l=(n,r,i,a)=>{let o=t[4*n],s=r-e[3*o],l=i-e[3*o+1],u=a-e[3*o+2],d=9*n,f=c[d]*s+c[d+1]*l+c[d+2]*u,p=c[d+3]*s+c[d+4]*l+c[d+5]*u,m=c[d+6]*s+c[d+7]*l+c[d+8]*u;return[1-f-p-m,f,p,m]},u=new Uint32Array(i),d=new Float32Array(i*4);for(let e=0;e<i;e++){let t=n[3*e],i=n[3*e+1],c=n[3*e+2],f=-1,p=-1/0,m=null,h=e=>{let n=l(e,t,i,c),r=Math.min(n[0],n[1],n[2],n[3]);r>p&&(p=r,f=e,m=n)},g=Math.floor(t/a),_=Math.floor(i/a),v=Math.floor(c/a);for(let e=0;e<=2&&p<-1e-4;e++)for(let t=g-e;t<=g+e;t++)for(let n=_-e;n<=_+e;n++)for(let r=v-e;r<=v+e;r++){if(Math.max(Math.abs(t-g),Math.abs(n-_),Math.abs(r-v))!==e)continue;let i=o.get(s(t,n,r));if(i)for(let e of i)h(e)}if(f<0)for(let e=0;e<r;e++)h(e);u[e]=f,d.set(m,4*e)}return{tetOf:u,w:d}}var v=class{constructor(e,t={}){let{rest:n,tets:r,region:i}=e;this.n=n.length/3,this.nT=r.length/4,this.tets=r,this.rest=Float32Array.from(n),this.x=new Float32Array(n.length),this.prev=new Float32Array(n.length),this.v=new Float32Array(n.length),this.renderPrev=new Float32Array(n.length),this.renderPositions=new Float32Array(n.length),this.invMass=new Float32Array(this.n),this.mass=new Float32Array(this.n),this.restVol=new Float32Array(this.nT),this.region=i,this.piece=e.piece??new Uint16Array(this.n),this.isCut=!!e.piece,this.contactFaces=e.contactFaces??[],this.cutMasks=e.cutMasks??new Uint16Array(this.n),this.cutCount=e.cutCount??0,this.contactTrack=new Map,this.density=1;let a=0;for(let e=0;e<this.nT;e++){let t=this.tetVol(this.rest,e);this.restVol[e]=t,a+=t;for(let n=0;n<4;n++)this.mass[r[4*e+n]]+=t*this.density/4}this.totalRestVolume=a,this.totalMass=0;for(let e=0;e<this.n;e++)this.invMass[e]=1/this.mass[e],this.totalMass+=this.mass[e];let o=new Map,s=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];for(let e=0;e<this.nT;e++)for(let[t,n]of s){let i=r[4*e+t],a=r[4*e+n];i>a&&([i,a]=[a,i]),o.set(i*65536+a,[i,a])}this.nE=o.size,this.edges=new Uint32Array(this.nE*2),this.restLen=new Float32Array(this.nE);let c=0;for(let[e,t]of o.values())this.edges[2*c]=e,this.edges[2*c+1]=t,this.restLen[c]=Math.hypot(n[3*e]-n[3*t],n[3*e+1]-n[3*t+1],n[3*e+2]-n[3*t+2]),c++;for(let e=this.nE-1;e>0;e--){let t=e*2654435761%(e+1);for(let n of[this.edges]){let r=n[2*e],i=n[2*e+1];n[2*e]=n[2*t],n[2*e+1]=n[2*t+1],n[2*t]=r,n[2*t+1]=i}let n=this.restLen[e];this.restLen[e]=this.restLen[t],this.restLen[t]=n}this.tetQ=new Float32Array(this.nT*12),this.tetDmInv=new Float32Array(this.nT*9),this.tetRot=new Float32Array(this.nT*4),this.tetFirm=new Float32Array(this.nT);for(let e=0;e<this.nT;e++){let t=[r[4*e],r[4*e+1],r[4*e+2],r[4*e+3]],a=0,o=0,s=0,c=0;for(let e of t){let t=this.mass[e];c+=t,a+=n[3*e]*t,o+=n[3*e+1]*t,s+=n[3*e+2]*t}a/=c,o/=c,s/=c;for(let r=0;r<4;r++)this.tetQ[12*e+3*r]=n[3*t[r]]-a,this.tetQ[12*e+3*r+1]=n[3*t[r]+1]-o,this.tetQ[12*e+3*r+2]=n[3*t[r]+2]-s;let l=[];for(let e=0;e<3;e++)for(let r=1;r<4;r++)l.push(n[3*t[r]+e]-n[3*t[0]+e]);let u=y(l);this.tetDmInv.set(u,9*e),this.tetRot[4*e+3]=1;let d=0;for(let e of t)d+=i[e];this.tetFirm[e]=d>=6?.3:d>=3?.5:d>=1?.75:1}this.gravity=-9.81,this.firmness=t.firmness??.5,this.damping=t.damping??.45,this.substeps=this.isCut?6:10,this.stepDt=this.isCut?1/30:1/60,this.friction=.55,this.floorY=0,this.maxSpeed=12,this.grabIdx=new Int32Array(this.n),this.grabW=new Float32Array(this.n),this.grabOff=new Float32Array(this.n*3),this.grabN=0,this.grabTarget=new Float32Array(3),this.grabRot=new Float32Array([1,0,0,0,1,0,0,0,1]),this.grabbing=!1,this.sleeping=!1,this.sleepTime=0,this.poseRevision=0,this.time=0,this.reset(0)}tetVol(e,t){let n=this.tets,r=n[4*t],i=n[4*t+1],a=n[4*t+2],o=n[4*t+3],s=e[3*r],c=e[3*r+1],l=e[3*r+2],u=e[3*i]-s,d=e[3*i+1]-c,f=e[3*i+2]-l,p=e[3*a]-s,m=e[3*a+1]-c,h=e[3*a+2]-l,g=e[3*o]-s,_=e[3*o+1]-c,v=e[3*o+2]-l;return(u*(m*v-h*_)-d*(p*v-h*g)+f*(p*_-m*g))/6}reset(e=.35){this.wake();for(let t=0;t<this.n;t++)this.x[3*t]=this.rest[3*t],this.x[3*t+1]=this.rest[3*t+1]+e,this.x[3*t+2]=this.rest[3*t+2];this.prev.set(this.x),this.renderPrev.set(this.x),this.v.fill(0),this.endGrab(),this.poseRevision++}wake(){this.sleeping=!1,this.sleepTime=0}updateParams(e){let t=e.firmness??this.firmness,n=e.damping??this.damping;(t!==this.firmness||n!==this.damping)&&this.wake(),this.firmness=t,this.damping=n}shapeCompliance(){return Math.exp(Math.log(3)+(Math.log(.05)-Math.log(3))*this.firmness)}volCompliance(){return 1e-4*(1-.7*this.firmness)}dampRate(){return 2+40*this.damping*this.damping}nudge(e=1){this.wake();let t=this.centroid(),n=2.2*e,r=2.4*e,i=-1.5*e,a=1.2*e;for(let e=0;e<this.n;e++){let o=this.x[3*e]-t[0],s=this.x[3*e+1]-t[1],c=this.x[3*e+2]-t[2];this.v[3*e]+=a*c-i*s,this.v[3*e+1]+=n+i*o-r*c,this.v[3*e+2]+=r*s-a*o}}centroid(){let e=0,t=0,n=0,r=0;for(let i=0;i<this.n;i++){let a=this.mass[i];r+=a,e+=this.x[3*i]*a,t+=this.x[3*i+1]*a,n+=this.x[3*i+2]*a}return[e/r,t/r,n/r]}beginGrab(e,t=.4){this.wake(),this.grabN=0;let n=-1,r=1/0;for(let t=0;t<this.n;t++){let i=Math.hypot(this.x[3*t]-e[0],this.x[3*t+1]-e[1],this.x[3*t+2]-e[2]);i<r&&(r=i,n=t)}let i=this.piece[n];for(let a=0;a<this.n;a++){let o=this.x[3*a]-e[0],s=this.x[3*a+1]-e[1],c=this.x[3*a+2]-e[2],l=Math.hypot(o,s,c);if(l<r&&(r=l,n=a),l<t&&this.piece[a]===i){let e=1-l/t,n=this.grabN++;this.grabIdx[n]=a,this.grabW[n]=e*e*(3-2*e),this.grabOff[3*n]=o,this.grabOff[3*n+1]=s,this.grabOff[3*n+2]=c}}this.grabN===0&&n>=0&&(this.grabIdx[0]=n,this.grabW[0]=1,this.grabOff[0]=this.x[3*n]-e[0],this.grabOff[1]=this.x[3*n+1]-e[1],this.grabOff[2]=this.x[3*n+2]-e[2],this.grabN=1),this.grabTarget.set(e),this.grabStart=Float32Array.from(e),this.grabRot.set([1,0,0,0,1,0,0,0,1]),this.grabbing=!0}moveGrab(e,t){this.wake(),this.grabTarget.set(e);let n=e[0]-this.grabStart[0],r=e[1]-this.grabStart[1],i=e[2]-this.grabStart[2],a=Math.hypot(n,r,i),o=2.2;if(a>o){let e=o/a;this.grabTarget[0]=this.grabStart[0]+n*e,this.grabTarget[1]=this.grabStart[1]+r*e,this.grabTarget[2]=this.grabStart[2]+i*e}t&&this.grabRot.set(t);let s=this.grabRot,c=1/0;for(let e=0;e<this.grabN;e++)c=Math.min(c,s[3]*this.grabOff[3*e]+s[4]*this.grabOff[3*e+1]+s[5]*this.grabOff[3*e+2]);Number.isFinite(c)&&(this.grabTarget[1]=Math.max(this.grabTarget[1],this.floorY+.004-c))}endGrab(){this.grabbing=!1,this.grabN=0}step(){if(this.sleeping)return;this.renderPrev.set(this.x);let e=this.substeps,t=this.stepDt/e;for(let n=0;n<e;n++)this.substep(t);if(this.isCut&&this.collidePieces(),this.time+=this.stepDt,!this.grabbing){let e=this.kineticEnergy()/this.totalMass;if(e<.002){let t=Math.max(.86,1-.14*(1-e/.002));for(let e=0;e<this.v.length;e++)this.v[e]*=t}}for(let e=0;e<this.x.length;e+=97)if(!Number.isFinite(this.x[e])){this.reset(.2);break}let n=0,r=1/0;for(let e=0;e<this.x.length;e+=3)n=Math.max(n,this.v[e]**2+this.v[e+1]**2+this.v[e+2]**2),r=Math.min(r,this.x[e+1]);let i=!this.grabbing&&Math.abs(r-this.floorY)<(this.isCut?.003:1e-4)&&n<(this.isCut?.01:.005)**2&&this.kineticEnergy()/this.totalMass<(this.isCut?5e-6:1e-6);this.sleepTime=i?this.sleepTime+this.stepDt:0,this.sleepTime>=.5&&(this.sleeping=!0,this.v.fill(0),this.prev.set(this.x))}substep(e){let{x:t,prev:n,v:r,invMass:i,n:a}=this,o=this.gravity*e,s=Math.exp(-(this.grabbing?2.5:.08)*e);for(let i=0;i<a;i++){let a=3*i;r[a+1]+=o,r[a]*=s,r[a+1]*=s,r[a+2]*=s,n[a]=t[a],n[a+1]=t[a+1],n[a+2]=t[a+2],t[a]+=r[a]*e,t[a+1]+=r[a+1]*e,t[a+2]+=r[a+2]*e}this.grabbing&&this.solveGrab(e),this.solveTets(e),this.solveVolumes(e),this.solveFloor(),this.isCut&&(this.solveVolumes(e),this.repairCutCells());let c=1/e,l=this.maxSpeed;for(let e=0;e<3*a;e+=3){let i=(t[e]-n[e])*c,a=(t[e+1]-n[e+1])*c,o=(t[e+2]-n[e+2])*c,s=Math.hypot(i,a,o);if(s>l){let e=l/s;i*=e,a*=e,o*=e}r[e]=i,r[e+1]=a,r[e+2]=o}this.dampEdges(e),this.poseRevision++}solveGrab(e){let{x:t,invMass:n}=this,r=2e-6/(e*e),i=this.grabRot,a=this.grabTarget;for(let e=0;e<this.grabN;e++){let o=this.grabIdx[e],s=n[o],c=this.grabOff[3*e],l=this.grabOff[3*e+1],u=this.grabOff[3*e+2],d=a[0]+i[0]*c+i[1]*l+i[2]*u,f=Math.max(a[1]+i[3]*c+i[4]*l+i[5]*u,this.floorY+.005),p=a[2]+i[6]*c+i[7]*l+i[8]*u,m=this.grabW[e]*s/(s+r);f<t[3*o+1]&&f<.45&&(m*=Math.max(.12,f/.45)),t[3*o]+=(d-t[3*o])*m,t[3*o+1]+=(f-t[3*o+1])*m,t[3*o+2]+=(p-t[3*o+2])*m}}solveTets(e){let{x:t,tets:n,tetQ:r,tetRot:i,tetFirm:a,mass:o}=this,s=this.shapeCompliance()/(e*e);for(let e=0;e<this.nT;e++){let c=3*n[4*e],l=3*n[4*e+1],u=3*n[4*e+2],d=3*n[4*e+3],f=o[c/3],p=o[l/3],m=o[u/3],h=o[d/3],g=f+p+m+h,_=(t[c]*f+t[l]*p+t[u]*m+t[d]*h)/g,v=(t[c+1]*f+t[l+1]*p+t[u+1]*m+t[d+1]*h)/g,y=(t[c+2]*f+t[l+2]*p+t[u+2]*m+t[d+2]*h)/g,b=12*e,x=0,S=0,C=0,w=0,T=0,E=0,D=0,O=0,k=0;{let e=(t[c]-_)*f,n=(t[c+1]-v)*f,i=(t[c+2]-y)*f,a=r[b],o=r[b+1],s=r[b+2];x+=e*a,S+=e*o,C+=e*s,w+=n*a,T+=n*o,E+=n*s,D+=i*a,O+=i*o,k+=i*s,e=(t[l]-_)*p,n=(t[l+1]-v)*p,i=(t[l+2]-y)*p,a=r[b+3],o=r[b+4],s=r[b+5],x+=e*a,S+=e*o,C+=e*s,w+=n*a,T+=n*o,E+=n*s,D+=i*a,O+=i*o,k+=i*s,e=(t[u]-_)*m,n=(t[u+1]-v)*m,i=(t[u+2]-y)*m,a=r[b+6],o=r[b+7],s=r[b+8],x+=e*a,S+=e*o,C+=e*s,w+=n*a,T+=n*o,E+=n*s,D+=i*a,O+=i*o,k+=i*s,e=(t[d]-_)*h,n=(t[d+1]-v)*h,i=(t[d+2]-y)*h,a=r[b+9],o=r[b+10],s=r[b+11],x+=e*a,S+=e*o,C+=e*s,w+=n*a,T+=n*o,E+=n*s,D+=i*a,O+=i*o,k+=i*s}let A=i[4*e],j=i[4*e+1],M=i[4*e+2],N=i[4*e+3],P,F,I,L,R,z,B,V,H;for(let e=0;e<2;e++){P=1-2*(j*j+M*M),F=2*(A*j-N*M),I=2*(A*M+N*j),L=2*(A*j+N*M),R=1-2*(A*A+M*M),z=2*(j*M-N*A),B=2*(A*M-N*j),V=2*(j*M+N*A),H=1-2*(A*A+j*j);let e=L*D-B*w+(R*O-V*T)+(z*k-H*E),t=B*x-P*D+(V*S-F*O)+(H*C-I*k),n=P*w-L*x+(F*T-R*S)+(I*E-z*C),r=Math.abs(P*x+L*w+B*D+F*S+R*T+V*O+I*C+z*E+H*k)+1e-12,i=e/r,a=t/r,o=n/r,s=Math.sqrt(i*i+a*a+o*o);if(s<1e-6)break;let c=s>1?.5/s:.5,l=i*c,u=a*c,d=o*c,f=1*A+l*N+u*M-d*j,p=1*j-l*M+u*N+d*A,m=1*M+l*j-u*A+d*N,h=1*N-l*A-u*j-d*M,g=1/Math.sqrt(f*f+p*p+m*m+h*h);A=f*g,j=p*g,M=m*g,N=h*g}P=1-2*(j*j+M*M),F=2*(A*j-N*M),I=2*(A*M+N*j),L=2*(A*j+N*M),R=1-2*(A*A+M*M),z=2*(j*M-N*A),B=2*(A*M-N*j),V=2*(j*M+N*A),H=1-2*(A*A+j*j),i[4*e]=A,i[4*e+1]=j,i[4*e+2]=M,i[4*e+3]=N;let U=1/(1+s*a[e]*g*.25),W=r[b],G=r[b+1],K=r[b+2];t[c]+=(_+P*W+F*G+I*K-t[c])*U,t[c+1]+=(v+L*W+R*G+z*K-t[c+1])*U,t[c+2]+=(y+B*W+V*G+H*K-t[c+2])*U,W=r[b+3],G=r[b+4],K=r[b+5],t[l]+=(_+P*W+F*G+I*K-t[l])*U,t[l+1]+=(v+L*W+R*G+z*K-t[l+1])*U,t[l+2]+=(y+B*W+V*G+H*K-t[l+2])*U,W=r[b+6],G=r[b+7],K=r[b+8],t[u]+=(_+P*W+F*G+I*K-t[u])*U,t[u+1]+=(v+L*W+R*G+z*K-t[u+1])*U,t[u+2]+=(y+B*W+V*G+H*K-t[u+2])*U,W=r[b+9],G=r[b+10],K=r[b+11],t[d]+=(_+P*W+F*G+I*K-t[d])*U,t[d+1]+=(v+L*W+R*G+z*K-t[d+1])*U,t[d+2]+=(y+B*W+V*G+H*K-t[d+2])*U}}solveVolumes(e){let{x:t,invMass:n,tets:r,restVol:i}=this,a=this.volCompliance()/(e*e);for(let e=0;e<this.nT;e++){let o=r[4*e],s=r[4*e+1],c=r[4*e+2],l=r[4*e+3],u=3*o,d=3*s,f=3*c,p=3*l,m=t[d]-t[u],h=t[d+1]-t[u+1],g=t[d+2]-t[u+2],_=t[f]-t[u],v=t[f+1]-t[u+1],y=t[f+2]-t[u+2],b=t[p]-t[u],x=t[p+1]-t[u+1],S=t[p+2]-t[u+2],C=t[p]-t[d],w=t[p+1]-t[d+1],T=t[p+2]-t[d+2],E=t[f]-t[d],D=t[f+1]-t[d+1],O=t[f+2]-t[d+2],k=w*O-T*D,A=T*E-C*O,j=C*D-w*E,M=v*S-y*x,N=y*b-_*S,P=_*x-v*b,F=x*g-S*h,I=S*m-b*g,L=b*h-x*m,R=h*y-g*v,z=g*_-m*y,B=m*v-h*_,V=(b*R+x*z+S*B)/6,H=n[o],U=n[s],W=n[c],G=n[l],K=H*(k*k+A*A+j*j)+U*(M*M+N*N+P*P)+W*(F*F+I*I+L*L)+G*(R*R+z*z+B*B);if(K<1e-12)continue;let q=i[e],J=V<.25*q?0:a,Y=-(6*(V-q))/(K+J);t[u]+=k*Y*H,t[u+1]+=A*Y*H,t[u+2]+=j*Y*H,t[d]+=M*Y*U,t[d+1]+=N*Y*U,t[d+2]+=P*Y*U,t[f]+=F*Y*W,t[f+1]+=I*Y*W,t[f+2]+=L*Y*W,t[p]+=R*Y*G,t[p+1]+=z*Y*G,t[p+2]+=B*Y*G}}collidePieces(){let e=new Map;for(let t=0;t<this.n;t++){let n=this.piece[t];e.has(n)||e.set(n,{ids:[],mass:0,velocity:[0,0,0],minY:1/0});let r=e.get(n);r.ids.push(t),r.mass+=this.mass[t],r.minY=Math.min(r.minY,this.x[t*3+1]);for(let e=0;e<3;e++)r.velocity[e]+=this.v[t*3+e]*this.mass[t]}for(let t of e.values())t.velocity=t.velocity.map(e=>e/t.mass);let t=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],n=(e,t)=>e.reduce((e,n,r)=>e+n*t[r],0),r=(e,t)=>e.map((e,n)=>e-t[n]),i=e=>Array.from(this.x.subarray(e*3,e*3+3)),a=this.contactFaces.map(e=>{let n=e.anchors.map(i),a=r(n[1],n[0]),o=r(n[2],n[0]),s=t(a,o),c=Math.hypot(...s)||1;return{...e,n:s.map(e=>e/c),centre:e.ids.reduce((t,n)=>t.map((t,r)=>t+this.x[n*3+r]/e.ids.length),[0,0,0])}});for(let o=0;o<a.length;o++)for(let s=o+1;s<a.length;s++){let c=a[o],l=a[s];if(c.bit!==l.bit||c.side===l.side||(c.piece^l.piece)!==1<<this.cutCount-1-c.bit||n(c.n,l.n)>-.45)continue;let u=r(c.n,l.n),d=Math.hypot(...u);u=u.map(e=>e/d);let f=r(l.centre,c.centre),p=c.piece+`:`+l.piece+`:`+c.bit,m=this.contactTrack.get(p);this.contactTrack.set(p,f);let h=n(u,f);if(h>=.015)continue;let g=t(Math.abs(u[1])<.9?[0,1,0]:[1,0,0],u);d=Math.hypot(...g),g=g.map(e=>e/d);let _=t(u,g),v=(e,t)=>{let r=1/0,a=-1/0;for(let o of e.ids){let e=n(i(o),t);r=Math.min(r,e),a=Math.max(a,e)}return[r,a]},y=!0;for(let e of[g,_]){let t=v(c,e),n=v(l,e);Math.min(t[1],n[1])-Math.max(t[0],n[0])<.025&&(y=!1)}if(!y)continue;let b=e.get(c.piece),x=e.get(l.piece),S=1/b.mass,C=1/x.mass;u[1]>.35&&b.minY<.003&&(S=0),u[1]<-.35&&x.minY<.003&&(C=0);let w=S+C;if(!w)continue;let T=Math.min(.25,.015-h),E=r(x.velocity,b.velocity),D=n(u,E),O=E.map((e,t)=>e-u[t]*D),k=Math.hypot(...O),A=Math.min(1,Math.max(0,-D)*.85/Math.max(k,1e-8)),j=m?r(f,m):[0,0,0],M=n(u,j);j=j.map((e,t)=>e-u[t]*M);let N=Math.hypot(...j),P=Math.min(1,T*.85/Math.max(N,1e-8));for(let[e,t,n]of[[b,-1,S],[x,1,C]])for(let r of e.ids)for(let e=0;e<3;e++)this.x[r*3+e]+=(u[e]*T-j[e]*P)*t*n/w,D<0&&(this.v[r*3+e]-=(u[e]*D+O[e]*A)*t*n/w)}}repairCutCells(){for(let e=0;e<4;e++){let e=0;for(let t=0;t<this.nT;t++){let n=this.tetVol(this.x,t),r=this.restVol[t]*.12;if(n>=r)continue;let i=Array.from(this.tets.subarray(t*4,t*4+4)),a=i.map(e=>Array.from(this.x.subarray(e*3,e*3+3))),o=(e,t)=>e.map((e,n)=>e-t[n]),s=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],c=[s(o(a[3],a[1]),o(a[2],a[1])),s(o(a[2],a[0]),o(a[3],a[0])),s(o(a[3],a[0]),o(a[1],a[0])),s(o(a[1],a[0]),o(a[2],a[0]))],l=0;for(let e=0;e<4;e++)l+=this.invMass[i[e]]*c[e].reduce((e,t)=>e+t*t,0);if(l<1e-16)continue;let u=6*(r-n)/l;for(let e=0;e<4;e++)for(let t=0;t<3;t++)this.x[i[e]*3+t]+=c[e][t]*u*this.invMass[i[e]];e++}if(!e)break}}solveFloor(){let{x:e,prev:t,n}=this,r=this.floorY,i=this.friction;for(let a=0;a<n;a++){let n=3*a,o=r-e[n+1];if(o<=0)continue;e[n+1]=r;let s=e[n]-t[n],c=e[n+2]-t[n+2],l=Math.hypot(s,c);if(l<1e-12)continue;let u=l<i*o?1:i*o/l;e[n]-=s*u,e[n+2]-=c*u}}dampEdges(e){let{x:t,v:n,invMass:r,edges:i}=this,a=1-Math.exp(-this.dampRate()*e);for(let e=0;e<this.nE;e++){let o=i[2*e],s=i[2*e+1],c=3*o,l=3*s,u=t[l]-t[c],d=t[l+1]-t[c+1],f=t[l+2]-t[c+2],p=Math.sqrt(u*u+d*d+f*f);if(p<1e-9)continue;u/=p,d/=p,f/=p;let m=(n[l]-n[c])*u+(n[l+1]-n[c+1])*d+(n[l+2]-n[c+2])*f,h=r[o],g=r[s],_=h+g,v=m*a/_;n[c]+=u*v*h,n[c+1]+=d*v*h,n[c+2]+=f*v*h,n[l]-=u*v*g,n[l+1]-=d*v*g,n[l+2]-=f*v*g}}volumeRatio(){let e=0;for(let t=0;t<this.nT;t++)e+=this.tetVol(this.x,t);return e/this.totalRestVolume}minVolumeRatio(){let e=1/0;for(let t=0;t<this.nT;t++)e=Math.min(e,this.tetVol(this.x,t)/this.restVol[t]);return e}kineticEnergy(){let e=0;for(let t=0;t<this.n;t++){let n=3*t;e+=.5*this.mass[t]*(this.v[n]**2+this.v[n+1]**2+this.v[n+2]**2)}return e}meanStrain(){let e=0,{x:t,edges:n,restLen:r}=this;for(let i=0;i<this.nE;i++){let a=3*n[2*i],o=3*n[2*i+1];e+=Math.abs(Math.hypot(t[a]-t[o],t[a+1]-t[o+1],t[a+2]-t[o+2])/r[i]-1)}return e/this.nE}minY(){let e=1/0;for(let t=1;t<this.x.length;t+=3)e=Math.min(e,this.x[t]);return e}};function y(e){let[t,n,r,i,a,o,s,c,l]=e,u=a*l-o*c,d=-(i*l-o*s),f=i*c-a*s,p=1/(t*u+n*d+r*f);return[u*p,-(n*l-r*c)*p,(n*o-r*a)*p,d*p,(t*l-r*s)*p,-(t*o-r*i)*p,f*p,-(t*c-n*s)*p,(t*a-n*i)*p]}var b=`
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
`,x=`
@group(0) @binding(0) var<uniform> m: mat4x4f;
@vertex fn vs(@location(0) p: vec3f) -> @builtin(position) vec4f { return m * vec4f(p, 1.0); }
`,S=b+`
@group(0) @binding(0) var<uniform> u:U;
struct VOut{@builtin(position) pos:vec4f,@location(0) wp:vec3f,@location(1) n:vec3f};
@vertex fn vs(@location(0) p:vec3f,@location(1) n:vec3f)->VOut{
 var o:VOut;o.pos=u.viewProj*vec4f(p.x,-p.y,p.z,1.0);o.wp=p;o.n=n;return o;
}
@fragment fn fs(i:VOut)->@location(0) vec4f{
 let eye=vec3f(u.camPos.x,-u.camPos.y,u.camPos.z);
 let V=normalize(eye-i.wp);let N=normalize(i.n);let ndv=abs(dot(N,V));
 let F=0.025+0.975*pow(1.0-ndv,5.0);
 let optical=studioEnv(reflect(-V,N),0.28,u.bg.rgb)*F*0.45;
 let body=pow(u.flesh.rgb,vec3f(2.0))*(0.075+0.18*pow(1.0-ndv,2.0));
 let fade=exp(-i.wp.y*1.65);
 return vec4f((optical+body)*fade,fade);
}
`,C=b+`
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var shadowMap: texture_depth_2d;
@group(0) @binding(2) var heightMap: texture_depth_2d;
@group(0) @binding(3) var cmp: sampler_comparison;
@group(0) @binding(4) var reflection:texture_2d<f32>;
@group(0) @binding(5) var reflectionSampler:sampler;

struct FSOut { @builtin(position) pos: vec4f, @location(0) ndc: vec2f };
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> FSOut {
  var o: FSOut;
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u)) * 2.0 - 1.0;
  o.pos = vec4f(p, 0.0, 1.0); o.ndc = p; return o;
}

var<private> POISSON: array<vec2f, 16> = array<vec2f, 16>(
  vec2f(-0.94201624, -0.39906216), vec2f(0.94558609, -0.76890725), vec2f(-0.094184101, -0.92938870), vec2f(0.34495938, 0.29387760),
  vec2f(-0.91588581, 0.45771432), vec2f(-0.81544232, -0.87912464), vec2f(-0.38277543, 0.27676845), vec2f(0.97484398, 0.75648379),
  vec2f(0.44323325, -0.97511554), vec2f(0.53742981, -0.47373420), vec2f(-0.26496911, -0.41893023), vec2f(0.79197514, 0.19090188),
  vec2f(-0.24188840, 0.99706507), vec2f(-0.81409955, 0.91437590), vec2f(0.19984126, 0.78641367), vec2f(0.14383161, -0.14100790));

fn keyShadow(P: vec3f) -> f32 {
  let lp = u.lightVP * vec4f(P, 1.0);
  let uv = vec2f(lp.x * 0.5 + 0.5, 0.5 - lp.y * 0.5);
  let z = lp.z;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { return 1.0; }
  // blocker search → penumbra size (PCSS-lite)
  let dims = vec2f(textureDimensions(shadowMap));
  var blk = 0.0; var nb = 0.0;
  for (var i = 0; i < 16; i++) {
    let s = uv + POISSON[i] * 0.02;
    let d = textureLoad(shadowMap, vec2i(clamp(s, vec2f(0.0), vec2f(0.999)) * dims), 0);
    if (d < z - 0.002) { blk += d; nb += 1.0; }
  }
  if (nb < 0.5) { return 1.0; }
  blk /= nb;
  let pen = clamp((z - blk) * 0.45, 0.003, 0.022);
  var sum = 0.0;
  let rot = hash3(P * 91.7) * 6.2831;
  let cs = vec2f(cos(rot), sin(rot));
  for (var i = 0; i < 16; i++) {
    let o = POISSON[i];
    let r = vec2f(o.x * cs.x - o.y * cs.y, o.x * cs.y + o.y * cs.x);
    sum += textureSampleCompareLevel(shadowMap, cmp, uv + r * pen, z - 0.0015);
  }
  return sum / 16.0;
}

fn contactAO(P: vec3f) -> f32 {
  let tp = u.topVP * vec4f(P, 1.0);
  let uv = vec2f(tp.x * 0.5 + 0.5, 0.5 - tp.y * 0.5);
  let dims = vec2f(textureDimensions(heightMap));
  var occ = 0.0;
  // heightmap depth encodes y linearly over [-1, 4]
  for (var ring = 0; ring < 3; ring++) {
    let rad = 0.012 + f32(ring) * 0.028;
    for (var i = 0; i < 8; i++) {
      let a = f32(i) * 0.785398 + f32(ring) * 0.39;
      let s = uv + vec2f(cos(a), sin(a)) * rad;
      if (s.x < 0.0 || s.x > 1.0 || s.y < 0.0 || s.y > 1.0) { continue; }
      let d = textureLoad(heightMap, vec2i(s * dims), 0);
      let h = d * 5.0 - 1.0;
      if (d < 0.9999) {
        let dist = f32(ring) * 0.028 * 5.2 + 0.05;
        occ += (1.0 - smoothstep(0.0, 0.55 + dist, h)) * (1.0 - f32(ring) * 0.22);
      }
    }
  }
  return clamp(occ / 16.0, 0.0, 1.0);
}

struct BgOut { @location(0) c: vec4f };
@fragment fn fsBackground(i: FSOut) -> BgOut {
  let a = u.invViewProj * vec4f(i.ndc, 0.0, 1.0);
  let b = u.invViewProj * vec4f(i.ndc, 1.0, 1.0);
  let ro = a.xyz / a.w;
  let rd = normalize(b.xyz / b.w - ro);
  var col = u.bg.rgb;
  var dep = 1000.0;
  // slight falloff above the horizon, like a paper sweep lit from above
  col *= 1.0 - 0.08 * smoothstep(0.0, 0.6, rd.y);
  if (rd.y < -1e-4) {
    let t = (u.misc.z - ro.y) / rd.y;
    let P = ro + rd * t;
    dep = linearDepth(P);
    let sh = keyShadow(P);
    let ao = contactAO(P);
    // translucent jelly casts a tinted shadow; contact occlusion stays neutral
    let shadowCol = mix(vec3f(1.0), u.shadowTint.rgb, 1.0 - sh);
    var fl = u.bg.rgb * (0.9 + 0.1 * clamp(1.0 - length(P.xz) * 0.12, 0.0, 1.0));
    fl += vec3f(0.050,0.034,0.070)*exp(-dot(P.xz,P.xz)*0.65);
    let pool=P.xz-vec2f(-0.50,-0.40);
    fl += vec3f(0.44,0.39,0.36)*exp(-dot(pool,pool)*2.2);
    fl *= shadowCol;
    fl *= 1.0-ao*0.32;
    let uv=vec2f(i.pos.xy)*u.screen.zw;
    let lod=3.2+clamp(length(P.xz)*0.3,0.0,1.8);
    let reflected=textureSampleLevel(reflection,reflectionSampler,uv,lod).rgb;
    fl+=reflected*0.38;
    let fade = smoothstep(7.0, 22.0, t);
    col = mix(fl, col, fade);
  }
  var o: BgOut; o.c = vec4f(col, dep); return o;
}

struct VIn { @location(0) p: vec3f, @location(1) n: vec3f, @location(2) rest: vec3f, @location(3) mat: f32 };
struct VOut { @builtin(position) pos: vec4f, @location(0) wp: vec3f, @location(1) n: vec3f, @location(2) rest: vec3f, @location(3) mat: f32 };
@vertex fn vsMesh(v: VIn) -> VOut {
  var o: VOut;
  o.pos = u.viewProj * vec4f(v.p, 1.0);
  o.wp = v.p; o.n = v.n; o.rest = v.rest; o.mat = v.mat;
  return o;
}

@fragment fn fsProps(i: VOut) -> BgOut {
  let N = normalize(i.n);
  let V = normalize(u.camPos.xyz - i.wp);
  let NdV = max(dot(N, V), 1e-3);
  let L = u.keyDir.xyz;
  var col: vec3f;
  if (i.mat < 1.5) {
    // seed: dark, lacquered, faint warm brown where it thins out
    let fres = 0.05 + 0.95 * pow(1.0 - NdV, 5.0);
    let n1 = vnoise(i.rest * 90.0);
    var base = u.seed.rgb * (0.8 + 0.4 * n1);
    let rim = pow(1.0 - NdV, 2.0);
    base += vec3f(0.09, 0.035, 0.015) * rim;
    let dif = max(dot(N, L), 0.0) * 0.5 + 0.35;
    let env = studioEnv(reflect(-V, N), 0.22, u.bg.rgb);
    // seeds sit just under the jelly skin, so the jelly supplies the gloss; keep the seed itself matte-dark
    col = base * dif + min(env, vec3f(0.5)) * fres * 0.06;
  } else {
    // air bubble: bright rim, clear core, one crisp highlight
    // soft and low-contrast: a lighter pocket with a faint rim and one pin-point highlight
    let rim = pow(1.0 - NdV, 2.0);
    let reflected=studioEnv(reflect(-V,N),0.08,u.bg.rgb);
    let f0=pow((1.38-1.0)/(1.38+1.0),2.0);
    let fresnel=f0+(1.0-f0)*pow(1.0-NdV,5.0);
    col=u.flesh.rgb*0.045+vec3f(0.95,0.91,1.0)*pow(rim,1.2)*1.15+reflected*fresnel*1.4;
  }
  var o: BgOut; o.c = vec4f(col, linearDepth(i.wp)); return o;
}
`,w=b+`
@group(0) @binding(0) var<uniform> u: U;
struct VIn { @location(0) p:vec3f, @location(1) n:vec3f };
struct VOut { @builtin(position) pos:vec4f, @location(0) wp:vec3f, @location(1) n:vec3f };
@vertex fn vs(v:VIn) -> VOut {
 var o:VOut;o.pos=u.viewProj*vec4f(v.p,1.0);o.wp=v.p;o.n=v.n;return o;
}
@fragment fn fs(i:VOut) -> @location(0) vec4f {
 return vec4f(linearDepth(i.wp),normalize(i.n));
}
`,T,E;async function D(){let e=await fetch(`/jelly/studio-radiance.bin`);if(!e.ok)throw Error(`Could not load studio radiance: `+e.status);let t=await e.arrayBuffer(),n=new Uint32Array(t,0,4);if(n[0]!==1195723825)throw Error(`Invalid studio radiance header`);return{data:t,width:n[1],height:n[2],levels:n[3]}}async function O(){let e=await fetch(`/jelly/jelly-material.wgsl`,{cache:`no-store`});if(!e.ok)throw Error(`Could not load custom jelly shader: `+e.status);return e.text()}var k=b+`
@group(0) @binding(0) var<uniform> u:U;
@group(0) @binding(1) var source:texture_2d<f32>;
@group(0) @binding(2) var guide:texture_2d<f32>;
@group(0) @binding(3) var linearSampler:sampler;
@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {
 let p=vec2f(f32((i<<1u)&2u),f32(i&2u))*2.0-1.0;return vec4f(p,0.0,1.0);
}
var<private> OFFSETS:array<f32,13>=array<f32,13>(-2.1,-1.35,-0.85,-0.5,-0.25,-0.1,0,0.1,0.25,0.5,0.85,1.35,2.1);
var<private> LILAC:array<vec3f,13>=array<vec3f,13>(
 vec3f(0.014920579,0.000000000,0.028739341),
 vec3f(0.052662558,0.000037860,0.063515313),
 vec3f(0.079000839,0.005988105,0.078744538),
 vec3f(0.091020437,0.057791965,0.090983671),
 vec3f(0.113477809,0.121565177,0.108212581),
 vec3f(0.103522443,0.184375628,0.090883061),
 vec3f(0.090790670,0.260482527,0.077842990),
 vec3f(0.103522443,0.184375628,0.090883061),
 vec3f(0.113477809,0.121565177,0.108212581),
 vec3f(0.091020437,0.057791965,0.090983671),
 vec3f(0.079000839,0.005988105,0.078744538),
 vec3f(0.052662558,0.000037860,0.063515313),
 vec3f(0.014920579,0.000000000,0.028739341)
);
var<private> APRICOT:array<vec3f,13>=array<vec3f,13>(
 vec3f(0.028739341,0.000000000,0.000000000),
 vec3f(0.063515313,0.000000003,0.000000000),
 vec3f(0.078744538,0.000143524,0.000029211),
 vec3f(0.090983671,0.016902733,0.009872593),
 vec3f(0.108212581,0.105619222,0.095026760),
 vec3f(0.090883061,0.194666782,0.196383949),
 vec3f(0.077842990,0.365335472,0.397374972),
 vec3f(0.090883061,0.194666782,0.196383949),
 vec3f(0.108212581,0.105619222,0.095026760),
 vec3f(0.090983671,0.016902733,0.009872593),
 vec3f(0.078744538,0.000143524,0.000029211),
 vec3f(0.063515313,0.000000003,0.000000000),
 vec3f(0.028739341,0.000000000,0.000000000)
);
var<private> MINT:array<vec3f,13>=array<vec3f,13>(
 vec3f(0.000000000,0.028739341,0.000000002),
 vec3f(0.000000006,0.063515313,0.000073275),
 vec3f(0.000182878,0.078744538,0.007806769),
 vec3f(0.018346494,0.090983671,0.062556671),
 vec3f(0.107167751,0.108212581,0.121602528),
 vec3f(0.194324828,0.090883061,0.182726955),
 vec3f(0.359956085,0.077842990,0.250467599),
 vec3f(0.194324828,0.090883061,0.182726955),
 vec3f(0.107167751,0.108212581,0.121602528),
 vec3f(0.018346494,0.090983671,0.062556671),
 vec3f(0.000182878,0.078744538,0.007806769),
 vec3f(0.000000006,0.063515313,0.000073275),
 vec3f(0.000000000,0.028739341,0.000000002)
);
fn materialKernel(k:i32)->vec3f {
 if(u.flesh.b<0.7){return APRICOT[k];}
 if(u.flesh.g>0.9){return MINT[k];}
 return LILAC[k];
}
fn materialRadius()->f32 {
 if(u.flesh.b<0.7){return 0.32000000;}
 if(u.flesh.g>0.9){return 0.28201884;}
 return 0.32000000;
}
fn diffuse(fc:vec4f,axis:vec2f)->vec4f {
 let dimensions=vec2f(textureDimensions(guide));
 let uv=fc.xy/ceil(dimensions*0.5);
 let pixel=vec2i(clamp(uv*dimensions,vec2f(0.0),dimensions-1.0));
 let centerGuide=textureLoad(guide,pixel,0);
 if(centerGuide.a<=0.001){return vec4f(0.0);}
 let center=textureSampleLevel(source,linearSampler,uv,0.0);
 let depth=max(center.a,0.1);
 // Finite thickness bounds a material-specific RGB diffusion radius.
 let worldRadius=min(materialRadius(),max(0.035,centerGuide.a*0.28));
 let radius=worldRadius*(dimensions.y/(2.0*0.2400788))/depth;
 let stepUV=axis*radius/dimensions;
 let depthSigma=0.08+0.14*centerGuide.a;
 var sum=vec3f(0.0);var norm=vec3f(0.0);
 for(var k=0;k<13;k++){
  let offset=OFFSETS[k];
  let sampleUV=clamp(uv+stepUV*offset,vec2f(0.001),vec2f(0.999));
  let samplePixel=vec2i(clamp(sampleUV*dimensions,vec2f(0.0),dimensions-1.0));
  let g=textureLoad(guide,samplePixel,0);
  if(g.a<=0.001){continue;}
  let v=textureSampleLevel(source,linearSampler,sampleUV,0.0);
  let difference=abs(v.a-center.a);
  let depthWeight=exp(-difference*difference/(2.0*depthSigma*depthSigma));
  let normalWeight=exp(-(1.0-clamp(dot(normalize(g.xyz),normalize(centerGuide.xyz)),0.0,1.0))*2.6);
  let w=materialKernel(k)*depthWeight*normalWeight;
  sum+=v.rgb*w;norm+=w;
 }
 return vec4f(sum/max(norm,vec3f(0.00001)),center.a);
}
@fragment fn fsX(@builtin(position) fc:vec4f)->@location(0) vec4f{return diffuse(fc,vec2f(1.0,0.0));}
@fragment fn fsY(@builtin(position) fc:vec4f)->@location(0) vec4f{return diffuse(fc,vec2f(0.0,1.0));}
`,A=`
@group(0) @binding(0) var source:texture_2d<f32>;
@group(0) @binding(1) var linearSampler:sampler;
@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f{
 let p=vec2f(f32((i<<1u)&2u),f32(i&2u))*2.0-1.0;return vec4f(p,0.0,1.0);
}
@fragment fn fs(@builtin(position) fc:vec4f)->@location(0) vec4f{
 let input=vec2f(textureDimensions(source));let output=max(floor(input*0.5),vec2f(1.0));
 let uv=fc.xy/output;var color=vec3f(0.0);
 for(var y=-1;y<=1;y+=2){for(var x=-1;x<=1;x+=2){
  color+=textureSampleLevel(source,linearSampler,uv+vec2f(f32(x),f32(y))*0.5/input,0.0).rgb;
 }}
 return vec4f(color*0.25,0.0);
}
`,j=b+`
@group(0) @binding(0) var<uniform> u:U;
@group(0) @binding(1) var surface:texture_2d<f32>;
@group(0) @binding(2) var rawDiffusion:texture_2d<f32>;
@group(0) @binding(3) var blurredDiffusion:texture_2d<f32>;
@group(0) @binding(4) var linearSampler:sampler;
@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {
 let p=vec2f(f32((i<<1u)&2u),f32(i&2u))*2.0-1.0;return vec4f(p,0.0,1.0);
}
@fragment fn fs(@builtin(position) fc:vec4f)->@location(0) vec4f {
 let p=vec2i(fc.xy);let s=textureLoad(surface,p,0);
 let raw=textureLoad(rawDiffusion,p,0);
 let blurred=textureSampleLevel(blurredDiffusion,linearSampler,fc.xy*u.screen.zw,0.0);
 return vec4f(s.rgb+mix(raw.rgb,blurred.rgb,clamp(u.misc.w,0.0,1.0))*s.a,s.a);
}
`,M=`
@group(0) @binding(0) var source:texture_2d<f32>;
@group(0) @binding(1) var linearSampler:sampler;
@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {
 let p=vec2f(f32((i<<1u)&2u),f32(i&2u))*2.0-1.0;return vec4f(p,0.0,1.0);
}
@fragment fn fsExtract(@builtin(position) fc:vec4f)->@location(0) vec4f {
 let dimensions=vec2f(textureDimensions(source));let size=ceil(dimensions*0.5);
 let uv=fc.xy/size;var bright=vec3f(0.0);var norm=0.0;
 // A tent downsample avoids sparkling subpixel highlights and checkerboard bloom.
 for(var y=-1;y<=1;y++){for(var x=-1;x<=1;x++){
  let offset=vec2f(f32(x),f32(y))/dimensions;
  let s=textureSampleLevel(source,linearSampler,uv+offset,0.0);
  let color=min(s.rgb,vec3f(8.0));
  let peak=max(color.r,max(color.g,color.b));
  let soft=clamp(peak-0.28+0.18,0.0,0.36);
  let knee=soft*soft/(0.72+0.00001);
  let contribution=max(peak-0.28,knee)/max(peak,0.0001);
  let weight=select(1.0,2.0,x==0)*select(1.0,2.0,y==0);
  bright+=color*contribution*s.a*weight;norm+=weight;
 }}
 return vec4f(bright/norm,1.0);
}
fn blur(fc:vec4f,axis:vec2f)->vec4f {
 let size=vec2f(textureDimensions(source));let uv=fc.xy/size;
 var sum=vec3f(0.0);var norm=0.0;
 for(var k=-15;k<=15;k++){
  let x=f32(k);let w=0.76*exp(-0.5*x*x/9.0)+0.24*exp(-0.5*x*x/49.0);
  sum+=textureSampleLevel(source,linearSampler,clamp(uv+axis*x/size,vec2f(0.0),vec2f(1.0)),0.0).rgb*w;
  norm+=w;
 }
 return vec4f(sum/norm,1.0);
}
@fragment fn fsX(@builtin(position) fc:vec4f)->@location(0) vec4f{return blur(fc,vec2f(1.0,0.0));}
@fragment fn fsY(@builtin(position) fc:vec4f)->@location(0) vec4f{return blur(fc,vec2f(0.0,1.0));}
`,N=b+`
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var hdr: texture_2d<f32>;
@group(0) @binding(2) var bloom: texture_2d<f32>;
@group(0) @binding(3) var linearSampler: sampler;
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u)) * 2.0 - 1.0;
  return vec4f(p, 0.0, 1.0);
}
fn neutral(c0: vec3f) -> vec3f {
  let startC = 0.8 - 0.008;
  let desat = 0.15;
  let x = min(c0.r, min(c0.g, c0.b));
  let off = select(0.04, x - 6.25 * x * x, x < 0.08);
  var c = c0 - off;
  let peak = max(c.r, max(c.g, c.b));
  if (peak < startC) { return c; }
  let d = 1.0 - startC;
  let np = 1.0 - d * d / (peak + d - startC);
  c *= np / peak;
  let g = 1.0 - 1.0 / (desat * (peak - np) + 1.0);
  return mix(c, vec3f(np), g);
}
fn oetf(c: vec3f) -> vec3f {
  return select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308));
}
@fragment fn fs(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  let bloomUV=fc.xy*u.screen.zw;
 let tight=textureSampleLevel(bloom,linearSampler,bloomUV,0.0).rgb;
 var halo=vec3f(0.0);
 for(var k=0;k<9;k++){
  let angle=f32(k)*2.399963;let radius=sqrt((f32(k)+0.5)/9.0);
  let offset=vec2f(cos(angle),sin(angle))*radius*28.0*u.screen.zw;
  halo+=textureSampleLevel(bloom,linearSampler,clamp(bloomUV+offset,vec2f(0.0),vec2f(1.0)),0.0).rgb/9.0;
 }
 let glow=(tight*0.72+halo*0.28)*u.bg.w;
  let surface=textureLoad(hdr,vec2i(fc.xy),0);
  let coverage=clamp(surface.a,0.0,1.0);
  // Resolve coverage before nonlinear tone mapping, then premultiply for the browser.
  var c=(surface.rgb/max(coverage,0.0001)+glow)*u.misc.x;
  c = neutral(max(c, vec3f(0.0)));
  var s = oetf(clamp(c, vec3f(0.0), vec3f(1.0)));
  s += (hash3(vec3f(fc.xy, 1.0)) - 0.5) / 255.0;
  return vec4f(s*coverage, coverage);
}
`,P={mul(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n},perspective(e,t,n,r){let i=1/Math.tan(e/2),a=new Float32Array(16);return a[0]=i/t,a[5]=i,a[10]=r/(n-r),a[11]=-1,a[14]=n*r/(n-r),a},ortho(e,t,n,r,i,a){let o=new Float32Array(16);return o[0]=2/(t-e),o[5]=2/(r-n),o[10]=1/(i-a),o[12]=-(t+e)/(t-e),o[13]=-(r+n)/(r-n),o[14]=i/(i-a),o[15]=1,o},lookAt(e,t,n){let r=e[0]-t[0],i=e[1]-t[1],a=e[2]-t[2],o=Math.hypot(r,i,a);r/=o,i/=o,a/=o;let s=n[1]*a-n[2]*i,c=n[2]*r-n[0]*a,l=n[0]*i-n[1]*r;o=Math.hypot(s,c,l),s/=o,c/=o,l/=o;let u=i*l-a*c,d=a*s-r*l,f=r*c-i*s;return new Float32Array([s,u,r,0,c,d,i,0,l,f,a,0,-(s*e[0]+c*e[1]+l*e[2]),-(u*e[0]+d*e[1]+f*e[2]),-(r*e[0]+i*e[1]+a*e[2]),1])},invert(e){let t=new Float32Array(16),[n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_]=e,v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=1/(v*k-y*O+b*D+x*E-S*T+C*w);return t[0]=(s*k-c*O+l*D)*A,t[1]=(i*O-r*k-a*D)*A,t[2]=(h*C-g*S+_*x)*A,t[3]=(f*S-d*C-p*x)*A,t[4]=(c*E-o*k-l*T)*A,t[5]=(n*k-i*E+a*T)*A,t[6]=(g*b-m*C-_*y)*A,t[7]=(u*C-f*b+p*y)*A,t[8]=(o*O-s*E+l*w)*A,t[9]=(r*E-n*O-a*w)*A,t[10]=(m*S-h*b+_*v)*A,t[11]=(d*b-u*S-p*v)*A,t[12]=(s*T-o*D-c*w)*A,t[13]=(n*D-r*T+i*w)*A,t[14]=(h*y-m*x-g*v)*A,t[15]=(u*x-d*y+f*v)*A,t}},F=4,I=544,L=class t{sssX;sssY;onLost;onError;static async create(e,n,r,i){if(!navigator.gpu)throw Error(`no-webgpu`);T??=await O(),E??=await D();let a=await navigator.gpu.requestAdapter();if(!a)throw Error(`no-adapter`);let o=await a.requestDevice(),s=new t(e,o,n,r,i);return s.adapter=a,t.keep={adapter:a,gpu:navigator.gpu},await s.checkShaders(),s}constructor(e,t,n,r,i){this.canvas=e,this.device=t,this.ctx=e.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.ctx.configure({device:t,format:this.format,alphaMode:`premultiplied`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}),this.mesh=n,this.nV=n.rest.length/3,this.lost=!1,t.lost.then(e=>{this.lost=!0,this.onLost&&this.onLost(e)}),t.addEventListener&&t.addEventListener(`uncapturederror`,e=>{this.onError&&this.onError(e.error)}),this.replaceMesh(n,r,i),this.ubo=t.createBuffer({size:I,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uboData=new Float32Array(I/4),this.bubbleData=new Float32Array(1152),this.bubbleUbo=t.createBuffer({size:this.bubbleData.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.bubbleCacheBuffer=t.createBuffer({label:`blurred-pocket-radiance`,size:1152,usage:GPUBufferUsage.STORAGE}),this.lightUbo=t.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.topUbo=t.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.cmpSampler=t.createSampler({compare:`less`,magFilter:`linear`,minFilter:`linear`}),this.reflectionSampler=t.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`}),this.linSampler=t.createSampler({magFilter:`linear`,minFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`});let a=E;this.studioTex=t.createTexture({size:[a.width,a.height],format:`rgba16float`,mipLevelCount:a.levels,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let o=16;for(let e=0;e<a.levels;e++){let n=Math.max(1,a.width>>e),r=Math.max(1,a.height>>e),i=n*r*8;t.queue.writeTexture({texture:this.studioTex,mipLevel:e},new Uint8Array(a.data,o,i),{bytesPerRow:n*8,rowsPerImage:r},[n,r]),o+=i}this.studioSampler=t.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`clamp-to-edge`}),this.shadowSize=1024,this.topSize=512,this.shadowTex=t.createTexture({size:[this.shadowSize,this.shadowSize],format:`depth32float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.lightExitTex=t.createTexture({size:[this.shadowSize,this.shadowSize],format:`depth32float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.topTex=t.createTexture({size:[this.topSize,this.topSize],format:`depth32float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.buildPipelines(),this.w=0,this.h=0}replaceMesh(e,t,n){let r=this.device;for(let e of[`dynBuf`,`staticBuf`,`indexBuf`,`lineIdx`,`particleBuf`])this[e]?.destroy();this.mesh=e,this.nV=e.rest.length/3;let i=(e,t)=>{let n=r.createBuffer({size:Math.ceil(e.byteLength/4)*4,usage:t|GPUBufferUsage.COPY_DST});return r.queue.writeBuffer(n,0,e),n};this.dyn=new Float32Array(this.nV*6),this.dynBuf=r.createBuffer({size:this.dyn.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});let a=new Float32Array(this.nV*4);for(let t=0;t<this.nV;t++)a.set(e.rest.subarray(3*t,3*t+3),4*t),a[4*t+3]=e.mat[t];this.staticBuf=i(a,GPUBufferUsage.VERTEX),this.indexBuf=i(e.index,GPUBufferUsage.INDEX),this.lineIdx=i(t,GPUBufferUsage.INDEX),this.lineCount=t.length,this.particleBuf=r.createBuffer({size:n*12,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST})}buildPipelines(){let e=this.device,t=GPUShaderStage.VERTEX,n=GPUShaderStage.FRAGMENT,r=GPUShaderStage.COMPUTE,i=/var<storage,\s*read>\s+bubbleCache/;if(!i.test(T))throw Error(`Jelly material is missing the deep-pocket cache binding.`);let a=T.replace(i,`var<storage,read_write> bubbleCache`)+`
@compute @workgroup_size(64)
fn csBubbleCache(@builtin(global_invocation_id) id:vec3u){
 let k=id.x;if(k>=72u){return;}
 let b=bubbleVolume.pockets[k];
 if(b.center.w<0.002){bubbleCache[k]=vec4f(0.0);return;}
 let ray=normalize(b.center.xyz-u.camPos.xyz);
 let origin=b.center.xyz-ray*(b.center.w*2.5);
 let helper=select(vec3f(0.0,1.0,0.0),vec3f(1.0,0.0,0.0),abs(ray.y)>0.9);
 let axisX=normalize(cross(ray,helper));let axisY=cross(axisX,ray);
 var mean=vec4f(0.0);
 for(var sample=0;sample<9;sample++){
  let angle=f32(sample)*2.399963;
  let radius=sqrt(f32(sample)/8.0)*0.84*b.center.w;
  let offset=(axisX*cos(angle)+axisY*sin(angle))*radius;
  mean+=pocketSample(b,origin+offset,ray,b.center.w*5.0,0.3);
 }
 bubbleCache[k]=mean/9.0;
}
`;this.modules={depth:e.createShaderModule({label:`depth`,code:x}),scene:e.createShaderModule({label:`scene`,code:C}),reflection:e.createShaderModule({label:`planar-reflection`,code:S}),back:e.createShaderModule({label:`back`,code:w}),main:e.createShaderModule({label:`main`,code:T}),bubbleCache:e.createShaderModule({label:`blurred-pocket-cache`,code:a}),post:e.createShaderModule({label:`post`,code:N}),sss:e.createShaderModule({label:`sss-diffusion`,code:k}),composite:e.createShaderModule({label:`material-composite`,code:j}),bloom:e.createShaderModule({label:`bloom`,code:M}),radianceMip:e.createShaderModule({label:`radiance-mip`,code:A})};let o={binding:0,visibility:t|n,buffer:{type:`uniform`}},s=[{binding:7,visibility:n,texture:{sampleType:`float`}},{binding:8,visibility:n,sampler:{type:`filtering`}}];this.layoutDepth=e.createBindGroupLayout({entries:[{binding:0,visibility:t,buffer:{type:`uniform`}}]}),this.layoutScene=e.createBindGroupLayout({entries:[o,{binding:1,visibility:n,texture:{sampleType:`depth`}},{binding:2,visibility:n,texture:{sampleType:`depth`}},{binding:3,visibility:n,sampler:{type:`comparison`}},{binding:4,visibility:n,texture:{sampleType:`float`}},{binding:5,visibility:n,sampler:{type:`filtering`}},...s]}),this.layoutU=e.createBindGroupLayout({entries:[o,...s]}),this.layoutMain=e.createBindGroupLayout({entries:[o,{binding:1,visibility:n,texture:{sampleType:`float`}},{binding:2,visibility:n,texture:{sampleType:`unfilterable-float`}},{binding:3,visibility:n,sampler:{type:`filtering`}},{binding:4,visibility:n,texture:{sampleType:`depth`}},{binding:5,visibility:n,texture:{sampleType:`depth`}},{binding:6,visibility:n,buffer:{type:`uniform`}},...s,{binding:9,visibility:n,buffer:{type:`read-only-storage`}}]}),this.layoutBubbleCache=e.createBindGroupLayout({entries:[{binding:0,visibility:r,buffer:{type:`uniform`}},{binding:4,visibility:r,texture:{sampleType:`depth`}},{binding:5,visibility:r,texture:{sampleType:`depth`}},{binding:6,visibility:r,buffer:{type:`uniform`}},{binding:7,visibility:r,texture:{sampleType:`float`}},{binding:8,visibility:r,sampler:{type:`filtering`}},{binding:9,visibility:r,buffer:{type:`storage`}}]}),this.layoutPost=e.createBindGroupLayout({entries:[o,{binding:1,visibility:n,texture:{sampleType:`unfilterable-float`}},{binding:2,visibility:n,texture:{sampleType:`float`}},{binding:3,visibility:n,sampler:{type:`filtering`}}]}),this.layoutSSS=e.createBindGroupLayout({entries:[o,{binding:1,visibility:n,texture:{sampleType:`float`}},{binding:2,visibility:n,texture:{sampleType:`unfilterable-float`}},{binding:3,visibility:n,sampler:{type:`filtering`}}]}),this.layoutComposite=e.createBindGroupLayout({entries:[o,{binding:1,visibility:n,texture:{sampleType:`unfilterable-float`}},{binding:2,visibility:n,texture:{sampleType:`unfilterable-float`}},{binding:3,visibility:n,texture:{sampleType:`float`}},{binding:4,visibility:n,sampler:{type:`filtering`}}]}),this.layoutBloom=e.createBindGroupLayout({entries:[{binding:0,visibility:n,texture:{sampleType:`float`}},{binding:1,visibility:n,sampler:{type:`filtering`}}]});let c=t=>e.createPipelineLayout({bindGroupLayouts:[t]});this.pBubbleCache=e.createComputePipeline({label:`blurred-pocket-cache`,layout:c(this.layoutBubbleCache),compute:{module:this.modules.bubbleCache,entryPoint:`csBubbleCache`}});let l={arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:`float32x3`}]},u=[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:`float32x3`},{shaderLocation:1,offset:12,format:`float32x3`}]},{arrayStride:16,attributes:[{shaderLocation:2,offset:0,format:`float32x3`},{shaderLocation:3,offset:12,format:`float32`}]}],d=`rgba16float`,f={count:F};this.pDepth=e.createRenderPipeline({label:`depth`,layout:c(this.layoutDepth),vertex:{module:this.modules.depth,entryPoint:`vs`,buffers:[l]},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:`depth32float`,depthWriteEnabled:!0,depthCompare:`less`,depthBias:2,depthBiasSlopeScale:2}}),this.pLightExit=e.createRenderPipeline({label:`light-volume-exit`,layout:c(this.layoutDepth),vertex:{module:this.modules.depth,entryPoint:`vs`,buffers:[l]},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:`depth32float`,depthWriteEnabled:!0,depthCompare:`greater`}}),this.pBackground=e.createRenderPipeline({label:`background`,layout:c(this.layoutScene),vertex:{module:this.modules.scene,entryPoint:`vsFull`},fragment:{module:this.modules.scene,entryPoint:`fsBackground`,targets:[{format:d}]},depthStencil:{format:`depth24plus`,depthWriteEnabled:!1,depthCompare:`always`},multisample:f}),this.pReflection=e.createRenderPipeline({label:`planar-reflection`,layout:c(this.layoutU),vertex:{module:this.modules.reflection,entryPoint:`vs`,buffers:[u[0]]},fragment:{module:this.modules.reflection,entryPoint:`fs`,targets:[{format:d}]},primitive:{topology:`triangle-list`,cullMode:`front`},depthStencil:{format:`depth24plus`,depthWriteEnabled:!0,depthCompare:`less`}}),this.pProps=e.createRenderPipeline({label:`props`,layout:c(this.layoutScene),vertex:{module:this.modules.scene,entryPoint:`vsMesh`,buffers:u},fragment:{module:this.modules.scene,entryPoint:`fsProps`,targets:[{format:d}]},primitive:{topology:`triangle-list`,cullMode:`back`},depthStencil:{format:`depth24plus`,depthWriteEnabled:!0,depthCompare:`less`},multisample:f}),this.pBack=e.createRenderPipeline({label:`back`,layout:c(this.layoutU),vertex:{module:this.modules.back,entryPoint:`vs`,buffers:[u[0]]},fragment:{module:this.modules.back,entryPoint:`fs`,targets:[{format:`rgba32float`}]},primitive:{topology:`triangle-list`,cullMode:`front`},depthStencil:{format:`depth32float`,depthWriteEnabled:!0,depthCompare:`greater`}}),this.pCopy=e.createRenderPipeline({label:`copy`,layout:c(this.layoutMain),vertex:{module:this.modules.main,entryPoint:`vsFull`},fragment:{module:this.modules.main,entryPoint:`fsCopy`,targets:[{format:d},{format:d},{format:d}]},depthStencil:{format:`depth24plus`,depthWriteEnabled:!1,depthCompare:`always`},multisample:f}),this.pJelly=e.createRenderPipeline({label:`jelly`,layout:c(this.layoutMain),vertex:{module:this.modules.main,entryPoint:`vsJelly`,buffers:u},fragment:{module:this.modules.main,entryPoint:`fsJelly`,targets:[{format:d},{format:d},{format:d}]},primitive:{topology:`triangle-list`,cullMode:`back`},depthStencil:{format:`depth24plus`,depthWriteEnabled:!0,depthCompare:`less`},multisample:f}),this.pLines=e.createRenderPipeline({label:`lines`,layout:c(this.layoutMain),vertex:{module:this.modules.main,entryPoint:`vsLine`,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:`float32x3`}]}]},fragment:{module:this.modules.main,entryPoint:`fsLine`,targets:[{format:d,blend:{color:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`}}},{format:d,writeMask:0},{format:d,writeMask:0}]},primitive:{topology:`line-list`},depthStencil:{format:`depth24plus`,depthWriteEnabled:!1,depthCompare:`always`},multisample:f}),this.pPost=e.createRenderPipeline({label:`post`,layout:c(this.layoutPost),vertex:{module:this.modules.post,entryPoint:`vs`},fragment:{module:this.modules.post,entryPoint:`fs`,targets:[{format:this.format}]}});let p=(t,n,r,i)=>e.createRenderPipeline({label:t,layout:c(i),vertex:{module:n,entryPoint:`vs`},fragment:{module:n,entryPoint:r,targets:[{format:d}]}});this.pSSSX=p(`sss-horizontal`,this.modules.sss,`fsX`,this.layoutSSS),this.pSSSY=p(`sss-vertical`,this.modules.sss,`fsY`,this.layoutSSS),this.pComposite=p(`material-composite`,this.modules.composite,`fs`,this.layoutComposite),this.pBloomExtract=p(`bloom-extract`,this.modules.bloom,`fsExtract`,this.layoutBloom),this.pBloomX=p(`bloom-horizontal`,this.modules.bloom,`fsX`,this.layoutBloom),this.pBloomY=p(`bloom-vertical`,this.modules.bloom,`fsY`,this.layoutBloom),this.pRadianceMip=p(`radiance-mip`,this.modules.radianceMip,`fs`,this.layoutBloom),this.bgLight=e.createBindGroup({layout:this.layoutDepth,entries:[{binding:0,resource:{buffer:this.lightUbo}}]}),this.bgTop=e.createBindGroup({layout:this.layoutDepth,entries:[{binding:0,resource:{buffer:this.topUbo}}]}),this.bgU=e.createBindGroup({layout:this.layoutU,entries:[{binding:0,resource:{buffer:this.ubo}},...this.environmentBindings()]}),this.bgBubbleCache=e.createBindGroup({layout:this.layoutBubbleCache,entries:[{binding:0,resource:{buffer:this.ubo}},{binding:4,resource:this.shadowTex.createView()},{binding:5,resource:this.lightExitTex.createView()},{binding:6,resource:{buffer:this.bubbleUbo}},...this.environmentBindings(),{binding:9,resource:{buffer:this.bubbleCacheBuffer}}]})}environmentBindings(){return[{binding:7,resource:this.studioTex.createView()},{binding:8,resource:this.studioSampler}]}async checkShaders(){let e=[];for(let[t,n]of Object.entries(this.modules)){if(!n.getCompilationInfo)continue;let r=await n.getCompilationInfo();for(let n of r.messages)n.type===`error`&&e.push(`${t}:${n.lineNum}:${n.linePos} ${n.message}`)}if(e.length)throw Error(`WGSL compile error
`+e.join(`
`))}resize(e,t){if(e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),e===this.w&&t===this.h)return;this.w=e,this.h=t,this.canvas.width=e,this.canvas.height=t;let n=this.device;for(let e of[`msScene`,`msDepth`,`sceneTex`,`backTex`,`backDepth`,`msHdr`,`hdrTex`,`msDiffuse`,`diffuseTex`,`msGuide`,`guideTex`,`sssX`,`sssY`,`compositeTex`,`bloomA`,`bloomB`,`reflectionTex`,`reflectionDepth`])this[e]&&this[e].destroy();let r=GPUTextureUsage.RENDER_ATTACHMENT,i=GPUTextureUsage.TEXTURE_BINDING;this.reflectionMipCount=1+Math.floor(Math.log2(Math.max(e,t))),this.reflectionTex=n.createTexture({size:[e,t],format:`rgba16float`,mipLevelCount:this.reflectionMipCount,usage:r|i}),this.reflectionDepth=n.createTexture({size:[e,t],format:`depth24plus`,usage:r}),this.bgScene=n.createBindGroup({layout:this.layoutScene,entries:[{binding:0,resource:{buffer:this.ubo}},{binding:1,resource:this.shadowTex.createView()},{binding:2,resource:this.topTex.createView()},{binding:3,resource:this.cmpSampler},{binding:4,resource:this.reflectionTex.createView()},{binding:5,resource:this.reflectionSampler},...this.environmentBindings()]}),this.msScene=n.createTexture({size:[e,t],format:`rgba16float`,sampleCount:F,usage:r}),this.msDepth=n.createTexture({size:[e,t],format:`depth24plus`,sampleCount:F,usage:r}),this.sceneMipCount=1+Math.floor(Math.log2(Math.max(e,t))),this.sceneTex=n.createTexture({size:[e,t],format:`rgba16float`,mipLevelCount:this.sceneMipCount,usage:r|i}),this.backTex=n.createTexture({size:[e,t],format:`rgba32float`,usage:r|i}),this.backDepth=n.createTexture({size:[e,t],format:`depth32float`,usage:r}),this.msHdr=n.createTexture({size:[e,t],format:`rgba16float`,sampleCount:F,usage:r}),this.hdrTex=n.createTexture({size:[e,t],format:`rgba16float`,usage:r|i}),this.bgMain=n.createBindGroup({layout:this.layoutMain,entries:[{binding:0,resource:{buffer:this.ubo}},{binding:1,resource:this.sceneTex.createView()},{binding:2,resource:this.backTex.createView()},{binding:3,resource:this.linSampler},{binding:4,resource:this.shadowTex.createView()},{binding:5,resource:this.lightExitTex.createView()},{binding:6,resource:{buffer:this.bubbleUbo}},...this.environmentBindings(),{binding:9,resource:{buffer:this.bubbleCacheBuffer}}]}),this.msDiffuse=n.createTexture({size:[e,t],format:`rgba16float`,sampleCount:F,usage:r}),this.diffuseTex=n.createTexture({size:[e,t],format:`rgba16float`,usage:r|i}),this.msGuide=n.createTexture({size:[e,t],format:`rgba16float`,sampleCount:F,usage:r}),this.guideTex=n.createTexture({size:[e,t],format:`rgba16float`,usage:r|i});let a=[Math.ceil(e/2),Math.ceil(t/2)];for(let e of[`sssX`,`sssY`,`bloomA`,`bloomB`])this[e]=n.createTexture({size:a,format:`rgba16float`,usage:r|i});this.compositeTex=n.createTexture({size:[e,t],format:`rgba16float`,usage:r|i});let o=(e,t)=>({binding:e,resource:t.createView()}),s={binding:0,resource:{buffer:this.ubo}},c=e=>({binding:e,resource:this.linSampler}),l=e=>n.createBindGroup({layout:this.layoutSSS,entries:[s,o(1,e),o(2,this.guideTex),c(3)]});this.sceneMips=[];for(let e=1;e<this.sceneMipCount;e++)this.sceneMips.push({view:this.sceneTex.createView({baseMipLevel:e,mipLevelCount:1}),bindings:n.createBindGroup({layout:this.layoutBloom,entries:[{binding:0,resource:this.sceneTex.createView({baseMipLevel:e-1,mipLevelCount:1})},c(1)]})});this.reflectionMips=[];for(let e=1;e<this.reflectionMipCount;e++)this.reflectionMips.push({view:this.reflectionTex.createView({baseMipLevel:e,mipLevelCount:1}),bindings:n.createBindGroup({layout:this.layoutBloom,entries:[{binding:0,resource:this.reflectionTex.createView({baseMipLevel:e-1,mipLevelCount:1})},c(1)]})});this.bgSSSX=l(this.diffuseTex),this.bgSSSY=l(this.sssX),this.bgComposite=n.createBindGroup({layout:this.layoutComposite,entries:[s,o(1,this.hdrTex),o(2,this.diffuseTex),o(3,this.sssY),c(4)]});let u=e=>n.createBindGroup({layout:this.layoutBloom,entries:[o(0,e),c(1)]});this.bgBloomExtract=u(this.compositeTex),this.bgBloomX=u(this.bloomA),this.bgBloomY=u(this.bloomB),this.bgPost=n.createBindGroup({layout:this.layoutPost,entries:[s,o(1,this.compositeTex),o(2,this.bloomA),c(3)]})}setUniforms(t,n,r,i){let a=this.uboData;a.set(t.viewProj,0),a.set(t.view,16),a.set(t.invViewProj,32),a.set(n.lightVP,48),a.set(n.topVP,64),a.set([...t.pos,i.time],80),a.set([...t.fwd,0],84),a.set([...n.dir,n.intensity],88),a.set([this.w,this.h,1/this.w,1/this.h],92),a.set([...r.flesh,1],96),a.set([...r.fleshDeep,1],100),a.set([...r.pale,1],104),a.set([...r.skin,1],108),a.set([...r.stripe,1],112),a.set([...r.seed,1],116),a.set([i.shape[0],i.shape[1],i.depthBlurStrength,e.scattering*(1-e.anisotropy)],120),a.set([i.exposure,i.meshAlpha,0,i.scatteringStrength],124),a.set([...i.bg,i.glowStrength],128),a.set([...r.shadowTint,1],132),this.device.queue.writeBuffer(this.ubo,0,a),this.device.queue.writeBuffer(this.lightUbo,0,n.lightVP),this.device.queue.writeBuffer(this.topUbo,0,n.topVP)}uploadGeometry(e,t){this.device.queue.writeBuffer(this.dynBuf,0,this.dyn);let n=this.mesh.subdivision.highCount;for(let e=0;e<72;e++){if(this.mesh.pocketActive?.[e]===0){this.bubbleData.set([0,0,0,1e-4,1,0,0,0,0,1,0,0,0,0,1,0],e*16);continue}let t=n+e*13*20,r=(e,n)=>{let r=(t+e*20+n)*6;return[this.dyn[r],this.dyn[r+1],this.dyn[r+2]]},i=r(0,0),a=r(12,0),o=i.map((e,t)=>(e+a[t])*.5),s=r(12/2,0),c=r(12/2,20/2),l=r(12/2,20/4),u=r(12/2,60/4),d=s.map((e,t)=>(e-c[t])*.5),f=i.map((e,t)=>(e-a[t])*.5),p=l.map((e,t)=>(e-u[t])*.5),m=y([d[0],f[0],p[0],d[1],f[1],p[1],d[2],f[2],p[2]]),h=Math.max(.005,(Math.hypot(...d)+Math.hypot(...f)+Math.hypot(...p))/3);(!m.every(Number.isFinite)||m.some(e=>Math.abs(e)>1e5))&&(m=[1/h,0,0,0,1/h,0,0,0,1/h]),this.bubbleData.set([...o,h],e*16);for(let t=0;t<3;t++)this.bubbleData.set([...m.slice(t*3,t*3+3),0],e*16+4+t*4)}this.device.queue.writeBuffer(this.bubbleUbo,0,this.bubbleData),t&&this.device.queue.writeBuffer(this.particleBuf,0,e)}capture(){return new Promise(e=>{this.captureResolve=e})}draw(e){if(this.lost)return;let t=this.device,n=this.mesh,r=t.createCommandEncoder(),i=n.body.count+n.seeds.count;for(let[e,t]of[[this.shadowTex,this.bgLight],[this.topTex,this.bgTop]]){let n=r.beginRenderPass({colorAttachments:[],depthStencilAttachment:{view:e.createView(),depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`store`}});n.setPipeline(this.pDepth),n.setBindGroup(0,t),n.setVertexBuffer(0,this.dynBuf),n.setIndexBuffer(this.indexBuf,`uint32`),n.drawIndexed(i,1,0,0,0),n.end()}{let e=r.beginRenderPass({label:`light-volume-exit`,colorAttachments:[],depthStencilAttachment:{view:this.lightExitTex.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:`store`}});e.setPipeline(this.pLightExit),e.setBindGroup(0,this.bgLight),e.setVertexBuffer(0,this.dynBuf),e.setIndexBuffer(this.indexBuf,`uint32`),e.drawIndexed(n.body.count),e.end()}{let e=r.beginComputePass({label:`blurred-pocket-radiance`});e.setPipeline(this.pBubbleCache),e.setBindGroup(0,this.bgBubbleCache),e.dispatchWorkgroups(2),e.end()}{let e=r.beginRenderPass({label:`planar-reflection`,colorAttachments:[{view:this.reflectionTex.createView({baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}],depthStencilAttachment:{view:this.reflectionDepth.createView(),depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`discard`}});e.setPipeline(this.pReflection),e.setBindGroup(0,this.bgU),e.setVertexBuffer(0,this.dynBuf),e.setIndexBuffer(this.indexBuf,`uint32`),e.drawIndexed(n.body.count),e.end()}for(let e of this.reflectionMips){let t=r.beginRenderPass({label:`satin-reflection-filter`,colorAttachments:[{view:e.view,clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});t.setPipeline(this.pRadianceMip),t.setBindGroup(0,e.bindings),t.draw(3),t.end()}{let e=r.beginRenderPass({colorAttachments:[{view:this.msScene.createView(),resolveTarget:this.sceneTex.createView({baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,1e3],loadOp:`clear`,storeOp:`discard`}],depthStencilAttachment:{view:this.msDepth.createView(),depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`store`}});e.setBindGroup(0,this.bgScene),e.setPipeline(this.pBackground),e.draw(3),n.seeds.count>0&&(e.setPipeline(this.pProps),e.setVertexBuffer(0,this.dynBuf),e.setVertexBuffer(1,this.staticBuf),e.setIndexBuffer(this.indexBuf,`uint32`),e.drawIndexed(n.seeds.count,1,n.seeds.first,0,0)),e.end()}for(let e of this.sceneMips){let t=r.beginRenderPass({label:`internal-radiance-mip`,colorAttachments:[{view:e.view,clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});t.setPipeline(this.pRadianceMip),t.setBindGroup(0,e.bindings),t.draw(3),t.end()}{let e=r.beginRenderPass({colorAttachments:[{view:this.backTex.createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}],depthStencilAttachment:{view:this.backDepth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:`discard`}});e.setPipeline(this.pBack),e.setBindGroup(0,this.bgU),e.setVertexBuffer(0,this.dynBuf),e.setIndexBuffer(this.indexBuf,`uint32`),e.drawIndexed(n.body.count,1,0,0,0),e.end()}{let t=r.beginRenderPass({colorAttachments:[{view:this.msHdr.createView(),resolveTarget:this.hdrTex.createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`discard`},{view:this.msDiffuse.createView(),resolveTarget:this.diffuseTex.createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`discard`},{view:this.msGuide.createView(),resolveTarget:this.guideTex.createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`discard`}],depthStencilAttachment:{view:this.msDepth.createView(),depthLoadOp:`load`,depthStoreOp:`discard`}});t.setBindGroup(0,this.bgMain),t.setPipeline(this.pJelly),t.setVertexBuffer(0,this.dynBuf),t.setVertexBuffer(1,this.staticBuf),t.setIndexBuffer(this.indexBuf,`uint32`),t.drawIndexed(n.body.count,1,0,0,0),e&&(t.setPipeline(this.pLines),t.setVertexBuffer(0,this.particleBuf),t.setIndexBuffer(this.lineIdx,`uint32`),t.drawIndexed(this.lineCount,1,0,0,0)),t.end()}let a=(e,t,n,i)=>{let a=r.beginRenderPass({label:i,colorAttachments:[{view:e.createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});a.setPipeline(t),a.setBindGroup(0,n),a.draw(3),a.end()};a(this.sssX,this.pSSSX,this.bgSSSX,`SSS diffusion / horizontal`),a(this.sssY,this.pSSSY,this.bgSSSY,`SSS diffusion / vertical`),a(this.compositeTex,this.pComposite,this.bgComposite,`Scattering + optical surface`),a(this.bloomA,this.pBloomExtract,this.bgBloomExtract,`Soft-knee HDR bloom extraction`),a(this.bloomB,this.pBloomX,this.bgBloomX,`Bloom / horizontal`),a(this.bloomA,this.pBloomY,this.bgBloomY,`Bloom / vertical`);let o=this.ctx.getCurrentTexture();{let e=r.beginRenderPass({colorAttachments:[{view:o.createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});e.setPipeline(this.pPost),e.setBindGroup(0,this.bgPost),e.draw(3),e.end()}let s=null;if(this.captureResolve){let e=Math.ceil(this.w*4/256)*256,n=t.createBuffer({size:e*this.h,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});r.copyTextureToBuffer({texture:o},{buffer:n,bytesPerRow:e},[this.w,this.h]),s={buf:n,bpr:e,w:this.w,h:this.h,resolve:this.captureResolve,bgra:this.format.startsWith(`bgra`)},this.captureResolve=null}t.queue.submit([r.finish()]),s&&s.buf.mapAsync(GPUMapMode.READ).then(()=>{let e=new Uint8Array(s.buf.getMappedRange()),t=new Uint8ClampedArray(s.w*s.h*4);for(let n=0;n<s.h;n++)for(let r=0;r<s.w;r++){let i=n*s.bpr+r*4,a=(n*s.w+r)*4;t[a]=e[i+(s.bgra?2:0)],t[a+1]=e[i+1],t[a+2]=e[i+(s.bgra?0:2)],t[a+3]=e[i+3]}s.buf.unmap(),s.buf.destroy(),s.resolve({w:s.w,h:s.h,px:t})})}};function R(e){if(!Object.hasOwn(n,e))throw Error(`Unknown jelly mold`);r=e;let t=d(.18,5),i=p(),a=g(i,2),o=new v(t,{firmness:.4,damping:.55}),s=_(t.rest,t.tets,i.rest),c=i.rest.length/3,l=a.rest.length/3,u=new Float32Array(i.rest.length),f=new Uint32Array(c*4),m=s.w;for(let e=0;e<c;e++)for(let n=0;n<4;n++)f[e*4+n]=t.tets[s.tetOf[e]*4+n];let y=a.index,b=-1,x;function S(e){if(b===o.poseRevision&&x===e)return;let t=o.x;for(let e=0;e<c;e++){let n=4*e,r=3*e,i=3*f[n],a=3*f[n+1],o=3*f[n+2],s=3*f[n+3],c=m[n],l=m[n+1],d=m[n+2],p=m[n+3];u[r]=t[i]*c+t[a]*l+t[o]*d+t[s]*p,u[r+1]=t[i+1]*c+t[a+1]*l+t[o+1]*d+t[s+1]*p,u[r+2]=t[i+2]*c+t[a+2]*l+t[o+2]*d+t[s+2]*p}let n=a.subdivision,r=u.subarray(0,n.bodyVertices*3);for(let e of n.stages)r=h(e,r);for(let t=0;t<l;t++){let i=t<n.highCount?r:u,a=(t<n.highCount?t:t-n.highCount+n.bodyVertices)*3,o=t*6;e[o]=i[a],e[o+1]=i[a+1],e[o+2]=i[a+2],e[o+3]=0,e[o+4]=0,e[o+5]=0}for(let t=0;t<y.length;t+=3){let n=6*y[t],r=6*y[t+1],i=6*y[t+2],a=e[r]-e[n],o=e[r+1]-e[n+1],s=e[r+2]-e[n+2],c=e[i]-e[n],l=e[i+1]-e[n+1],u=e[i+2]-e[n+2],d=o*u-s*l,f=s*c-a*u,p=a*l-o*c;e[n+3]+=d,e[n+4]+=f,e[n+5]+=p,e[r+3]+=d,e[r+4]+=f,e[r+5]+=p,e[i+3]+=d,e[i+4]+=f,e[i+5]+=p}for(let t=0;t<e.length;t+=6){let n=Math.hypot(e[t+3],e[t+4],e[t+5])||1;e[t+3]/=n,e[t+4]/=n,e[t+5]/=n}b=o.poseRevision,x=e}function C(e,t){let n=1/0,r=a.subdivision.stages[0],i=r?r.positions:u,o=r?r.index:y.subarray(0,a.body.count);for(let r=0;r<o.length;r+=3){let a=3*o[r],s=3*o[r+1],c=3*o[r+2],l=i[s]-i[a],u=i[s+1]-i[a+1],d=i[s+2]-i[a+2],f=i[c]-i[a],p=i[c+1]-i[a+1],m=i[c+2]-i[a+2],h=t[1]*m-t[2]*p,g=t[2]*f-t[0]*m,_=t[0]*p-t[1]*f,v=l*h+u*g+d*_;if(Math.abs(v)<1e-12)continue;let y=1/v,b=e[0]-i[a],x=e[1]-i[a+1],S=e[2]-i[a+2],C=(b*h+x*g+S*_)*y;if(C<0||C>1)continue;let w=x*d-S*u,T=S*l-b*d,E=b*u-x*l,D=(t[0]*w+t[1]*T+t[2]*E)*y;if(D<0||C+D>1)continue;let O=(f*w+p*T+m*E)*y;O>1e-4&&O<n&&(n=O)}return n<1/0?[e[0]+t[0]*n,e[1]+t[1]*n,e[2]+t[2]*n]:null}return{sim:o,mesh:a,update:S,pick:C}}var z=[{id:`fluted`,label:`Fluted`},{id:`bloom`,label:`Bloom`},{id:`dome`,label:`Dome`},{id:`pillow`,label:`Pillow`},{id:`pebble`,label:`Pebble`},{id:`twist`,label:`Twist`}],B=[{id:`lilac`,label:`Lilac`,swatch:`#b49ad8`,tint:[.94,.78,.98],deep:[.75,.52,.95]},{id:`apricot`,label:`Apricot`,swatch:`#f7b58b`,tint:[.98,.68,.46],deep:[.79,.4,.22]},{id:`mint`,label:`Mint`,swatch:`#8bd3b0`,tint:[.55,.94,.76],deep:[.27,.67,.46]},{id:`rose`,label:`Rose`,swatch:`#e999b3`,tint:[.98,.49,.67],deep:[.87,.23,.42]},{id:`cobalt`,label:`Cobalt`,swatch:`#7699ed`,tint:[.38,.58,.98],deep:[.15,.32,.88]},{id:`amber`,label:`Amber`,swatch:`#e7bd66`,tint:[.98,.78,.32],deep:[.89,.53,.12]},{id:`aqua`,label:`Aqua`,swatch:`#76cdd7`,tint:[.4,.87,.96],deep:[.15,.61,.8]},{id:`pearl`,label:`Pearl`,swatch:`#e4ddd2`,tint:[.96,.94,.9],deep:[.82,.8,.75]}];function V(e){return{flesh:e.tint,fleshDeep:e.deep,pale:e.tint,skin:e.tint,stripe:e.tint,seed:[0,0,0],shadowTint:e.tint.map(e=>.25+.5*e)}}async function H(e){let r=e.querySelector(`canvas`),i=e.querySelector(`[data-jelly-stage]`),a=e.querySelector(`[data-jelly-toolbar]`),o=e.querySelector(`[data-jelly-status]`),s=e.querySelector(`[data-jelly-loading]`),c=e.querySelector(`[data-jelly-availability]`);if(!r||!i||!a||!o||!s||!c)return;let l=matchMedia(`(prefers-reduced-motion: reduce)`),u=new AbortController,{signal:d}=u,f,p=0,m=!1,h=!0,g=0,_=0,v=!1,y=-1,b,x,S=()=>{cancelAnimationFrame(p),p=0,g=0,_=0},C=()=>{m||(m=!0,S(),u.abort(),b?.disconnect(),x?.disconnect(),f?.ctx.unconfigure(),f?.device.destroy())},w=()=>{e.dataset.state=`fallback`,a.hidden=!0,r.hidden=!0,r.removeAttribute(`tabindex`),s.hidden=!0,c.hidden=!1,o.textContent=c.textContent;let t=e.querySelector(`[data-jelly-name]`);t&&(t.textContent=`Fluted`),C()};if(addEventListener(`pagehide`,C,{signal:d}),addEventListener(`pageshow`,e=>{e.persisted&&location.reload()}),!navigator.gpu){w();return}e.dataset.state=`loading`;try{let c=`fluted`,u=B[0],C=R(c);if(f=await L.create(r,C.mesh,C.sim.edges,C.sim.n),m){f.device.destroy();return}let T=f;T.onError=w,T.onLost=e=>{e.reason!==`destroyed`&&w()};let E=.38,D=.36,O=[0,n[c].height*.47,0],k=P.perspective(1,1,.1,30),A={view:k,viewProj:k,invViewProj:k,pos:[0,0,0],fwd:[0,0,-1]},j=[-.36,.25,-.9],M=Math.hypot(...j),N={dir:j.map(e=>e/M),intensity:4.5,lightVP:k,topVP:k},F=[25,22,35].map(e=>{let t=e/255;return Math.sqrt((t<=.04045?t/12.92:((t+.055)/1.055)**2.4)/6.25)}),I=()=>{!p&&!m&&h&&!document.hidden&&(p=requestAnimationFrame(U))},H=()=>{let e=T.w/T.h,t=27*Math.PI/180,r=Math.tan(t/2),i=n[c],a=Math.max(i.height*.8/(r*.9*.79),i.fit/(r*.92*e*.82))*1.02,o=Math.cos(D),s=[a*Math.sin(E)*o,O[1]+a*Math.sin(D),a*Math.cos(E)*o];A.view=P.lookAt(s,O,[0,1,0]),A.viewProj=P.mul(P.perspective(t,e,.1,60),A.view),A.invViewProj=P.invert(A.viewProj),A.pos=s;let l=O.map((e,t)=>e-s[t]),u=Math.hypot(...l);A.fwd=l.map(e=>e/u);let d=[0,.3,0];N.lightVP=P.mul(P.ortho(-2.4,2.4,-2.4,2.4,.1,14),P.lookAt(N.dir.map((e,t)=>d[t]+e*7),d,[0,0,1])),N.topVP=P.mul(P.ortho(-2.6,2.6,-2.6,2.6,0,5),P.lookAt([0,-1,0],[0,1,0],[0,0,-1]))};function U(n){if(p=0,m||!h||document.hidden)return;let r=Math.min(g?(n-g)/1e3:1/60,1/30);g=n;let i=C.sim;if(!i.sleeping&&(!l.matches||v)){_+=r;let e=0;for(;_>=i.stepDt&&e<2;)i.step(),_-=i.stepDt,e++;e===2&&(_=Math.min(_,i.stepDt))}else _=0;C.update(T.dyn),y!==i.poseRevision&&(T.uploadGeometry(i.x,!1),y=i.poseRevision),H(),T.setUniforms(A,N,V(u),{time:0,shape:[t.T,t.Ro,t.skin,t.pale],exposure:1,meshAlpha:0,bg:F,scatteringStrength:1,glowStrength:.18,depthBlurStrength:.85}),T.draw(!1),e.dataset.frames=String(Number(e.dataset.frames??0)+1),e.dataset.sleeping=String(i.sleeping),e.dataset.volume=i.volumeRatio().toFixed(4);let a=0;for(let e=0;e<i.x.length;e+=3)a=Math.max(a,Math.hypot(i.x[e]-i.rest[e],i.x[e+1]-i.rest[e+1],i.x[e+2]-i.rest[e+2]));e.dataset.deformation=a.toFixed(4),e.dataset.azimuth=E.toFixed(3),i.sleeping&&(v=!1),!i.sleeping&&(!l.matches||v)?I():g=0}let W=()=>{if(m)return;let e={width:i.clientWidth,height:i.clientHeight};if(!e.width||!e.height)return;let t=Math.min(devicePixelRatio,1.25,1500/e.width);T.resize(e.width*t,e.height*t),I()};b=new IntersectionObserver(([e])=>{h=e?.isIntersecting??!1,h?I():(q(),S())}),b.observe(i),x=new ResizeObserver(W),x.observe(i),document.addEventListener(`visibilitychange`,()=>{document.hidden?(q(),S()):I()},{signal:d});let G,K=(e,t)=>{let n=r.getBoundingClientRect(),i=(e-n.left)/n.width*2-1,a=1-(t-n.top)/n.height*2,o=A.invViewProj,s=e=>{let t=o[3]*i+o[7]*a+o[11]*e+o[15];return[(o[0]*i+o[4]*a+o[8]*e+o[12])/t,(o[1]*i+o[5]*a+o[9]*e+o[13])/t,(o[2]*i+o[6]*a+o[10]*e+o[14])/t]},c=s(0),l=s(1).map((e,t)=>e-c[t]),u=Math.hypot(...l);return{origin:c,direction:l.map(e=>e/u)}};function q(){C.sim.endGrab(),G&&r.hasPointerCapture(G.id)&&r.releasePointerCapture(G.id),G=void 0,i.classList.remove(`is-grabbing`),I()}let J=()=>{G&&(G.pending=!1,r.setPointerCapture(G.id),G.hit&&(C.sim.beginGrab(G.hit,.4),v=!0),i.classList.add(`is-grabbing`),I())};r.addEventListener(`pointerdown`,e=>{if(G||e.button>0)return;let t=K(e.clientX,e.clientY);G={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,pending:e.pointerType===`touch`,hit:C.pick(t.origin,t.direction)},G.pending||(J(),e.preventDefault())},{signal:d}),r.addEventListener(`pointermove`,e=>{if(!(!G||e.pointerId!==G.id)){if(G.pending){let t=Math.abs(e.clientX-G.startX),n=Math.abs(e.clientY-G.startY);if(Math.max(t,n)<8)return;if(n>=t){G=void 0;return}J()}if(G.hit){let t=K(e.clientX,e.clientY),n=A.fwd,r=t.direction.reduce((e,t,r)=>e+t*n[r],0);if(Math.abs(r)>1e-5){let e=G.hit.reduce((e,r,i)=>e+(r-t.origin[i])*n[i],0)/r,i=t.origin.map((n,r)=>n+t.direction[r]*e);i[0]=Math.max(-2.2,Math.min(2.2,i[0])),i[1]=Math.max(.02,Math.min(2.3,i[1])),i[2]=Math.max(-2.2,Math.min(2.2,i[2])),C.sim.moveGrab(i,[1,0,0,0,1,0,0,0,1])}}else E-=(e.clientX-G.x)*.006,D=Math.max(.15,Math.min(1.1,D+(e.clientY-G.y)*.005));G.x=e.clientX,G.y=e.clientY,I()}},{signal:d});for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])r.addEventListener(e,q,{signal:d});let Y=()=>{q(),C.sim.reset(0),E=.38,D=.36,v=!1,_=0,o.textContent=`Jelly and view reset.`,I()},X=()=>{C.sim.nudge(l.matches?.2:.7),v=!0,o.textContent=`Jelly wobbling.`,I()};e.querySelector(`[data-jelly-reset]`)?.addEventListener(`click`,Y,{signal:d}),e.querySelector(`[data-jelly-wobble]`)?.addEventListener(`click`,X,{signal:d}),r.addEventListener(`keydown`,e=>{[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`w`,`W`,`r`,`R`].includes(e.key)&&e.preventDefault(),e.key===`ArrowLeft`&&(E-=.2),e.key===`ArrowRight`&&(E+=.2),e.key===`ArrowUp`&&(D=Math.min(1.1,D+.12)),e.key===`ArrowDown`&&(D=Math.max(.15,D-.12)),(e.key===`Home`||e.key.toLowerCase()===`r`)&&Y(),e.key.toLowerCase()===`w`&&X(),I()},{signal:d}),r.addEventListener(`dblclick`,Y,{signal:d});let Z=!1;e.querySelectorAll(`[data-jelly-shape]`).forEach(t=>t.addEventListener(`click`,async()=>{let r=z.find(e=>e.id===t.dataset.jellyShape);if(!(!r||r.id===c||Z||m)){Z=!0,q(),S(),i.setAttribute(`aria-busy`,`true`),e.querySelectorAll(`[data-jelly-shape]`).forEach(e=>e.disabled=!0),o.textContent=`Shaping ${r.label} jelly.`;try{if(await new Promise(e=>requestAnimationFrame(()=>e())),m)return;c=r.id,C=R(c),C.sim.reset(0),T.replaceMesh(C.mesh,C.sim.edges,C.sim.n),y=-1,O[1]=n[c].height*.47,E=.38,D=.36,v=!1,e.dataset.shape=c;let i=e.querySelector(`[data-jelly-name]`);i&&(i.textContent=r.label);let a=e.querySelector(`.jelly__caption > span`);a&&(a.firstChild.textContent=`${String(z.indexOf(r)+1).padStart(2,`0`)} / `),e.querySelectorAll(`[data-jelly-shape]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e===t))),o.textContent=`${r.label} jelly, ${u.label} color. Pull to stretch.`}catch{w()}finally{Z=!1,i.removeAttribute(`aria-busy`),e.querySelectorAll(`[data-jelly-shape]`).forEach(e=>e.disabled=!1),I()}}},{signal:d})),e.querySelectorAll(`[data-jelly-color]`).forEach(t=>t.addEventListener(`click`,()=>{let n=B.find(e=>e.id===t.dataset.jellyColor);if(!n)return;u=n,e.dataset.color=u.id,e.querySelectorAll(`[data-jelly-color]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e===t)));let r=e.querySelector(`[data-jelly-color-name]`);r&&(r.textContent=u.label),o.textContent=`${u.label} jelly color selected.`,I()},{signal:d})),l.addEventListener(`change`,()=>{l.matches?Y():I()},{signal:d}),C.sim.reset(0),W(),e.dataset.state=`ready`,a.hidden=!1,s.hidden=!0,o.textContent=`Fluted jelly ready. Six shapes and eight colors. Pull to stretch.`,I()}catch{w()}}export{H as mountJelly};