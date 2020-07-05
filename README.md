# procgen-sprite-perlin
Generating animated sprites using Perlin noise.

<img src="wavelets.gif">

# How does this work?
For each pixel on the grid:
- Sample a value **P** from a slice of 3D Perlin noise (i.e. noise(x,y,time)) across a grid. This value is between 0 and 1.
- For each pixel on the grid, we obtain a value **F** (also between 0 and 1) from a falloff function based on the pixel's coordinates and its distance from the center of the grid. A pixel that is far from the center (i.e. at the edges) of the grid contains a high falloff value, and conversely pixels near the center have a low falloff value.
  - Example falloff functions: distance function sqrt(x^2+y^2), Gaussian function e^(-x^2), etc. Some other functions like sin(x)/x also produce quite interesting results.
- If **P** < **F**, then we keep that pixel. Otherwise, the pixel is empty.
- Color the pixel according to the range of values that its Perlin noise sample is contained in (e.g. green for 0.0<**P**<0.33, green for 0.34<**P**<0.66, blue for 0.67<**P**<1). We can get creative at this step with various color palettes / gradients. The "cloudiness" of Perlin noise results in rather smooth regions of the shape coloured, with what looks sort of like a topo map.
- Flip the pixel according to desired axis of symmetry (vertical, horizontal, diagonal, none)

And we're done!
