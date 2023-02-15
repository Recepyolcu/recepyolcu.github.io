var noiseScale = 0.02;

function setup() {
  createCanvas(900, 900);
}

function draw() {
    background(255);
    for (var i = 0; i < 100; i++) {
        var x = map(noise(i * noiseScale, frameCount * noiseScale), 0, 1, 0, width);
        var y = map(noise(i * noiseScale + 100, frameCount * noiseScale + 100), 0, 1, 0, height);
        var size = random(10, 50);
        fill(200, 100);
        ellipse(x, y, size, size);
    }
}