import { Canvas, CanvasUtil, Pattern, TypeCanvas, printCanv } from './canvas.js';

const bgColor = 'rgb(10, 10, 10)';
const body = document.body;
body.style.background = bgColor;

let canWidth = window.innerWidth;
let canHeight = window.innerHeight;

let canvas = new Canvas('banner', canWidth, canHeight);
const context = canvas.getContext();

const logoCanvas = new Canvas('logo', 60, 60);
const logoContext = logoCanvas.getContext();

logoCanvas.canvas.style.position = 'absolute';
logoCanvas.canvas.style.top = '0px';
logoCanvas.canvas.style.left = '0px';
logoCanvas.canvas.style.border = '2px solid white';

const pattern = new Pattern(logoCanvas, 5, 5, 0.80);
function randomPattern () {
    const rnd = Math.floor(Math.random() * (4 - 1) + 1);
    const freq = Math.random() * (1 - 0.3) + 0.3;
    if (rnd == 1) pattern.randomRect(logoContext, 'stroke', 2, 'white', Math.random() * 5, freq);
    if (rnd == 2) pattern.randomRect(logoContext, 'fill', 2, 'white', Math.random() * 5, freq);
    if (rnd == 3) pattern.randomArc(logoContext, 'stroke', 2, 'white', 5, 0, Math.PI * 2, freq);
    if (rnd == 4) pattern.randomArc(logoContext, 'fill', 2, 'white', 5, 0, Math.PI * 2, freq);
}
randomPattern();



window.addEventListener('resize', () => {
    canWidth  = window.innerWidth;
    canHeight = window.innerHeight; 
    canvas    = new Canvas('banner', canWidth, canHeight);
    drawBanner();
});


var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('.nav-a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})

function drawBanner () {
    printCanv('transparent', canvas, context);
    const typeCanvas = new TypeCanvas(canvas, canWidth * 0.003, 'poppins', 'Recep Yolcu');
    typeCanvas.font(typeCanvas.context, typeCanvas.cols * 0.13);
    typeCanvas.centerText(typeCanvas.context);
    typeCanvas.bitmap(typeCanvas.context, context, 'glyph', 20);
    return context.getImageData(0, 0, canWidth, canHeight);
}

drawBanner();


