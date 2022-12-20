const btn = document.querySelectorAll("a.display");
const frame = document.querySelectorAll("div.frame");
const closeBtn = document.querySelectorAll("a.close-btn");
const projectBox = document.querySelectorAll("div.main-project-box");

for (let index = 0; index < btn.length; index++) {
    closeBtn[index].addEventListener("click", function() {
        frame[index].style.display = "none";
        projectBox[index].style.display = "flex";
    });
}

for (let index = 0; index < btn.length; index++) {
    btn[index].addEventListener("click", function() {
        frame[index].style.display = "flex";
        projectBox[index].style.display = "none";
    });
}
