let canvas;
let lineNum = 50;
let breakpoints = 10;
let margin = 50;
let lines = [];
let ln = [];

function setup() {
    canvas = createCanvas(800, 800);
    canvas.parent('#container');

    let size = width - margin * 2; // 700
    let cell = size / lineNum; // 70

    background(255);
    strokeWeight(2);

    let lineX, lineY;
    let w, h;
    
    translate(margin / 2, margin / 2);
    translate(cell / 2, cell / 2);
    // line
    for (let x = 1; x <= lineNum; x++) {
        // line's breakpoints
        lineY = cell * x; 
        
        for (let y = 1; y <= lineNum; y++) {
            
            lineX = cell * y;
            w = lineX + cell;
            h = lineY + random(lineY * -7, lineY * 7 + cell) / cell / 20 ;
            
            
            line(lineX, lineY , w, h);
            
            lineY = h;
            
        }


    }
}