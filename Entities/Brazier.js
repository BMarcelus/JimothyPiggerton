class Brazier {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.w = 40;
    this.h = 20;
    this.flameSpeed = 20;
    this.secondFlameSpeed = 15;
    this.flameTimer = this.flameSpeed;
    this.secondFlameTimer = this.secondFlameSpeed;
  }
  update(dt,frameCount) {
    this.flameTimer += 1;
    if(this.flameTimer>this.flameSpeed) {
      this.flameTimer=Math.floor(5 * Math.random());
      this.makeFlame();
    }
    this.secondFlameTimer += 1;
    if(this.secondFlameTimer>this.secondFlameSpeed) {
      this.secondFlameTimer=Math.floor(5 * Math.random());
      this.makeFlame();
    }
  }
  draw(canvas) {
    var color = "#E1C16E"

    canvas.fillStyle= color;
    canvas.fillRect(this.x - this.w /2,this.y - this.h, this.w, this.h);
  }
  makeFlame() {
    var spawnX = (this.x - this.w /2) + Math.random() * this.w;
    var flame = new Flame(spawnX, this.y - this.h, 30, 30, 0, -1, 75);
    this.game.addEntity(flame);
  }
}