import { Canvas, Grid, printCanv } from "./canvas.js";

let visualCan = new Canvas('visual-canvas', 500, 500);

function visual () {
  let grid = new Grid(visualCan, 25, 25);
  let visualContext = visualCan.getContext('2d'); 
  const animate = () => {
    requestAnimationFrame(animate);
    printCanv('rgb(15, 15, 15)', visualCan, visualContext);
    grid.createGrid(visualContext);
  }
  animate();
}
visual();

