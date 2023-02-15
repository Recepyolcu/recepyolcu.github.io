let canvas;
let h1;
let time, fr;
let force;
let obj = [];

function setup() {
    canvas = createCanvas(1000, 500);

    h1 = createElement('h1', 'Physics');
    noCursor();

    h1.parent('#container');
    canvas.parent('#container');

    fr = 60;
    frameRate(fr);
    time = new Time();
}

function draw() {
    background(255);

    obj.forEach(o => {
        o.draw();
        o.edges();
        o.animate();
        o.applyForce(createVector(0, 1))
    });

    circle(mouseX, mouseY, 40);
}

function mousePressed() {
    obj.push( new MatterObject(
        10, 
        50,
        createVector(mouseX, mouseY),
        createVector(0, 0),
        createVector(10, 1)
    ));
    console.log(obj.length);
}

class Time {
    constructor () {

    }
}

class Force {
    constructor (object) {
        this.obj = object;
        this.forces = [];
    }

    applyForce(force) {
        let f = force.div(this.mass);
        this.obj.acc.add(f);
    }

    netForce() {

    }
}

class MatterObject {
    constructor (mass, volume, position, velocity, accelerate) {
        this.mass = mass;
        this.volume = volume;
        this.pos = position;
        this.vel = velocity;
        this.acc = accelerate;
    }

    draw() {
        push()
        fill(110, 10, 150, 100);
        noStroke();
        circle(this.pos.x, this.pos.y, this.volume);
        pop();
    }

    
    applyForce(force) {
        let f = force.div(this.mass);
        this.acc.add(f);
    }

    animate() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.vel.limit(5);
    }

    edges() {
        if (this.pos.x > width - this.volume / 2 || this.pos.x < this.volume / 2) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height - this.volume / 2 || this.pos.y < this.volume / 2) {
            this.vel.y *= -1;
        }
    }

}

class Physics {
    constructor () {

    }
}