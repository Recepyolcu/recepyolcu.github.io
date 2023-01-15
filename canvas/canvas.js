import noise3D from "./random.js";

export function printCanv (bgColor, canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

export class Canvas {
  constructor (canvasId, width, height) {
    this.canvas         = document.getElementById(canvasId);
    this.width          = width;
    this.height         = height;
    this.canvas.width   = this.width;
    this.canvas.height  = this.height;
  }

  getContext () {
    return this.canvas.getContext('2d');
  }
}

export class Random {
  constructor () {

  }

  range (min, max) {
    if (max === undefined) {
    max = min;
    min = 0;
    }
  
    if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
    }
  
    return (Math.random() * (max - min) + min);
  }

  rangeFloor (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
  
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }
  
    return Math.floor(this.range(min, max));
  }

  pick (array) {
    if (array.length === 0) return undefined;
    return array[this.rangeFloor(0, array.length)];
  }

  rgbColor (r, g, b) {
    return "rgb(" + this.range(0, r) + "," + this.range(0, g) + "," + this.range(0, b) + ")";
  }

}

export class CanvasUtil {
  constructor (){

  }

  degToRad (n) {
    return n * Math.PI / 180;
  }

  mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp) {

    if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
      return outputMin;
    } else {
      var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
      if (clamp) {
        if (outputMax < outputMin) {
          if (outVal < outputMax) outVal = outputMax;
          else if (outVal > outputMin) outVal = outputMin;
        } else {
          if (outVal > outputMax) outVal = outputMax;
          else if (outVal < outputMin) outVal = outputMin;
        }
      }
      return outVal;
    }
  }

  colorToString (color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }
  
}

export class Pattern {
  constructor (canvas, cols, rows, size) {
    this.width     = canvas.width;
    this.height    = canvas.height;
    this.cols      = cols;
    this.rows      = rows;
    this.numCells  = this.cols * this.rows;
    this.w         = this.width  * size;
    this.h         = this.height * size;
    this.cellw     = this.w  / this.cols;
    this.cellh     = this.h  / this.rows;
    this.margx     = (this.width  - this.w) * 0.5;
    this.margy     = (this.height - this.h) * 0.5;
  }

  rect (context, fillType, lineWidth, color, padding) {
    for (let i = 0; i < this.numCells; i++) {

      context.lineWidth   = lineWidth;
      context.strokeStyle = color;
      context.fillStyle   = color;

      const col     = i % this.cols;
      const row     = Math.floor(i / this.cols);
      this.x        = col * this.cellw;
      this.y        = row * this.cellh;

      context.save();
      context.translate(this.x, this.y);
      context.translate(this.margx, this.margy);
      context.translate(this.w * 0.5, this.h * 0.5);
      context.translate(padding * 0.5, padding * 0.5);
      context.beginPath();
      if (fillType == 'fill')   context.fillRect(0, 0, this.cellw - padding, this.cellh - padding);
      if (fillType == 'stroke') context.rect(0, 0, this.cellw - padding, this.cellh - padding); context.stroke();
      context.restore();

    }
  }

  randomRect (context, fillType, lineWidth, color, padding, frequency) {
    for (let i = 0; i < this.numCells; i++) {

      context.lineWidth   = lineWidth;
      context.strokeStyle = color;
      context.fillStyle   = color;

      const col     = i % this.cols;
      const row     = Math.floor(i / this.cols);
      this.x        = col * this.cellw;
      this.y        = row * this.cellh;

      context.save();
      context.translate(this.x, this.y);
      context.translate(this.margx, this.margy);
      context.translate(padding * 0.5, padding * 0.5);
      context.beginPath();

      if (Math.random() < frequency){
        context.rect(0, 0, this.cellw - padding, this.cellh - padding);
        if (fillType == 'fill')   context.fill();
        if (fillType == 'stroke')  context.stroke();
      }

      context.restore();

    }
  }

