const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const lw = 5;

const sketch = ({ context, width, height }) => {
  const rects = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(100, width - 100);
    const y = random.range(100, height - 100);

    rects.push(new Rect(x, y));
  }

  // animate edilen kısım 
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.lineWidth = lw;

    // her oluşturulan Rect nesnesi için
    rects.forEach(rect => {
      rect.update();
      rect.bounce(width, height);
      rect.draw(context);
    });
    
  };
};

class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor (x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = 20;
  } 
  
  draw (context) {
    context.save();

    context.translate(this.pos.x, this.pos.y);
    
    context.beginPath();
    context.rect(0, 0, this.radius, this.radius);
    context.stroke();

    context.restore();
  }

  update () {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce (width, height) {
    if (this.pos.x + this.radius + lw >= width || this.pos.x - lw <= 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y + this.radius + lw >= height || this.pos.y - lw <= 0) {
      this.vel.y *= -1;
    }
  }
}

canvasSketch(sketch, settings);
