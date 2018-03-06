class Byrd extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="black";
    this.jumpPower = 10;
  }
  die() {

  }
  update(dt, frameCount) {
    if(this.y>800&&this.vy>=0) {
      this.jumpCount = 0;
      this.jump();
    }
    super.update(dt, frameCount);
  }
}