  arc (context, fillType, lineWidth, color, radius, startAngle, endAngle) {
    for (let i = 0; i < this.numCells; i++) {

      context.lineWidth   = lineWidth;
      context.strokeStyle = color;
      context.fillStyle   = color;

      const col     = i % this.cols;
      const row     = Math.floor(i / this.cols);
      this.x        = col * this.cellw;
      this.y        = row * this.cellh;

      context.save();
      context.translate(this.x, this.y);
      context.translate(this.margx, this.margy);
      context.translate(this.cellw * 0.5, this.cellh * 0.5);
      context.beginPath();
      if(fillType == 'fill')   context.arc(0, 0, radius, startAngle, endAngle); context.fill();
      if(fillType == 'stroke') context.arc(0, 0, radius, startAngle, endAngle); context.stroke();
      context.restore();

    }
  }

  randomArc (context, fillType, lineWidth, color, radius, startAngle, endAngle, frequency) {
    for (let i = 0; i < this.numCells; i++) {

      context.lineWidth   = lineWidth;
      context.strokeStyle = color;
      context.fillStyle   = color;

      const col     = i % this.cols;
      const row     = Math.floor(i / this.cols);
      this.x        = col * this.cellw;
      this.y        = row * this.cellh;

      context.save();
      context.translate(this.x, this.y);
      context.translate(this.margx, this.margy);
      context.translate(this.cellw * 0.5, this.cellh * 0.5);
      context.beginPath();

      if (Math.random() < frequency){
        if(fillType == 'fill')   context.arc(0, 0, radius, startAngle, endAngle); context.fill();
        if(fillType == 'stroke') context.arc(0, 0, radius, startAngle, endAngle); context.stroke();
      }

      context.restore();

    }

  }

}

const random = new Random();
const util = new CanvasUtil();


class Vector {
    constructor (x, y) {
      this.x = x;
      this.y = y;
    }
  
    getDistance(v) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
}

export class Agent {
    constructor (x, y) {
      this.pos    = new Vector(x, y);
      this.vel    = new Vector(random.range(-0.5, 0.6), random.range(-0.6, 0.6));
      this.radius = random.range(3, 6);
      this.agents = [];
    }

    createRandomPosAgents (numOfAgents, width, height) {
      for (let i = 0; i < numOfAgents; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        this.agents.push(new Agent(x, y));
      }
    }

    lineBetweenAgents (context) {
      for (let i = 0; i < this.agents.length; i++) {
        const agent = this.agents[i];
    
        for (let j = i + 1; j < this.agents.length; j++) {
            const other = this.agents[j];
    
            const dist = agent.pos.getDistance(other.pos);
    
            context.lineWidth = util.mapRange(dist, 0, 100, 5, 1);
    
            if (dist > 100) continue
    
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();
        }
      }
    }
  
    bounce () {
      if (this.pos.x <= 0 || this.pos.x >= canvas.width)  this.vel.x *= -1;
      if (this.pos.y <= 0 || this.pos.y >= canvas.height) this.vel.y *= -1;
    }
  
    wrap () {
      if (this.pos.x < 0) {
        this.pos.x = canvas.width;
      } 
  
      if(this.pos.x > canvas.width) {
        this.pos.x = 0;
      }
  
      if (this.pos.y < 0) {
        this.pos.y = canvas.height;
      }
  
      if (this.pos.y > canvas.height) {
        this.pos.y = 0;
      }
    }
  
    update () {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  
    draw (context) {
      context.save();
      context.translate(this.pos.x, this.pos.y);
      context.lineWidth = 4;
      context.fillStyle = 'white';
  
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI *2);
      context.fill();
      context.stroke();
  
      context.restore();
    }
}

export class Grid {
  constructor (canvas) {
    this.frame      = 0;
    this.cols       = 30;
    this.rows       = 30;
    this.numCells   = this.cols * this.rows;
    this.gridw      = canvas.width * 0.9;
    this.gridh      = canvas.height * 0.9;
    this.cellw      = this.gridw / this.cols; 
    this.cellh      = this.gridh / this.rows;
    this.margx      = (canvas.width - this.gridw) * 0.5;
    this.margy      = (canvas.height - this.gridh) * 0.5;
    this.scale;
    this.angle;
  }

  // AnimateGrid (context) {
  //   const animate = () => {
      
  //     this.createGrid(context);

  //     requestAnimationFrame(animate);
  //   }
  //   animate();
  // }

