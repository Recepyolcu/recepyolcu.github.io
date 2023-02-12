
var menu = document.querySelector('menu');
menu.style.height = window.innerHeight - 81 + 'px';
menu.style.width = window.innerWidth + 'px';


let canvas;
let t = 0;
let freq = 0.1;
let amp = 380;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight * 0.9);
    canvas.parent('#main-canvas');
    fill(140, 255, 0);

}

let x = (t) => {
    return cos(t * freq) * amp;
}

let y = (t) => {
    return sin(t * freq) * amp;
}

function draw() {

    background(15, 15, 15);
    translate(width * 0.5, height * 0.5);

    if(frameCount % 120 == 0){
        fill(140, 255, 0);
    }
    if(frameCount % 240 == 0){
        fill(255, 0 ,191)
    }
    
    for (let i = 0; i < 900; i++) {
        layerFrequncies(5);
    }
}
function layerFrequncies(r) {
    // Experiment the sin with PI and some numbers and the amplitude can change
    let y2 = sin(t * freq * 10 + mouseY * 0.005) * 450; // 11) * 100
    let x2 = cos(t * freq * 10 + mouseX * 0.005) * 450; // 3) * 500
    push();
    noStroke();
    circle(x(t) + x2, y(t) + y2, r);
    pop();
    // Speed of animation and different variations if background in loop set it to 40
    t += 40;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.9);
  }