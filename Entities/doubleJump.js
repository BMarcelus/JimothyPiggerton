class doubleJump extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="black";
    this.jumpPower = 0;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 2;
  }

}