class Powerup {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.color="black";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 0;
    this.startY = this.y;
    this.reset = this.reset.bind(this);
    this.on = true;
  }
  update(dt, frameCount) {
    if(!this.on)return;
    var myBox = this.getHitBox();	// Perforamnce effeciency issue
    var player = this.game.player;
		var playerBox = player.getHitBox();
		if(rectangleCollision(myBox, playerBox) == true) {
      this.die();
      this.onHitPlayer(player);
		}
  }
  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x-this.w/2, this.y-this.h, this.w, this.h);
  }

  onHitPlayer(player) {
    PLAYER_ABILITIES[this.power](player);
  }

  getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-this.h, w:this.w, h:this.h};
  }

  reset() {
    this.on = true;
    this.color = 'black';
  }

  die() {
    this.on = false;
    this.color = 'rgba(150,150,150,.5)';
    this.game.driver.setTimeout(this.reset, 60);
  }
}