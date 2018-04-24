class Collectable {
  constructor(x,y) {
    this.w=30;
    this.h=30;
    this.x=x-this.w/2;
    this.y=y-this.h/2;
    this.color = 'gainsboro';
  }
  getHitBox() {
    return this;
  }
  update(dt, frameCount) {
    if(this.game.collidesWithPlayer(this)) {
      this.shouldDelete=true;
      SOUNDMAP.pickup.play(this.game.player);
    }
  }
  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x,this.y,this.w,this.h);
  }
}