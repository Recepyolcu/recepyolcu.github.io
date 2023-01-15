var canvas;
var canvasSize = 600;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(canvasSize, canvasSize);
  centerCanvas();
  background(255, 255, 255);
  canvas.style('border', '2px solid black');
  canvas.style('box-shadow', '0px 3px 15px rgba(50, 50, 50, 0.5)');
  canvas.style('box-shadow', '0px 8px 35px rgba(50, 50, 50, 0.4)');
  for (let y = 0; y < canvasSize; y+=10) {
    for(let x = 0; x < canvasSize; x+=10) {
      let r = random(0, 255);
      let g = random(0, 255);
      let b = random(0, 255);
      noStroke();
      fill(r, g, b);
      square(x, y, 10);
    }
  }
}

function windowResized() {
  centerCanvas();
}

function draw() {

}

