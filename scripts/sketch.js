// import console = require("console");

WIDTH = 800
HEIGHT = 800

// GRIDW = WIDTH
// GRIDH = HEIGHT

GRIDW = 64
GRIDH = 64
SYMMETRY = "vertical"

nColors = 10
// build color palette
colors = []

randomNegative = function()
{
  if (Math.random() > 0.5) { return 1} else {return -1}
}
z = 15

ellipseLat = Math.random()*2
ellipseLong = Math.random()*2
console.log(ellipseLat)

noiseScale = 0.3
t = 0
function setup() {
    createCanvas(WIDTH, HEIGHT);
    colorMode(RGB, 255);

    // generate color gradient
    for (let i = 0; i < nColors; i++)
    {
      colors.push(color(255,255-255/((i*0.3)**2+0.01),255))
      // colors.push(color(255, Math.random()*255, Math.random()*255))

    }
    frameRate(6)
  }
  
  function draw() {
    background(220);
    var centerX = GRIDW/2
    var centerY = GRIDH/2
    
    var symmetry = SYMMETRY;

    var iterateW;
    var iterateH;
    
    if (symmetry == "horizontal")
    {
      iterateW = GRIDW
      iterateH = GRIDH/2
    }
    else if (symmetry == "vertical")
    {
      iterateW = GRIDW/2
      iterateH = GRIDH

    }
    else if (symmetry == "diagonal" || symmetry == "none")
    {
      iterateW = GRIDW
      iterateH = GRIDH
    }

    for (let i = 0; i < iterateH; i++)
    {

      // Diagonally iterate through grid if selected symmetry
      if (symmetry == "diagonal")
      {
        diagonalDecrement = i;
      }
      else
      {
        diagonalDecrement = 0
      }


        for (let j = 0; j < iterateW-diagonalDecrement; j++)
        {
            let val  = noise(j*noiseScale,i*noiseScale, t)
            falloff_constant = 0

            distance = 1-Math.sqrt((j-centerX)**2+(i-centerY)**2)/Math.sqrt(centerX**2+centerY**2)
            f = distance/((2**falloff_constant-1) * (1-distance) + 1)


            // Sigmoid
            // f = 1-1/(1+(distance/(1-distance))**(3))

            // Wavelet
            f = (Math.sin(-sin(t)*50*distance)/(2*distance))
            // f = (Math.sin(-sin(t)/t*500*distance)/(distance))

            // Vanilla distance
            // f = distance

            // Reciprocal distance
            // f = 3/(Math.sqrt(ellipseLat*(j-centerX)**2 + ellipseLong*(i-centerY)**2))

            // Gaussian falloff
            // f = 1*Math.exp(-0.0015*Math.sqrt((j-centerX)**2+(i-centerY)**2)**2)
            
            if (val > f)
            {
              // c = Math.floor(Math.random()*255)
              c = 20
            }
            else
            {
              // set color
              for (let p = 0; p < colors.length; p++)
              {
                if (val < p/colors.length)
                {
                  c = colors[p]
                  break

                }
              }
              
            }
            // let c = color(val,val,val)
            for (a = 0; a < WIDTH/GRIDW; a++)
            {
              for (b = 0; b < HEIGHT/GRIDH; b++)
              {

                // Vertical axis of symmetry
                if (symmetry == "vertical")
                {
                // Show sprite
                set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,c)
                set(WIDTH - 1 - (b+WIDTH/GRIDW*j),a+HEIGHT/GRIDH*i,c)

                // Show falloff
                // set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,f*255)
                // set(WIDTH - 1 - (b+WIDTH/GRIDW*j),a+HEIGHT/GRIDH*i,f*255)

                }

                if (symmetry == "horizontal")
                {
                // Horizontal axis of symmetry
                // Show sprite
                set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,c)
                set((b+WIDTH/GRIDW*j),HEIGHT-1-a-HEIGHT/GRIDH*i,c)

                // Show falloff
                // set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,f*255)
                // set((b+WIDTH/GRIDW*j),HEIGHT-1-a-HEIGHT/GRIDH*i,f*255)

                }

                if (symmetry == "diagonal")
                {
                // Diagonal axis of symmetry
                // Show sprite
                set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,c)
                set(WIDTH-1-(a+HEIGHT/GRIDH*i),HEIGHT-(b+WIDTH/GRIDW*j),c)

                // Show falloff
                // set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,f*255)
                // set(WIDTH-1-(a+HEIGHT/GRIDH*i),HEIGHT-(b+WIDTH/GRIDW*j),f*255)

                }
                if (symmetry == "none")
                {
                // Show sprite
                set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,c)

                // Show falloff
                // set(b+WIDTH/GRIDW*j,a+HEIGHT/GRIDH*i,f*255)

                }







                // set(WIDTH-j-1, i,c)    
              }
            }
        }
    }
    t+=0.01
    // noiseScale = Math.tan(t)

    updatePixels();
  }
