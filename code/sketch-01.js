import { CanvasUtil, Pattern, printCanv } from "./canvas.js";


const canvas = document.getElementById('banner');
const context = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
createPattern();

window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    createPattern();
});

function createPattern () {
    const pattern = new Pattern(canvas, 12, 1, 3, 0.999);
    pattern.rect(context, 'stroke', 'white', 0);
};