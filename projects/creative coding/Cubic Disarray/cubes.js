let canvas; 
let cols, rows;
let cell;
let size;
let marg;

function setup() {
    canvas = createCanvas(700, 700);
    canvas.parent('#container');

    background(255);

    cols = 10;
    rows = 10;
    size = width * 0.9;
    cell = size / cols;
    marg = width - size;

    let randomDisplacement = 200;
    let rotateMultiplier = 200;
    let offset = 20;

    
    noFill();
    strokeWeight(4)
    
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {

            var plusOrMinus = random() > 0.5 ? -1 : 1;
            var rotateAmt = row / size * Math.PI / 180 * plusOrMinus * random() * rotateMultiplier;
            
            plusOrMinus = random() > 0.5 ? -1 : 1;
            var translateAmt = row / size * plusOrMinus * random() * randomDisplacement;
            
            push();
            translate(marg / 4, marg / 4);
            translate(row + translateAmt + offset, row + offset);
            rotate(rotateAmt);
            rect(col * cell, row * cell, cell, cell);
            pop();
        }
    }
}