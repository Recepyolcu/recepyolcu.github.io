let canvas;
let cellSize = 20;

function setup() {
    canvas = createCanvas(800, 800);
    canvas.parent('#container');
    background(255);

    strokeCap("round");
    strokeWeight(1);

    for (var x = 0; x < width; x += cellSize) {
        for (var y = 0; y < height; y += cellSize) {
            tile(x, y, cellSize, cellSize);
        }
    }
}

function tile(x1, y1, x2, y2) {
    let leftToRight = random() >= 0.5;

    if (random() > 0.3) {
        if (leftToRight) line(x1, y1, x1 + x2, y1 + y2);
        else line(x1 + x2, y1, x1, y1 + y2);
    }
}