  createGrid (context) {

    for (let i = 0; i < this.numCells; i++) {

      this.frame += 0.0003;

      const col     = i % this.cols;
      const row     = Math.floor(i / this.cols);
      this.x        = col * this.cellw;
      this.y        = row * this.cellh;
      this.w        = this.cellw * 0.8;
      this.h        = this.cellh * 0.8;

      const freq     = 0.004;
      const amp      = 0.3;
      const scaleMin = 1;
      const scaleMax = 5;
  
      // const n = random.noise2D(x + frame * 10, y, params.freq);
      const n = noise3D(this.x, this.y, this.frame * 10, freq * 2);
      this.angle = n * Math.PI * amp;
      this.scale = mapRange(n, -1, 1, scaleMin, scaleMax);
      
      context.save();
      context.translate(this.x, this.y);
      context.translate(this.margx, this.margy);
      context.translate(this.cellw * 0.5, this.cellh * 0.5);
      context.rotate(this.angle);

      context.lineWidth = this.scale;
      context.strokeStyle = "rgb(255, 0, 150)";
      context.lineCap = "butt";

      context.beginPath();
      context.moveTo(this.w * -0.5, 0);
      context.lineTo(this.w *  0.5, 0);
      context.stroke();
      context.restore();
      
    }
  }

}

export class canvText {
  constructor (text, fontSize, fontFamily, color) {
    this.text       = text;
    this.fontSize   = fontSize;
    this.fontFamily = fontFamily;
    this.color      = color;
    this.pos        = [];
  }
  
  font (context) {
    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textBaseline = "top";
    context.fillStyle = this.color;
  }

  centerText (context) {

    const metrics = context.measureText(this.text);

    this.mx = metrics.actualBoundingBoxLeft   * -1;
    this.my = metrics.actualBoundingBoxAscent * -1;
    this.mw = this.mx * -1 + metrics.actualBoundingBoxRight;
    this.mh = this.my * -1 + metrics.actualBoundingBoxDescent;

    this.pos.push((canvas.width   - this.mw) * 0.5 - this.mx);
    this.pos.push((canvas.height  - this.mh) * 0.5 - this.my);

  }

  draw(context) {

    context.save();
    context.translate(this.pos[0], this.pos[1]);

    context.beginPath();
    context.rect(this.mx, this.my, this.mw, this.mh);
    context.stroke();
    
    context.fillText(this.text, 0, 0);
    
    context.restore();

  }
}

export class TypeCanvas {
    constructor (canvas, cell, fontFamily, text) {
        this.typeCanvas         = document.createElement('canvas');
        this.context            = this.typeCanvas.getContext('2d');
        this.cell               = cell;
        this.cols               = Math.floor(canvas.width  / this.cell);
        this.rows               = Math.floor(canvas.height / this.cell);
        this.numCells           = this.cols * this.rows;
        this.typeCanvas.width   = this.cols;
        this.typeCanvas.height  = this.rows;
        this.fontFamily         = fontFamily;
        this.pos                = [];
        this.text               = text;
    }

    font (context, fontSize) {
      this.fontSize = fontSize;
      context.font = `${this.fontSize}px ${this.fontFamily}`;
      context.textBaseline = "middle";
      context.textAlign = 'center';
    }
    
    centerText (context) {
      
      const metrics = context.measureText(this.text);
      
      this.mx = metrics.actualBoundingBoxLeft   * -1;
      this.my = metrics.actualBoundingBoxAscent * -1;
      this.mw = this.mx * -1 + metrics.actualBoundingBoxRight;
      this.mh = this.my * -1 + metrics.actualBoundingBoxDescent;
      
      this.pos.push((this.cols - this.mw) * 0.5 - this.mx);
      this.pos.push((this.rows - this.mh) * 0.5 - this.my);
      
    }

    draw(context) {

      context.fillStyle = 'black';
      context.fillRect(0, 0, this.typeCanvas.width, this.typeCanvas.height);
      
      context.fillStyle = 'white';
      
      context.save();
      context.translate(this.pos[0], this.pos[1]);
      context.fillText(this.text, 0, 0);
      context.restore();

    }

