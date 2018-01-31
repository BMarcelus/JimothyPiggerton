class Background {
  constructor() {
    this.background1 = this.createBackground(60, "#888", true);
    this.background2 = this.createBackground(100, "#666", false);
    this.backgroundColor = "#4df";
  }
  draw(canvas, camera) {
    this.drawLayers(canvas, camera);
  }
  drawLayers(canvas,camera) {
    canvas.save();
    canvas.fillStyle=this.backgroundColor;
    canvas.fillRect(0,0,canvas.width,canvas.height);
    canvas.translate(-camera.x/8,-camera.y/8);
    canvas.drawImage(this.background1,-150,-200);   
    canvas.translate(-camera.x/4,-camera.y/4);
    canvas.drawImage(this.background2,-150,-100); 
    canvas.restore();
  }
  createBackground(w,c, e) {
    return createForrestBackground(w,c, e);
  }
}

class SunEffect {
  constructor() {
    this.srcImage = createSunEffect();
    this.image = document.createElement('canvas');
    this.image.width = this.srcImage.width;
    this.image.height = this.srcImage.height;
    this.canvas = this.image.getContext('2d');
    this.canvas.save();
  }
  reset() {
    var width = this.image.width;
    var height = this.image.height;
    var canvas = this.canvas;
    canvas.restore();
    canvas.save();
    canvas.globalCompositeOperation="source-over";
    canvas.clearRect(0,0,width,height);
    canvas.drawImage(this.srcImage,0,0);
    canvas.globalCompositeOperation="destination-out";
  }
  draw(canvas) {
    canvas.drawImage(this.image, canvas.width/2-this.image.width/2,canvas.height/2-this.image.height/2);        
  }
}

function createSunEffect() {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle="rgba(255,255,0,.5)";
  canvas.beginPath();
  canvas.arc(image.width/2,image.height/2,image.height/2,0,Math.PI*2);
  canvas.fill();
  return image;
}

function createForrestBackground(w,c,e) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle = c;
  var colors = ["#382", "#4a3"];
  var colorIndex = 0;
  var yy = 260+300;
  canvas.fillStyle="#050";
  canvas.fillRect(0,yy,image.width,yy);
  for(var i=0;i<image.width;i+=w) {
    if(Math.random()>.5)continue;
    var h = 300; 
    h -= Math.random()*100;
    var y = yy-h;  
    var ww = w/2+Math.random()*10;
    canvas.fillStyle="#643";
    canvas.fillRect(i+w/2-ww/2, y, ww, h);
    canvas.fillStyle="#532";
    canvas.fillRect(i+w/2-ww/2, y, ww/2, h);
    var hh = w/2;//+Math.random()*20-5;
    var h = hh;
    for(var j=230;j>0;j-=h) {
      // h=hh+Math.random()*10-5;
      canvas.beginPath();
      colorIndex = (colorIndex + 1) % (colors.length);
      canvas.fillStyle=colors[colorIndex];
      canvas.moveTo(i+w/2-ww, y+j);
      canvas.lineTo(i+w/2+ww, y+j);
      canvas.lineTo(i+w/2, y+j-h*2);
      canvas.fill();
    }
  }
  // canvas.globalCompositeOperation="source-atop";
  // canvas.fillStyle="rgba(255,255,255,.1)";
  // canvas.fillRect(0,0,image.width,image.height);
  if(e) {
    canvas.globalCompositeOperation="source-atop";
    canvas.fillStyle="rgba(1,1,1,.1)";
    canvas.fillRect(0,0,image.width,image.height);
  }
  return image;
}

function createSpikeBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  1000;
  canvas.fillStyle = c;
  var y = 500;
  for(var i=0;i<image.width;i+=w) {
    var ww = w/3;
    canvas.fillRect(i+w/2-ww/2, y, ww, 400);
    canvas.beginPath();
    canvas.moveTo(i+w/2-ww, y);
    canvas.lineTo(i+w/2+ww, y);
    canvas.lineTo(i+w/2, y- ww*2);
    canvas.fill();
  }
  return image;
}

function createCityRuinBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  1000;
  canvas.fillStyle = c;    
  for(var i=0;i<image.width;i+=w) {
    canvas.fillRect(i, Math.floor(Math.random()*40)*5+400, w, 400);
  }
  for(var i=0;i<350;i++) {
    canvas.clearRect(Math.random()*image.width, Math.random()*image.height, Math.random()*50, Math.random()*50);
  }
  return image;
}