class Cloud {
  constructor(x,y,w,h,vx,vy,life) {
    this.x=x;this.y=y;this.w=w;this.h=h;this.vx=vx;this.vy=vy;
    this.life = life||10;
    this.maxlife = this.life;
  }
  update() {
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
      return;
    }
    this.x+=this.vx;
    this.y+=this.vy;
  }
  draw(canvas) {
    canvas.save();
    canvas.fillStyle = "rgba(200,200,200,.4)";
    canvas.globalAlpha = this.life/this.maxlife;
    var w = this.w + (this.maxlife-this.life);
    var h = w;
    canvas.translate(this.x,this.y);
    canvas.fillRect(-w/2,-h,w,h);
    canvas.restore();
  }
}