    bitmap (context, canvasContext, fillType, size) {

      this.draw(context);

      const typeData = context.getImageData(0, 0, this.cols, this.rows).data;

      canvasContext.fillStyle = 'black';
      canvasContext.fillRect(0, 0, this.typeCanvas.width, this.typeCanvas.height);


      const getGlyph = (v) => {
        if (v < 50) return '';
        if (v < 100) return 'x';
        if (v < 150) return '-';
        if (v < 200) return '*';

        const glyphs = '_= /'.split('');
        return random.pick(glyphs);
      }

      for (let i = 0; i < this.numCells; i++) {
        const col = i % this.cols;
        const row = Math.floor(i / this.cols);

        const x = col * this.cell;
        const y = row * this.cell;

        const r = typeData[i * 4 + 0];
        const g = typeData[i * 4 + 1];
        const b = typeData[i * 4 + 2];
        const a = typeData[i * 4 + 3];
        
        // fontSize parametresi ne kadar büyük olursa text pattern i o kadar büyük olur (iç içe geçebilir)
        canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
        
        canvasContext.save();
        canvasContext.translate(x, y);

        switch (fillType) {
          case 'rect':
            canvasContext.fillRect(0, 0, size, size);
            break;

          case 'arc':
            canvasContext.translate(this.cell * 0.5, this.cell * 0.5);
            canvasContext.beginPath();
            canvasContext.arc(0, 0, size * 0.5, 0, Math.PI * 2);
            canvasContext.fill();
            break;

          case 'text':
            this.font(canvasContext, size);
            canvasContext.translate(this.cell * 0.5, this.cell * 0.5);
            canvasContext.fillText(this.text, 0, 0);
            break;

          case 'glyph':
            this.font(canvasContext, this.cell * 3);
            if (Math.random() < 0.5) this.font(canvasContext, this.cell * 3);
            const glyph = getGlyph(r);
            canvasContext.fillText(glyph, 0, 0);
            break;
            
          default:
            canvasContext.fillRect(0, 0, this.cell, this.cell);
            break;
          }
            
          canvasContext.restore();
        }
    }
}

export class ImageDraw {
  constructor (path, cell) {
    this.imgCanvas = document.createElement('canvas');
    this.imgCanvas.width = canvas.width;
    this.imgCanvas.height = canvas.height;
    this.context   = this.imgCanvas.getContext('2d');
    this.path      = path;
    this.cell      = cell;
    this.cols      = Math.floor(canvas.width  / this.cell);
    this.rows      = Math.floor(canvas.height / this.cell);
    this.numCells  = this.cols * this.rows;
  }
  
  getImage () {
    return new Promise ((resolve, reject) => {
      this.img         = new Image();
      this.img.onload  = () => resolve(this.img);
      this.img.onerror = () => reject();
      this.img.src     = this.path;
    });
  }
  
  drawImg = async (context) => {
    const img = await this.getImage();
    context.drawImage(img, 0, 0 , img.width, img.width, 0, 0, canvas.width, canvas.height);
    this.typeData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  };
  
  bitmap (canvasContext, fillType) {
    
    this.drawImg(canvasContext);
    
    for (let i = 0; i < this.numCells; i++) {
      setTimeout(() => {
        
        const col = i % this.cols;
        const row = Math.floor(i / this.cols);
  
        const x = col * this.cell;
        const y = row * this.cell;

        const r = this.typeData[i * 4 + 0];
        const g = this.typeData[i * 4 + 1];
        const b = this.typeData[i * 4 + 2];
        const a = this.typeData[i * 4 + 3];
        
        canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;

        canvasContext.save();
        canvasContext.translate(x, y);

        switch (fillType) {
          case 'rect':
            
            canvasContext.fillRect(0, 0, this.cell, this.cell);
            break;

          case 'arc':
            canvasContext.translate(this.cell * 0.5, this.cell * 0.5);
            canvasContext.beginPath();
            canvasContext.arc(0, 0, this.cell * 0.5, 0, Math.PI * 2);
            canvasContext.fill();
            break;
            
          default:
            canvasContext.fillRect(0, 0, this.cell, this.cell);
            break;
        }

        canvasContext.restore();
      }, 200);
    }
  }
}