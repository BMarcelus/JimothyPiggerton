class KnifeTurret {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.shootSpeed = 100;
    this.shootTimer = this.shootSpeed;
    this.projectileSpeed = 6;
    this.restrictDirection = true;
  }
  update(dt,frameCount) {
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    var r = Math.sqrt(dx*dx+dy*dy);
    if(this.restrictDirection) {
      if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
      this.angle = Math.atan2(dy,dx);
    }
    if(r>700) {
      this.shootTimer = this.shootSpeed;
      // this.shootTimer = 0;
      return;
    }
    this.shootTimer += 1;
    if(this.shootTimer>this.shootSpeed) {
      this.shootTimer=0;
      this.shoot();
    }
  }
  draw(canvas) {
    var t = this.shootTimer/this.shootSpeed;
    var s = 10+t*10;    
    canvas.fillStyle = 'rgba(255,0,0,'+t+')';
    canvas.fillRect(this.x-s,this.y-s,s*2,s*2);
    // canvas.save();
    // canvas.translate(this.x,this.y);
    // canvas.rotate(this.angle);
    // var h = s/2;
    // canvas.fillRect(-s/2,-h,s*2,h*2);
    // canvas.restore();
  }
  shoot() {
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    if(this.restrictDirection) {
      if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
      var r= Math.abs(dx+dy);
    } else {
      var r = Math.sqrt(dx*dx+dy*dy);
    }
    var speed = this.projectileSpeed
    var vx = dx/r*speed;
    var vy = dy/r*speed;
    var knife = new Knife(this.x,this.y, vx, vy);
    this.game.addEntity(knife);
  }
}