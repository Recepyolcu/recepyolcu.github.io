const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 30,
  rows: 30,
  scaleMin: 1, 
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0, 
  animate: true,
  lineCap: 'butt',
  bgColor: {r: 0, g: 0, b: 0},
  gridColor: {r: 255, g:0, b: 150}
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "rgb(" + String(params.bgColor.r) + "," + String(params.bgColor.g) + "," + String(params.bgColor.b) + ")";
    context.fillRect(0, 0, width, height);
    
    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows; 
    
    const gridw = width  * 0.8;
    const gridh = height * 0.8;
    
    const cellw = gridw   / cols;
    const cellh = gridh   / rows;
    const margx = (width  - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;
    
    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const x = col   * cellw;
      const y = row   * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;
      
      const f = params.animate ? frame : params.frame;

      // const n = random.noise2D(x + frame * 10, y, params.freq);
      const n = random.noise3D(x, y, f * 10, params.freq);
      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);


      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.strokeStyle = "rgb(" + String(params.gridColor.r) + "," + String(params.gridColor.g) + "," + String(params.gridColor.b) + ")";
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w *  0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  
  const tab = pane.addTab({
    pages: [
      {title: 'Grid Properties'},
      {title: 'Advanced Properties'},
    ],
  });

  tab.pages[0].addInput(params, 'lineCap', {options: {butt: 'butt', round: 'round', square: 'square'}})
  tab.pages[0].addInput(params, 'cols', {min: 2, max: 50, step: 1});
  tab.pages[0].addInput(params, 'rows', {min: 2, max: 50, step: 1});
  tab.pages[0].addInput(params, 'scaleMin', {min: 1, max: 100});
  tab.pages[0].addInput(params, 'scaleMax', {min: 1, max: 100});

  tab.pages[0].addFolder({title: 'Noise'});
  tab.pages[0].addInput(params, 'freq', {min:-0.01, max: 0.01});
  tab.pages[0].addInput(params, 'amp', {min:0, max: 1});
  tab.pages[0].addInput(params, 'animate');
  tab.pages[0].addInput(params, 'frame', {min: 0, max:999});
  tab.pages[0].addSeparator();
  const btn = tab.pages[0].addButton({title: 'Reset'});

  btn.on('click', () => {
    params.cols = 30;
    params.rows = 30;
    params.scaleMin = 1;
    params.scaleMax = 30;
    params.freq = 0.001;
    params.amp = 0.2;
    params.frame = 0; 
    params.animate = true;
    params.lineCap = 'butt';
  });

  tab.pages[1].addInput(params, 'bgColor');
  tab.pages[1].addInput(params, 'gridColor');
};

createPane();

canvasSketch(sketch, settings);
