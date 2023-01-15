import { Canvas, TypeCanvas, printCanv } from './canvas.js';

const bgColor = 'rgb(10, 10, 10)';
const body = document.body;
const menu = document.getElementsByTagName('menu')[0];
body.style.background = bgColor;

let canWidth = window.innerWidth;
let canHeight = window.innerHeight;

let canvas = new Canvas('banner', canWidth, canHeight);
const context = canvas.getContext();

canvas.canvas.style.position = 'absolute';
canvas.canvas.style.top = '0px';

let mouseCanv = document.createElement('canvas');
const mouseContext = mouseCanv.getContext('2d');

console.log(window.innerHeight);

mouseCanv.style.position = 'absolute';
mouseCanv.style.top = '0px';

mouseCanv.width = canWidth;
mouseCanv.height = canHeight; 
menu.append(mouseCanv);

window.addEventListener('resize', () => {
    canWidth  = window.innerWidth;
    canHeight = window.innerHeight;

    mouseCanv.width = canWidth;
    mouseCanv.height = canHeight;   

    canvas    = new Canvas('banner', canWidth, canHeight);
    drawBanner();
});


let press = false;
window.addEventListener('mousedown', (e) => {
    mouse(e, 'fill');
    press = true;
});
window.addEventListener('mouseup', (e) => {
    mouse(e, 'stroke');
    press = false;
});
window.addEventListener('mousemove', (e) => {
    mouse(e, 'stroke');
    if(press) mouse(e, 'fill');
    else mouse(e, 'stroke');
});


function mouse (e, style) {
    printCanv('transparent', mouseCanv, mouseContext);

    mouseContext.strokeStyle = 'white';
    mouseContext.fillStyle = 'white';

    mouseContext.save();
    mouseContext.translate(e.clientX, e.clientY);

    mouseContext.beginPath();
    mouseContext.arc(0, 0, 10, 0, Math.PI * 2);
    if (style == 'stroke') mouseContext.stroke();
    if (style == 'fill') mouseContext.fill();

    mouseContext.restore();
}

function drawBanner () {
    printCanv(bgColor, canvas, context);
    const typeCanvas = new TypeCanvas(canvas, canWidth * 0.003, 'poppins', 'Recep Yolcu');
    typeCanvas.font(typeCanvas.context, typeCanvas.cols * 0.13);
    typeCanvas.centerText(typeCanvas.context);
    typeCanvas.bitmap(typeCanvas.context, context, 'glyph', 20);
}

drawBanner();


