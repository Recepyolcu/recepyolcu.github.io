const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  agentNum: 100,
  velMin: -1,
  velMax: 1,
  agentLineWidth: 5,
  agentRadMin: 6,
  agentRadMax: 12,
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  
  for (let i = 0; i < params.agentNum; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        if (dist > 200) continue

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
      // agent.wrap(width, height);
    });
  };
};

class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}

class Agent {
  constructor (x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(params.velMin, params.velMax), random.range(params.velMin, params.velMax));
    this.radius = random.range(6, 12);
  }

  bounce (width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap (width, height) {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } 

    if(this.pos.x > width) {
      this.pos.x = 0;
    }

    if (this.pos.y < 0) {
      this.pos.y = height;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  update () {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw (context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI *2);
    context.fill();
    context.stroke();

    context.restore();
  }
}

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'Properties'});
  folder.addInput(params, 'agentNum', {min: 10, max: 200});
  folder.addInput(params, 'velMin', {min: -5, max: -1});
  folder.addInput(params, 'velMax', {min: 1, max: 5});

};

createPane();

canvasSketch(sketch, settings);
