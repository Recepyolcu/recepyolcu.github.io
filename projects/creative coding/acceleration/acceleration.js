
let canvas;
let h1, p;
let obj = [];
let time, fr;
let force;

setup = function() {
    canvas = createCanvas(1000, 500);

    h1 = createElement('h1', 'Acceleration');
    p = createP('');
    noCursor();

    h1.parent('#container');
    canvas.parent('#container');
    p.parent('#container');

    // time
    fr = 60;
    frameRate(fr);
    time = new Time(fr);

    force = new Force();
    force.addForce('gravity', createVector(0, 0.0981));
    force.promtForces();
    console.log(force.netForce());

}

draw = function() {

    background(255);

    obj.forEach(o => {        
        o.draw();
        o.edges(width, height);
        force.forces[0].force.mult(o.mass);
        o.applyForce(force.forces[0].force);
        o.update();       
    });
    
    // mouse
    push();
    fill(255);
    circle(mouseX, mouseY, 20);
    pop();
}

function mousePressed() {
    obj.push(new Physics(
        createVector(mouseX, mouseY), // position
        createVector(0, 0), // velocity
        createVector(0, 0), // acceleration
        10, // mass
    ));
}

// pause
function keyPressed() {
    if (keyCode == 32) {
        if (isLooping()) {
            noLoop();
        } else {
            loop();
        }
    }
}


class Time {
    constructor (framerate) {
        this.frameRate = framerate;
        this.time = 0;
    }

    frameToTime() {
        if (frameCount % this.frameRate == 1) this.time += 1;
        console.log(this.time);
    }
}

class Force {
    constructor () {
        this.forces = [];
    }

    addForce(forceName, force) {
        this.forces.push({'name': forceName, 'force': force});
    }

    netForce() {
        let force  = createVector(0, 0);
        for (let i = 0; i < this.forces.length; i++) {
            force.add(this.forces[i].force);
        }
        return force;
    }

    promtForces() {
        for (let i = 0; i < this.forces.length; i++) {
            console.log(this.forces[i]);
        }
    }
}

class Physics {
    constructor (pos, vel, acc, mass) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.volume = this.mass * 10;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    applyForce(force) {
        let f = force.div(this.mass);
        this.acc.add(f);
    }

    color(){
        let velToColor = map(Math.abs(this.vel.mag()), 0, 15, 0, 255);
        fill(velToColor);
    }

    edges(width, height) {
        if(this.pos.x > width - this.mass * 5 || this.pos.x < this.mass * 5) {
            this.vel.x *= -0.7;
        }
        if(this.pos.y > height - this.mass * 5 || this.pos.y < this.mass * 5) {
            this.vel.y *= -0.7;
        }
    }

    bodyIntersection() {

    }

    draw() {
        ellipseMode(CENTER);
        circle(this.pos.x, this.pos.y, this.mass * 10);
    }
}