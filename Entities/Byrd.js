class Byrd extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 60;
    this.h = 50;
    this.color="black";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.startY= y;
    this.isByrd = true;
    this.color1 = "#555";
    this.color2 = "#333";
  }
  die() {

  }
  getHitByEntity(player) {
    player.bounceOffEntity(this);
    this.height/=4;
    this.width*=.8;
		// this.h=this.h/2;
		// this.die();
	}
  update(dt, frameCount) {
    if(this.y>this.startY&&this.vy>=0) {
      this.jumpCount = 0;
      this.jump();
    }
    super.update(dt, frameCount);
    this._angle = -this.angle;
  }
  drawShape(canvas, w,h) {
    canvas.strokeStyle="#000";
    canvas.lineWidth = 5;
    canvas.strokeRect(-w/2,-h,w,h);    
    this.drawWings(canvas,w,h,1);        
    canvas.fillStyle=this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    canvas.fillStyle=this.color2;    
    canvas.fillRect(-w/2,-h,w/4,h);
    this.drawWings(canvas,w,h);    
    this.drawFace(canvas,w,h);
  }
  drawFace(canvas,w,h) {
    canvas.fillStyle = "#000";
    // canvas.fillRect(12,-h*.7,30,15);
    canvas.beginPath();
    canvas.moveTo(22,-h*.9);
    canvas.lineTo(22+30,-h*.9+15/2);
    canvas.lineTo(22,-h*.9+15);
    canvas.fill();
    canvas.fillStyle = "#000";
    canvas.fillRect(10,-h*.95,7,5);
    canvas.fillRect(25,-h*.95,7,5);
    // canvas.lineWidth=4;
    // canvas.lineCap = 'round';
    // canvas.moveTo(3,-h*.8);
    // canvas.lineTo(3+2,-h*.8+2);
    // canvas.moveTo(20,-h*.8);
    // canvas.lineTo(20-2,-h*.8+2);
    // canvas.stroke();
  }
  drawWings(canvas, w,h,s) {
    var ww = w*.6;
    var hh = h/4;
    canvas.fillStyle = this.color1;
    canvas.beginPath();
    // canvas.rect(-w/2-ww/2,-h/2, ww,hh);
    // canvas.rect(w/2,-h/2, ww,hh);
    var angle = this.vy/15;
    var y = -h*.8-angle*10;
    this.pathWingAtAngle(canvas, -w/2-ww/2,y, ww,hh, ww*.8, hh/2, angle);
    this.pathWingAtAngle(canvas,w*.4,y, ww,hh, ww*.2, hh/2, -angle);
    if(s)canvas.stroke();
    else canvas.fill();
  }
  pathWingAtAngle(canvas, x,y,w,h, px,py, angle) {
    canvas.save();
    canvas.translate(x+px, y+py);
    canvas.rotate(angle);
    canvas.rect(-px,-py-10,w,h);
    canvas.rect(-px*.8,-py,w*.8,h);
    canvas.rect(-px*.5,-py+5,w*.5,h);
    canvas.restore();
  }
}