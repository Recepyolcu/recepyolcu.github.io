let canvas;
let gap;
let ln, lines = [];
let size, cell, num;
let odd = false;

function setup() {
    canvas = createCanvas(700, 700);
    canvas.parent('#container');

    background(255);
    strokeWeight(3);
    strokeJoin("bevel");
    
    num = 10;
    size = width * 0.85;
    cell = size / num;
    gap = width - size;
    let rnd = 40;

    translate(gap / 2, gap / 2);
    translate(cell / 2, cell / 2);
    for(let col = 0; col < num; col++) {
        ln = [];
        odd = !odd;
        for (row = 0; row < num; row++) {
            if(odd) ln.push({x: (row * cell + cell / 4) + random(-rnd, rnd), y: (col * cell) + random(-rnd, rnd)});
            else ln.push({x: (row * cell + cell / 4) + random(-rnd, rnd), y: (col * cell) + random(-rnd, rnd)});
            point(ln[row].x, ln[row].y);
        }
        lines.push(ln);
    }

    
    for (let i = 0; i < lines.length - 1; i++) {
        let p1 = {x: i + 0, y: 0}; 
        let p2 = {x: i + 1, y: 0};  
        let p3 = {x: i + 1, y: 1};
        for (let j = 0; j < lines.length - 1; j++) {
            drawTriangle(lines[p1.x][p1.y], lines[p2.x][p2.y], lines[p3.x][p3.y]);

            p2 = p1; 
            p1 = p3; 
            p3 = {x: i + 0, y: j + 1}
            
            drawTriangle(lines[p1.x][p1.y], lines[p2.x][p2.y], lines[p3.x][p3.y]);
    
            p2 = p1; 
            p1 = p3; 
            p3 = {x: i + 1, y: j + 2}
    
            if (p3.y > lines.length-1) p3.y = lines.length - 1;
            

            drawTriangle(lines[p1.x][p1.y], lines[p2.x][p2.y], lines[p3.x][p3.y]);
        }
    }
}

function drawTriangle(a, b, c) {
    let gray = random(255);
    fill(gray)
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
}

function draw() {

}