import { Canvas, Pattern } from "./canvas.js";

const sections = document.querySelectorAll('section'); 

var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('.nav-a');

const logoCanvas = new Canvas('logo', 60, 60);
const logoContext = logoCanvas.getContext();

logoCanvas.canvas.style.position = 'absolute';
logoCanvas.canvas.style.top = '0px';
logoCanvas.canvas.style.left = '0px';
logoCanvas.canvas.style.border = '2px solid white';

const cell = Math.floor(Math.random() * (10 - 3) + 3);

const pattern = new Pattern(logoCanvas, cell, cell, 0.80);
function randomPattern () {
    const rnd = Math.floor(Math.random() * (4 - 1) + 1);
    const freq = Math.random() * (1 - 0.3) + 0.3;
    if (rnd == 1) pattern.randomRect(logoContext, 'stroke', 2, 'white', Math.random() * 5, freq);
    if (rnd == 2) pattern.randomRect(logoContext, 'fill', 2, 'white', Math.random() * 5, freq);
    if (rnd == 3) pattern.randomArc(logoContext, 'stroke', 2, 'white', 5, 0, Math.PI * 2, freq);
    if (rnd == 4) pattern.randomArc(logoContext, 'fill', 2, 'white', 5, 0, Math.PI * 2, freq);
}
randomPattern();

document.addEventListener('mousemove', (e) => {
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

sections.forEach(section => {
    section.addEventListener('mouseenter', () =>{
        cursor.style.border = '3px solid black';
    });
    section.addEventListener('mouseleave', () =>{
        cursor.style.border = '3px solid white';
    });
    section.addEventListener('mousedown', () => {
        cursor.classList.add('click-black');
    });
    section.addEventListener('mouseup', () => {
        cursor.classList.remove('click-black');
    });
});