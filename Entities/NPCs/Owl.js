class Owl extends Byrd {
  constructor(x,y) {
    super(x,y);
    this.moveTimer=0;
    this.moveTime = 20;
    this.speed = 10;
    this.mx=0;
    this.d = 1;

    this.color1 = "#743";
    this.color2 = "#000";
    this.color3 = '#ca87fd';
    this.eyeColor = "#fff";
    this.beakColor = "#f7ff8c";
    
    this.w = 40;
    this.h = 30;
    this.width = this.w;
    this.height = this.h;
    this.grav = .4;
    this.jumpPower = 4;
    this.turnsAroundAtWall = false;
  }
  getHitByEntity(player) {
    player.bounceOffEntity(this);
    this.height/=4;
    this.width*=.8;
    // if(this.wallcolliding == true && this.moveTimer<=0) {
		// 	this.d = this.d*-1;
		// }
    this.moveTimer=this.moveTime;
    
	}
  update(dt, frameCount) {
    var dx = this.game.player.x-this.x;
    var dy = this.game.player.y-this.y;
    if(dx>0) this.d = 1;
    if(dx<0)this.d=-1;
    if(this.y>this.startY&&this.vy>=0) {
      this.jumpCount = 0;
      this.jump();
    }
    
    this._angle = -this.angle;
    if(this.grounded) this.wingAngle += (-Math.PI/2-this.wingAngle)/2;
    // this.wingAngle = Math.sin(frameCount*Math.PI/20)*Math.PI/2;
  }
  drawFace(canvas,w,h) {
    canvas.fillStyle = this.eyeColor;
    canvas.fillRect(0,-h*.95,7,7);
    // canvas.fillText('^', 25,-h*.95+h*.4);

    canvas.fillStyle = this.beakColor;
    // canvas.fillRect(12,-h*.7,30,15);
    var beakw = 10;
    var beakh = 10;
    var beakx = 5;
    var beaky = -h*.7;
    canvas.beginPath();
    canvas.moveTo(beakx,beaky);
    canvas.lineTo(beakx+beakw/2,beaky+beakh);
    canvas.lineTo(beakx+beakw,beaky);
    canvas.fill();
    canvas.fillStyle = this.eyeColor;
    // canvas.fillText('^', 10,-h*.95+h*.4);
    canvas.fillRect(12,-h*.95,7,7);
    // canvas.lineWidth=4;
    // canvas.lineCap = 'round';
    // canvas.moveTo(3,-h*.8);
    // canvas.lineTo(3+2,-h*.8+2);
    // canvas.moveTo(20,-h*.8);
    // canvas.lineTo(20-2,-h*.8+2);
    // canvas.stroke();
  }
}