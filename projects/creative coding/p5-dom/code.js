var canvas;
var sliders = [];
var num;
var p0, p1;

function setup() {
    canvas = createCanvas(750, 750);
    canvas.parent('canvas');
    canvas.drop(gotFile); 

    sliders.push(createSlider(0, 1000, 0.01));
    sliders.push(createSlider(0, 1000, 0.01));

    p0 = createP(sliders[0].value());
    p1 = createP(sliders[1].value());

    sliders.forEach(elm => {
        elm.parent('canvas');
    });
    p0.parent('canvas');
    p1.parent('canvas');
}

function gotFile(file) {
    if (file.type === 'image') {
        const img = createImg(file.data, 'creative coding');
        let size;
        let ratio = img.width / img.height;
        if (img.width > img.height){
            size = img.height / height;
            image(img, 0, 0, img.width / size , img.height / size, (img.height * ratio) / size, 0);
        } 
        else {
            size = img.width / width;
            image(img, 0, 0, img.width / size, img.height / size, 0, (img.width * ratio) / size);
        }
        
        img.hide();
    } else {
        console.log('not a image');
    }
}

var angle = 0;
var x;

function draw() {

    background(255);
    noStroke();
    var offset = 0;

    rectMode(CENTER);

    num = 400;
    let rx = (width + 50) / num;

    for (let i = 0; i < num; i++) {
        x = map(sin(angle + offset), -1, 1, 0, height * 2);
        offset += (sliders[0].value() / 200);

        fill(map(x, 0, height * 2, 10, 255), 0, 200);
        
        rect(rx * i - 20, height, 30, -x);
    }

    angle += (sliders[1].value() / 1000);
    p0.html(`variation: ${sliders[0].value()}`);
    p1.html(`speed: ${sliders[1].value()}`);

}

