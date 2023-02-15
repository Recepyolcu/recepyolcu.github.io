let canvas;
let bulb = [];

function setup(){
    canvas = createCanvas(900, 900);
    canvas.parent('#container');
    for (let i = 1; i <= 20; i++) {
        bulb.push(new Pendulum(5, map(i, 1, 20, 100, 700), radians(50)));
    }
}

function draw() {

    background(0);
    bulb.forEach(b => {
        b.draw();
    });

}

function mousePressed() {
    bulb.clicked(mouseX, mouseY);
}

function mouseReleased() {
    bulb.stopDragging();
}

class Pendulum {
    constructor (mass, r, angle) {

        this.pos      = createVector(0, 0);
        this.origin   = createVector(width / 2, 0);
        this.r        = r;
        this.mass     = mass;
        this.angle    = angle;
        this.angVel   = 0;
        this.angAcc   = 0;
        this.ballR    = 20;
        this.damping  = 0.995; 
        this.dragging = false;

    }

    update() {
        if (!this.dragging) {
            let gravity = 0.4;
            this.angAcc = (-1 * gravity / this.r * this.mass) * sin(this.angle);

            this.angVel += this.angAcc;
            this.angVel *= this.damping;
            this.angle  += this.angVel;
        }
    }

    clicked(mx, my){
        let d = dist(mx, my, this.pos.x, this.pos.y);
        if (d < this.ballR) {
            this.dragging = true;
        }
    }

    stopDragging() {
        if (this.dragging) {
            this.angVel = 0;
            this.dragging = false;
        }
    }

    drag() {
        if (this.dragging) {
            let diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY));
            this.angle = atan2(-1 * diff.y, diff.x) - radians(90);
        }
    }

    display() {

        this.pos.set(sin(this.angle) * this.r, cos(this.angle) * this.r);
        this.pos.add(this.origin);

        stroke(255);
        line(this.origin.x, this.origin.y, this.pos.x, this.pos.y);

        ellipseMode(CENTER);
        fill(255);
        if (this.dragging) fill(120, 0, 150)
        circle(this.pos.x, this.pos.y, this.ballR);
        
    }

    draw() {
        this.update();
        this.drag();
        this.display();
    }
}