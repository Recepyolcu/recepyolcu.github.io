let balls = [];
let numBalls = 5;
let ball;
let liquid;
let restitution = 0.7;

function setup() {
    createCanvas(800, 800);

    for (let i = 0; i < 3; i++) {
        balls.push(new Ball(random(width), 100, i + 1, (i + 1) * 20));
    }
    liquid = new Liquid(0, height / 2, width, height / 2, 1, 0.01);

}
  
function draw() {
    background(0);
    liquid.display();
    
    balls.forEach(ball => {
        let gravity = createVector(0, 0.1 * ball.mass);
        let airResistance = 0.01;
        
        if (mouseIsPressed) {
            ball.handleDrag(mouseX, mouseY);
        }

        if (liquid.contains(ball)) {
            let dragForce = liquid.drag(ball);
            ball.applyForce(dragForce);
        }

        if (!liquid.contains(ball)) {
            ball.vel.x -= airResistance * ball.vel.x;
            ball.vel.y -= airResistance * ball.vel.y;
        }


        ball.applyForce(gravity);
        ball.update();
        ball.checkFloor();
        ball.display();
    });

    
}

class Ball {
    constructor(x, y, m, volume) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.a = createVector(0, 0);
        this.volume = volume;
        this.mass = m;
        this.drag = 0.999;
        this.stretch = 0;
        this.rotation = 0;
    }
    
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.a.add(f);
    }
    
    update() {
        this.vel.add(this.a);
        this.vel.mult(this.drag);
        this.pos.add(this.vel);
        this.a.mult(0);

        this.stretch = map(this.vel.mag(), 1, 40, 0, 8);
        this.rotation = this.vel.heading();
    }
    
    checkFloor() {
        if (this.pos.y > height - this.volume / 2) {
            this.pos.y = height - this.volume / 2;
            this.vel.y *= -0.8;
        }
        
        if (this.pos.y < this.volume / 2) {
            this.pos.y = this.volume / 2;
            this.vel.y *= -0.8;
        }
        
        if (this.pos.x > width - this.volume / 2) {
            this.pos.x = width - this.volume / 2;
            this.vel.x *= -0.8;
        }
        
        if (this.pos.x < this.volume / 2) {
            this.pos.x = this.volume / 2;
            this.vel.x *= -0.8;
        }
    }
    
    display() {
        fill(150, 100);
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        ellipse(0, 0, this.volume + this.stretch, this.volume);
        pop();
    }
    
    handleDrag(mx, my) {
        let distance = dist(mx, my, this.pos.x, this.pos.y);
        let force = createVector(mx - this.pos.x, my - this.pos.y);
        force.normalize();
        force.mult(0.01 * distance);
        this.applyForce(force);
    }
}
  
class Liquid {
    constructor(x, y, w, h, d, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.density = d;
    }

    display() {
        noStroke();
        fill(0, 20, 150);
        rect(this.x, this.y, this.w, this.h);
    }

    drag(obj) {
        // Magnitude
        let speed = obj.vel.magSq();
        let dragMag = this.c * speed;

        // Direction is inverse of velocity
        let dragForce = obj.vel.copy();
        dragForce.mult(-1);

        dragForce.normalize();
        dragForce.mult(dragMag);
        dragForce.mult(this.density)
        return dragForce;
    }

    contains(obj) {
        return obj.pos.x > this.x && obj.pos.x < this.x + this.w && obj.pos.y > this.y && obj.pos.y < this.y + this.h;
    }

}