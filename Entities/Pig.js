
class Pig extends Mover {
  constructor(x,y) {
    x+=70;
    super(x,y);
    this.color = "pink";
    this.w = 27;
    this.h = 23;
    this.width = this.w;
    this.height = this.h;
    this.speed = 3;
    this.cloudParticlesOn=false;
    this.mx = 1;
    this.groundAccel=1;
    this.tx = x;
    this.ty = y;
    this.turnTime = 50;
    this.turnCounter = this.turnTime;
  }
  update(dt, frameCount) {
    // if(this.x > this.tx+50) this.mx = -1;
    // if(this.x < this.tx-50) this.mx = 1;
    // if(this.turnCounter<=0||this.wallcolliding) {
      // this.turnCounter = this.turnTime;
      // this.mx = -this.mx;
    // }
    // if(Math.random()>.95) this.speed=0;
    // if(Math.random()>.95) this.speed = 3;
    if(this.wallcolliding)this.mx = -this.mx;
    this.width += Math.sin(frameCount*Math.PI/5)*2;
    this.height -= Math.sin(frameCount*Math.PI/5)*2;
    super.update(dt, frameCount);
  }
  drawShape(canvas, w, h) {
    canvas.strokeStyle="#fff";
    canvas.fillStyle="#fff";    
    canvas.lineWidth = 5;
    // var feetSize = w/5;
    canvas.strokeRect(-w/2-1, -h-1, w+2, h+2); 
    this.drawTail(canvas,-w/2,-h*.9,7,20); 
    canvas.strokeRect(w/2-h/4, -h*11/16, h/2, h/2);    
    canvas.fillStyle = this.color;          
    canvas.fillRect(-w/2, -h, w, h);
    // canvas.fillRect(w/2-feetSize, 0, feetSize, feetSize/2);
    // canvas.fillRect(w/2-feetSize*2.2, 0, feetSize, feetSize/2);
    canvas.fillStyle = "#e8a";
    // canvas.fillRect(-w/2, 0, feetSize, feetSize/2);
    // canvas.fillRect(-w/2+feetSize*1.2, 0, feetSize, feetSize/2);
    canvas.fillRect(-w/2, -h, w/3, h);    
    // canvas.fillStyle = '#000';
    this.drawTail(canvas,-w/2,-h*.9,3,20);
    this.drawSnout(canvas, w/2-h/4, -h*11/16, h/2, h/2);
    canvas.fillStyle='#000';
    this.drawEye(canvas, 0,-h+2,5,4, -Math.PI/5);
    this.drawEye(canvas, w/2-3,-h+2,5,4, Math.PI/5);
  }
  drawSnout(canvas,x,y,w,h) {
    canvas.fillStyle = "#faa";
    canvas.fillRect(x,y,w,h);
    canvas.fillStyle = '#966';
    var ns = w/3;
    canvas.fillRect(x,y+h/2-ns,ns,ns);
    canvas.fillRect(x+w-ns,y+h/2-ns,ns,ns);    
  }
  drawTail(canvas,x,y,w,h) {
    canvas.save()
    canvas.strokeStyle = canvas.fillStyle;
    canvas.lineWidth = w;
    canvas.translate(x,y);
    canvas.rotate(Math.cos(this.x/this.speed/2));
    // canvas.fillRect(-w,-h,w,h);
    canvas.beginPath();
    canvas.arc(-w/2,-h/4,h/4,Math.PI/2,Math.PI*3/2);
    canvas.arc(-w/2,-h/2+h/8,h/8,Math.PI/2,-Math.PI/2, true);
    canvas.stroke();
    canvas.restore();
  }
  drawEye(canvas, x,y,w,h,r) {
    
    canvas.save();
    canvas.translate(x+w/2,y+h/2);
    canvas.fillRect(-w/2,-h/2,w,h);
    // canvas.fillStyle = "#fff";
    // canvas.fillRect(-w*.5,-h*.5, w*.5,h*.5);
    canvas.rotate(r);
    canvas.fillStyle="pink";
    canvas.fillRect(-w,-h/2-h/2,w*2,h/2);
    canvas.restore();
  }
}
