var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('a');
var eyes = document.querySelectorAll('.eye');
var mouth = document.querySelector('.mouth');

document.addEventListener('mousemove', (e) => {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
  });
  document.addEventListener('mousedown', () => {
    cursor.classList.add('click-white');
    eyes.forEach(eye => {
      eye.classList.add('click-eye-white');
    });
    mouth.classList.add('click-mouth-white');
  });
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click-white');
    eyes.forEach(eye => {
      eye.classList.remove('click-eye-white');
    });
    mouth.classList.remove('click-mouth-white');
  });
  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
      eyes.forEach(eye => {
        eye.classList.add('hover-eye');
      });
      mouth.classList.add('hover-mouth');
    });
  
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      eyes.forEach(eye => {
        eye.classList.remove('hover-eye');
      });
      mouth.classList.remove('hover-mouth');
    });
  });
   