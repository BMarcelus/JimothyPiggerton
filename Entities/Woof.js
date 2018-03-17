class Woof extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="gray";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.startY= y;
  }
  die() {

  }
  getHitByEntity(player) {
		player.BounceOffEntity(this);
		//this.h=this.h/2;
		//this.die();
	}
  update(dt, frameCount) {
    var dist = this.game.player.x-this.x;
    var close = false;
    var superclose = false;
    if ((dist > -300 && dist < 300)) {
      close = true;
      if ((dist > -75 && dist < 75)) {
        superclose = true;
      }
    }
    
    super.update(dt, frameCount);

    var ydist = this.game.player.y-this.y;
    if (close && ydist < 200 && ydist > -100)
    {
      var left = dist < 0;
      var moveleft = this.mx < 0;
      if (left != moveleft)
        this.mx *= -1;
      if (superclose)
      {
        this.jump();
      }
    }
  }
}