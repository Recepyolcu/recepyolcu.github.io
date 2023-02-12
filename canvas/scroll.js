import { Canvas, printCanv, CanvasUtil } from './canvas.js';

const util = new CanvasUtil();

var scrollToTop = document.getElementById('scroll-top');
scrollToTop.style.transition = '0.5s ease-out';


const pgCanvas = new Canvas('progress', 300, 300);
const pgContext = pgCanvas.getContext();

function customScroll () {
    pgContext.strokeStyle = 'white';
    pgContext.lineWidth = 20;
    pgContext.lineCap = 'round';
  
    printCanv('transparent', pgCanvas, pgContext);
  
    pgContext.save();
    
    pgContext.translate(pgCanvas.width * 0.5, pgCanvas.height * 0.5);
    pgContext.rotate(util.degToRad(270));
    pgContext.beginPath();
    pgContext.arc(0, 0, 140, 0, util.mapRange(valOfScrollPos, 0, 1, 0, Math.PI * 2));
    if (valOfScrollPos > 0.99) pgContext.strokeStyle = 'rgb(89, 255, 0)';
    pgContext.stroke();
  
    pgContext.restore();
}

let totalPageHeight = document.body.scrollHeight - window.innerHeight;
let valOfScrollPos = window.pageYOffset / totalPageHeight;

window.addEventListener("scroll", () => {
    totalPageHeight = document.body.scrollHeight - window.innerHeight;
    valOfScrollPos = window.pageYOffset / totalPageHeight;
    customScroll();
    if(valOfScrollPos < 0.5) {
      scrollToTop.style.opacity = '0'; 
    } else {
      scrollToTop.style.opacity = '1'; 
    }
  });