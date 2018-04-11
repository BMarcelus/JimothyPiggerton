class Background {
  constructor(type) {
    this.type = type;    
    this.background1 = this.createBackground(60, "#888", true);
    this.background2 = this.createBackground(100, "#666", false);
    this.backgroundColor = "#87ceeb";
  }
  draw(canvas, camera, world) {
    this.drawLayers(canvas, camera, world);
  }
  drawLayers(canvas,camera, world) {
    canvas.save();
    if(this.backgroundColor) {
      canvas.fillStyle=this.backgroundColor;
      canvas.fillRect(0,0,canvas.width,canvas.height);
    }
    canvas.translate(0,world.h*world.s-canvas.height/2);
    canvas.translate(-camera.x/8,-camera.y);
    canvas.drawImage(this.background1,-150,-200);   
    canvas.translate(-camera.x/4,0);
    canvas.drawImage(this.background2,-150,-100); 
    canvas.restore();
  }
  createBackground(w,c, e) {
    switch(this.type) {
      case 0:
        return createHillBackground(w,c,e);
        break;
      case 1:
        return createForrestBackground(w,c,e);
        break;
      default:
        return createHillBackground(w,c,e);
        break;
    }
  }
}

class InfiniteBackground extends Background {
  drawLayers(canvas, camera) {
    var w = 3000;
    var w2 = 6000;
    var x1 = Math.floor(camera.x/w/2-.5)+1;
    var x2 = Math.floor(camera.x/w/2);
    var x11 = Math.floor(camera.x/w2/2-.5)+1;
    var x12 = Math.floor(camera.x/w2/2);
    canvas.save();
    if(this.backgroundColor) {
      canvas.fillStyle=this.backgroundColor;
      canvas.fillRect(0,0,canvas.width,canvas.height);
    }
    canvas.translate(-camera.x/2,-camera.y);
    canvas.drawImage(this.background1,0+w*2*x11,-200);
    canvas.drawImage(this.background1,w+x12*w*2,-200);
    canvas.translate(-camera.x/2,0);
    canvas.drawImage(this.background2,0+w*2*x1,-100);
    canvas.drawImage(this.background2,w+x2*w*2,-100);

    // canvas.drawImage(this.background2,-150+x1*w*2,-100);     
    // canvas.drawImage(this.background2,-150+w+x2*w*2,-100);     
    canvas.restore();
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

function createHillBackground(w,c,e){
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle = c;
  var colors = ["#382", "#4a3"];
  var colorIndex = 0;
  var yy = 260+300;
  canvas.fillStyle="#0b6623";
  // canvas.fillRect(0,yy,image.width,yy);
  var r = Math.random()*200+100;
  for(var i=0;i<image.width;i+=r) {
    var x = i;
    var y = yy+r;
    canvas.beginPath();
    canvas.arc(x,y,r,0,Math.PI*2);
    canvas.fill();
    r = Math.random()*200+100;    
  }
  for(var i=0;i<20;i++) {
    var r = Math.random()*200+100;
    var x = Math.random()*image.width;
    var y = yy+r/2;
    canvas.beginPath();
    canvas.arc(x,y,r,0,Math.PI*2);
    canvas.fill();
  }
  if(e) {
    canvas.globalCompositeOperation="source-atop";
    canvas.fillStyle="rgba(1,1,1,.1)";
    canvas.fillRect(0,0,image.width,image.height);
  }
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
    y+=Math.random()*10-Math.random()*10;
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