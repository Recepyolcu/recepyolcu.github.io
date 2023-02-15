import { Canvas, CanvasUtil, Pattern } from '../canvas/canvas.js';

const util = new CanvasUtil();
let canWidth = window.innerWidth * 0.8;


let profile;
function profileText () {
    profile = new Canvas('profile-canvas', canWidth, canWidth / 10);
    let profileContext = profile.getContext(); 
    let profilePattern = new Pattern(profile.canvas, 10, 1, 1);
    profilePattern.rect(profileContext, 'stroke', util.mapRange(window.innerWidth, 300, 1440, 0.3, 3), 'rgb(140, 255, 0)', 20);
    profilePattern.text(profileContext, 'recepyolcu', 300, util.mapRange(window.innerWidth, 300, 1440, 4, 40), 'poppins');
}
profileText();

addEventListener("scroll", () => {
    let totalPageHeight = document.body.scrollHeight - window.innerHeight;
    let valOfScrollPos = window.pageYOffset / totalPageHeight;
    profile.canvas.style.opacity = util.mapRange(valOfScrollPos, 0.3, 0.55, 1, 0); 
});

addEventListener('resize', () => {
    canWidth  = window.innerWidth * 0.8;
    menu.style.width = window.innerWidth + 'px';
    profileText();
});

let skillBoxs = document.querySelectorAll('.skills > *');
let expText = [];
skillBoxs.forEach(box => {
    expText.push(box.lastElementChild.outerText);
    box.addEventListener('mouseover', () => {
        let expP = box.lastElementChild;
        expP.style.opacity = '1';
    });
    box.addEventListener('mouseleave', () => {
      let expP = box.lastElementChild;
      expP.style.opacity = '0';
  });
});