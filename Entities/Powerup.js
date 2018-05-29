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
    this.offset=0;
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
    if(this.on) {
      this.offset = Math.cos(frameCount*Math.PI/20)*2;
    } else {
      this.offset=0;
    }
  }
  draw(canvas) {
    canvas.save();
    if(!this.on)canvas.globalAlpha = 0.5;
    canvas.translate(this.x,this.y);
    // canvas.translate(-this.w/2,-this.h/2);
    canvas.translate(0,this.offset);
    this.drawShape(canvas,this.w,this.h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;
    canvas.fillRect(-w/2, -h, w, h);
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