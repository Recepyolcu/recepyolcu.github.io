const images = [];

function preload() {
    for (let i = 1; i < 4; i++) {
        images.push(loadImage(`./img/resim-${i}.jpg`));
    }
}

let imgIndex = 2;
let canvas;
let p;
function setup() {
    canvas = createCanvas(600, 600);
    p = createP('hello');
    background(0);
    noStroke();
}

function draw() {
    for (let i = 0; i < 20; i++) {
        let x = random(images[imgIndex].width);
        let y = random(images[imgIndex].height);
        let c = images[imgIndex].get(x, y);
        fill(c[0], c[1], c[2]);
        let bright = (c[0] + c[1] + c[2]) / 3;
        let sizeR = map(bright, 0, 255, 20, 0);
        square(x, y, sizeR);
    }
}



function windowResized() {
    resizeCanvas(windowWidth * 0.3, windowWidth * 0.3);
}

