const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


window.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    location.reload();
  }
});

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const aniArcs = [];

  for (let i = 0; i < 3; i++) {
    const radius = random.range(0, width * 0.3);
    const vel = random.range(0, 0.3);

    aniArcs.push(new AnimateArc(radius, vel));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width  * 0.5;
    const cy = height * 0.5;
   
    aniArcs.forEach(arc => {
      console.log(arc.vel);
      
      arc.update(width);
      arc.draw(context, cx, cy);
      
      arc.colorChange(context);
    });
    
    
    function rndColor(r, g, b) {
      return "rgb(" + random.range(0, r) + "," + random.range(0, g) + "," + random.range(0, b) + ")";
    }
    
    function drawArcs(xS, yS, rad, sAngle, eAngle, num, r, g, b) {
      for (let i = 0; i < num; i++) {
        
        const slice = math.degToRad(360 / num);
        const angle = slice * i; 

        context.save();
        context.translate(xS, yS);
        context.rotate(-angle);
        
        context.lineWidth = random.range(1, 15);
        context.strokeStyle = rndColor(r, g, b);
        
        context.beginPath();
        context.arc(0, 0, radius * rad * random.range(0, 1.5), sAngle * random.range(0.5, 1.5), eAngle * random.range(0.5, 1.5));
        context.stroke();
        
        context.restore();
      }
    }

    function drawMLine (xS, yS, w, h, num, r, g, b) {
      context.fillStyle = rndColor(r, g, b);;
      for (let i = 0; i < num; i++) {
        
        const slice = math.degToRad(360 / num);
        const angle = slice * i; 

        context.save();
        context.translate(xS, yS);
        context.rotate(-angle);
        
        context.lineWidth = random.range(5, 15);
        
        context.beginPath();
        context.rect(15, 15, w, h);
        context.fill();
        
        context.restore();
      }
    }

    function randStars (num) {
      for (let i = 0; i < num; i++) {

        context.fillStyle = "white";

        context.beginPath();
        context.arc(random.range(0, width), random.range(0, height), 1, 0, Math.PI *2);
        context.fill();

      }
    }
    
    //       x      y       rad  sA   eA   lineNum     R    G    B
     drawArcs(-100,     -100,      3,   2,   1,   30,     200,  10,  200);
     randStars(50);
    // drawArcs(width, 0,      1,   1,   1,   30,     200,  40,  150);
    // drawArcs(0,     height, 1,   1,   1,   30,     244,  244, 20);
    // drawArcs(width, height, 1,   1,   1,   30,     10,   20, 244);
    // drawArcs(cx,    cy,     0.3, 1,   1,   20,     255,  255, 255);
    // drawArcs(cx,    cy,     1,   1,   1,   1,      255,  255, 255);

    // drawMLine(cx, cy, 10, height, 8, 244, 244, 244);
  };
};

class AnimateArc {
  constructor(radius, vel, value) {
    this.value = value;
    this.vel = vel;
    this.radius = radius;
  }

  draw(context, cx, cy) {

    context.save();
    context.translate(cx, cy);
    context.lineWidth = 2;
    context.strokeStyle = "black"

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  colorChange (context) {
    context.strokeStyle = "rgb(" + this.value + "," + this.value + "," + this.value + ")";
    console.log(this.value);
  }

  update (width) {
    if (this.radius * 2 < width) {
      this.radius += this.vel;
    }
    if (this.radius * 2 > width) {
      this.radius -= this.vel;
    }
  }
}

canvasSketch(sketch, settings);
