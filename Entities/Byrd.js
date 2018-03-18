class Byrd extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="black";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.startY= y;
    this.isByrd = true;
  }
  die() {

  }
  getHitByEntity(player) {
		player.BounceOffEntity(this);
		//this.h=this.h/2;
		// this.die();
	}
  update(dt, frameCount) {
    if(this.y>this.startY&&this.vy>=0) {
      this.jumpCount = 0;
      this.jump();
    }
    super.update(dt, frameCount);
  }
}