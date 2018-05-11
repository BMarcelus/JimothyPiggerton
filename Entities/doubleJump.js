class doubleJump extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.w = 40;
    this.h = 40;
    this.color="black";
    this.jumpPower = 0;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 2;
  }

}