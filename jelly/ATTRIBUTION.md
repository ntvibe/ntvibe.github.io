Studio Small 09 by Sergej Majboroda / Poly Haven. CC0.
Source: https://polyhaven.com/a/studio_small_09
1K HDR MD5: d5d7eb9d26d341d6aa4d11c1a54fd97c
Processed into a local linear half-float radiance mip pyramid for WebGPU.
Glossy filtering uses an approximate tent pyramid, not a fully importance-sampled GGX convolution.
The local radiance texture also bakes three finite studio light cards in linear
radiance, matching the former zero-roughness procedural card lighting. Each mip
preserves integrated RGB incident energy, within half-float storage precision.
Solid-angle weighted RGB spherical harmonics (9 coefficients), with cosine
convolution, provide precomputed diffuse irradiance for the realtime SSS shader.
