var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var step = 100;
var size = 800;

canvas.width = size;
canvas.height = size;

context.lineCap = 'square';
context.lineWidth = 2;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

function draw(x, y, width, height) {
  var leftToRight = Math.random() >= 0.5;

  if(leftToRight) {
    context.moveTo(x, y);
    context.lineTo(x + width, y + height);    
  } else {
    context.moveTo(x + width, y);
    context.lineTo(x, y + height);
  }

  context.stroke();
}

for(var x = 0; x < size; x += step) {
  for(var y = 0; y < size; y+= step) {
    draw(x, y, step, step);    
  }
}
