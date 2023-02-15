let canvas;
let angle  = 0.0;
let angVel = 0.1;
let angAcc = 0.0;
let r = 10;

function setup() {
    canvas = createCanvas(900, 900);
    canvas.parent('#container');
    
}

function draw() {
    
    background(0);
    harmonicMotion();

}

function rotation() {
    angle  = 0.0;

    rectMode(CENTER);

    angVel = map(mouseX, 0, width, 0, 0.1);

    angle  += angVel;
    angVel += angAcc;

    translate(width * 0.5, height * 0.5);
    rotate(angle);

    noStroke();
    fill(140, 20, 170);
    square(0, 0, 100);
}



function trigonometry() {
    
    r = random(width / 2, width / 4);
    
    translate(width * 0.5, height * 0.5);
    let x = cos(angle) * r;
    let y = sin(angle) * r;

    angle  += angVel;
    angVel += angAcc;

    // strokeWeight(1);
    // stroke(map(r, 50, width / 4, 70, 255));
    // line(0, 0, x, y);
    
    fill(map(r, width / 2, width / 4, 255, 0));
    circle(x, y, 10);
}

let tm = 0;
function harmonicMotion() {

    let amp = width/2;
    let period = 120;
    if(frameCount % 120 == 0) {
        tm += 2;
        console.log(tm.toString() + ' :second');
    }

    translate(width / 2, height / 2);

    let x = amp * sin((frameCount / period) * TWO_PI);
    
    push();
    stroke(255);
    line(0, 0, x, 0);
    pop();
    
    ellipseMode(CENTER);
    fill(255);
    circle(x, 0, 40);
}