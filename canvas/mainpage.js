import { Canvas, CanvasUtil, Pattern, TypeCanvas, printCanv } from './canvas.js';

const util = new CanvasUtil();

const sections  = document.querySelectorAll('section'); 

var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('a');

let canWidth = window.innerWidth;
let canHeight = window.innerHeight * 0.55;

// Canvases
let canvas = new Canvas('banner', canWidth, canHeight);
const context = canvas.getContext();

window.addEventListener('resize', () => {
    canWidth  = window.innerWidth;
    canHeight = window.innerHeight * 0.55; 

    clearTimeout(debounceResize);
    debounceResize = setTimeout(() => {
      totalPageHeight = document.body.scrollHeight - window.innerHeight;
    }, 250);

    canvas = new Canvas('banner', canWidth, canHeight);
    drawBanner();
});

document.addEventListener('mousemove', (e) => {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});
document.addEventListener('mousedown', () => {
  cursor.classList.add('click-white');
});
document.addEventListener('mouseup', () => {
  cursor.classList.remove('click-white');
});
a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

// Random Logo Pattern Generate
const logoCanvas = new Canvas('logo', 60, 60);
const logoContext = logoCanvas.getContext();

const cell = Math.floor(Math.random() * (10 - 3) + 3);

const pattern = new Pattern(logoCanvas, cell, cell, 0.80);
function randomPattern () {
    const rnd = Math.floor(Math.random() * (4 - 1) + 1);
    const freq = Math.random() * (1 - 0.3) + 0.3;
    let radius = 5;
    if (rnd == 1) pattern.randomRect(logoContext, 'stroke', 2, 'white', Math.random() * 5, freq);
    if (rnd == 2) pattern.randomRect(logoContext, 'fill', 2, 'white', Math.random() * 5, freq);
    if (rnd == 3) {
      if (cell > 5) radius = 3;
      pattern.randomArc(logoContext, 'stroke', 2, 'white', radius, 0, Math.PI * 2, freq);
    };
    if (rnd == 4) {
      if (cell > 5) radius = 3;
      pattern.randomArc(logoContext, 'fill', 2, 'white', radius, 0, Math.PI * 2, freq);
    }
}
randomPattern();

function drawBanner () {
  printCanv('transparent', canvas, context);
  const typeCanvas = new TypeCanvas(canvas, canWidth / 300, 'Recep Yolcu');

  typeCanvas.font(typeCanvas.context, 300, 49, 'poppins');
  typeCanvas.centerText();
  typeCanvas.bitmap(typeCanvas.context, context, 'glyph', 2);

  return context.getImageData(0, 0, canWidth, canHeight);
}

drawBanner();


// Custom Scroll
const pb = document.getElementById("progress-bar");
let debounceResize;

window.addEventListener("scroll", () => {
  let totalPageHeight = document.body.scrollHeight - window.innerHeight;
  let newpbHeight = window.pageYOffset / totalPageHeight;
  pb.style.height = `${util.mapRange(newpbHeight, 0, 1, 0, window.innerHeight - 24)}px`;
});
