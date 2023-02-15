let canvas;
let t = 0;
let freq = 0.1;
let amp = 380;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('#container');
    background(0);

}

let x = (t) => {
    return cos(t * freq) * amp;
}

let y = (t) => {
    return sin(t * freq) * amp;
}


function draw() {

    background(0);


    translate(width * 0.5, height * 0.5);

    // sunflower(20);

    for (let i = 0; i < 400; i++) {
        layerFrequncies(5);
        if (amp > 2000) noLoop();
    }


    // animatedLines(2, 4, 4, 10);

}

function sunflower(r) {
    push();
    noStroke();
    fill(200, 200, 10);
    circle(x(t), y(t), r);
    amp += 1;
    t += 2;
    pop();
}

function layerFrequncies(r) {
    // Experiment the sin with PI and some numbers and the amplitude can change
    let y2 = sin(t * freq * 11) * 100; // 11) * 100
    let x2 = cos(t * freq * 3) * 500; // 3) * 500
    push();
    noStroke();
    circle(x(t) + x2, y(t) + y2, r);
    pop();
    // Speed of animation and different variations if background in loop set it to 40
    t += 40;
}

function hollowLines(x1f, y1f, x2f, y2f) {
    let x1 = (t) => {
        return cos(t * freq * x1f) * amp;
    }
    
    let y1 = (t) => {
        return sin(t * freq * y1f) * amp;
    }
    let x2 = (t) => {
        return cos(t * freq * x2f) * amp;
    }
    
    let y2 = (t) => {
        return sin(t * freq * y2f) * amp;
    }
    stroke(255, 30);
    strokeWeight(2);
    line(x1(t), y1(t), x2(t), y2(t));
    t += 0.01;
}

function animatedLines() {

    let lx = (t) => {
        return sin(t * freq * 10) * amp + cos(t * freq * 5) * 100;
    }
    
    let ly = (t) => {
        return sin(t * freq * 3) * amp;
    }
    let nx = (t) => {
        return sin(t * freq * 10) * amp;
    }
    
    let ny = (t) => {
        return sin(t * freq * 2) * amp + cos(t * freq * 0.3) * 40;
    }

    stroke(255);
    strokeWeight(2)
    for (let i = 1; i <= 100; i++) {
        line(lx(t + i), ly(t + i), nx(t + i), ny(t + i));
    }
    t += 0.01;
}