import { Canvas, Pattern } from "./canvas.js";


const logoCanvas = new Canvas('logo', 60, 60);
const logoContext = logoCanvas.getContext();

const cell = Math.floor(Math.random() * (10 - 3) + 3);

const logoPattern = new Pattern(logoCanvas, cell, cell, 0.80);
function randomPattern () {
    const rnd = Math.floor(Math.random() * (4 - 1) + 1);
    const freq = Math.random() * (1 - 0.3) + 0.3;
    let radius = 5;
    if (rnd === 1) logoPattern.randomRect(logoContext, 'stroke', 2, 'white', Math.random() * 5, freq);
    if (rnd === 2) logoPattern.randomRect(logoContext, 'fill', 2, 'white', Math.random() * 5, freq);
    if (rnd === 3) {
      if (cell > 5) radius = 3;
      logoPattern.randomArc(logoContext, 'stroke', 2, 'white', radius, 0, Math.PI * 2, freq);
    };
    if (rnd === 4) {
      if (cell > 5) radius = 3;
      logoPattern.randomArc(logoContext, 'fill', 2, 'white', radius, 0, Math.PI * 2, freq);
    }
}
randomPattern();