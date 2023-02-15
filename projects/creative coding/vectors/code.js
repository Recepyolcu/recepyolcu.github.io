
var canvasV = function ( sketch ) {

    let magToText;
    let canvas;
    let heading;

    // add(), mult(), mag(), normalize()    

    sketch.setup = function() {
        canvas = sketch.createCanvas(500, 500);
        
        sketch.background(255);
        
        heading = sketch.createElement('h1', 'Vectors');
        magToText = sketch.createP('');
        heading.parent('#container');
        canvas.parent('#container');
        magToText.parent('#container');
    }

    sketch.draw = function() {
        sketch.background(255);
        sketch.noStroke();
        sketch.fill(0);
        
        sketch.translate(sketch.width * 0.5, sketch.height * 0.5);

        sketch.circle(0, 0, 5);
        
        let mouseV = sketch.createVector(sketch.mouseX, sketch.mouseY);
        let centerV = sketch.createVector(sketch.width / 2, sketch.height / 2);
        
        // let adding = centerV.add(mouseV);


        mouseV.sub(centerV);
        // mult()
        // mouseV.mult(2);
        
        // nomalize()
        // mouseV.normalize();
        // line ın uzunluğu hep 50 olacak
        // mouseV.mult(50);


        sketch.stroke(0);
        sketch.strokeWeight(2);
        sketch.line(0, 0, mouseV.x, mouseV.y);

        magToText.html(`the mag of vector is: ${mouseV.mag().toFixed(2)}`);
    }
};

var canvasA = function ( sketch ) {

    let canvas;
    let heading, p;
    let pCircle;
    
    sketch.setup = function() {
        canvas = sketch.createCanvas(500, 500);

        heading = sketch.createElement('h1', 'Acceleration');
        p = sketch.createP('');

        heading.parent('#container');
        canvas.parent('#container');
        p.parent('#container');
        pCircle = new Physics(
            sketch.createVector(sketch.width / 2, sketch.height / 2),
            sketch.createVector(0, 0),
            sketch.createVector(0, 0.1),
        );
        
    }

    sketch.draw = function() {
        sketch.background(255);
        pCircle.draw(sketch);
        pCircle.edges(sketch.width, sketch.height);
        pCircle.update();
        p.html(`velocity: ${Math.abs(pCircle.vel.y).toFixed(2)}`);
    }
};


class Physics {
    constructor (pos, vel, acc) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
    }

    edges(width, height) {
        if(this.pos.x > width || this.pos.x < 1) {
            this.vel.x *= -1;
        }
        if(this.pos.y > height || this.pos.y < 1) {
            this.vel.y *= -1;
        }
    }

    draw(sketch) {
        sketch.ellipseMode(sketch.CENTER);
        sketch.circle(this.pos.x, this.pos.y, 10);
    }
}

var vectors = new p5(canvasV, 'vectors');
var acceleration = new p5(canvasA, 'acceleration');