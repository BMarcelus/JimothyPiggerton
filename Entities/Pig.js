
class Pig extends Mover {
  constructor(x,y) {
    x+=70;
    super(x,y);
    this.color = "pink";
    this.w = 25;
    this.h = 20;
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
    if(this.x > this.tx+50) this.mx = -1;
    if(this.x < this.tx-50) this.mx = 1;
    if(this.turnCounter<=0||this.wallcolliding) {
      this.turnCounter = this.turnTime;
      this.mx = -this.mx;
    }
    this.width += Math.cos(this.x/this.speed/2)*5;
    this.height += Math.sin(this.x/this.speed/2)*5;
    super.update(dt, frameCount);
  }
  drawShape(canvas, w, h) {
    canvas.fillStyle = this.color;
    canvas.fillRect(-w/2, -h, w, h);
    // canvas.fillStyle = '#000';
    this.drawTail(canvas,-w/2,-h*3/4,3,15);
    this.drawSnout(canvas, w/2-h/4, -h*5/8, h/2, h/2);
    canvas.fillStyle='#111';
    this.drawEye(canvas, 0,-h+2,5,5,Math.PI/10);
    this.drawEye(canvas, w/2-3,-h+2,3,5, -Math.PI/10);
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
    canvas.rotate(-Math.abs(this.angle)-Math.PI/10);
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
    canvas.rotate(r);
    canvas.fillRect(-w/2,-h/2,w,h);
    canvas.restore();
  }
}
