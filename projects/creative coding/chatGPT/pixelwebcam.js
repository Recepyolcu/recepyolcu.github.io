var video;
var vScale = 16;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(51);

  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      fill(r, g, b);
      rect((video.width - x - 1) * vScale, y * vScale, vScale, vScale);
    }
  }
}