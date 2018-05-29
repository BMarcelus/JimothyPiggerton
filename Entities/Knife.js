class Knife {
  constructor(x,y,vx,vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = 30;
    this.h = 30;
    this.angle = 0;
  }
  update(dt,frameCount) {
    this.x += this.vx;
    this.y += this.vy;
    this.angle -= Math.PI/20;
  }
  draw(canvas) {
    canvas.save();
    canvas.translate(this.x,this.y);
    // canvas.fillStyle = 'red';
    // canvas.fillRect(-this.w/2,-this.h/2,this.w,this.h);
    canvas.rotate(this.angle);
    this.drawKnife(canvas, this.w,this.h);
    canvas.restore();
  }
  drawKnife(canvas,w,h) {
    var bladew = 18;
    var bladeh = 23;
    var handlew = 5;
    var handleh = 10;
    var holer = 3;
    canvas.save();
    canvas.translate(w/8,h/8);
    // canvas.scale(-1,1);
    // canvas.rotate(-Math.PI/5);
    canvas.lineWidth = 3;    
    canvas.beginPath();
    canvas.fillStyle = "#a33";
    canvas.rect(-handlew, 0, handlew, handleh);
    canvas.stroke();
    canvas.fill();
    canvas.fillStyle = "#822";
    canvas.fillRect(-handlew, 0, handlew/2, handleh);    
    canvas.fillStyle = "#eee";
    canvas.beginPath();
    canvas.rect(-bladew,-bladeh,bladew,bladeh);
    canvas.stroke();    
    canvas.fill();
    canvas.fillStyle="#fff";
    canvas.fillRect(-bladew,-bladeh,bladew/4,bladeh);
    canvas.beginPath();
    canvas.fillStyle="#000";
    canvas.arc(-holer*1.5, -bladeh+holer*1.5, holer, 0, Math.PI*2);
    canvas.fill();
    canvas.restore();
  }
}