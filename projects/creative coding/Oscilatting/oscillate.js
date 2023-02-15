let canvas;
let angleVel = 0.23;
let amp = 1;
function setup(){
    canvas = createCanvas(900, 900);
    canvas.parent('#container');
}

function draw() {
    
    background(0, 40);
    angleVel += 0.015;
    let angle = angleVel;
    
    for (let x = 0; x <= width; x += 20) {
        let y = amp * map(sin(angle), -1, 1, 0, height);
        stroke(255);
        strokeWeight(3)
        fill(0);
        circle(x, y, 30);
        angle += 0.1;
    }
}