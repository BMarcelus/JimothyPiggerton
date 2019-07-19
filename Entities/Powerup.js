class Powerup {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 70;
    this.h = 70;
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
		if(rectangleCollision(myBox, playerBox) && this.canBeCollected()) {
      this.die();
      this.onHitPlayer(player);
    }
    if(this.on) {
      this.offset = Math.cos(frameCount*Math.PI/20)*2;
    } else {
      this.offset=0;
    }
  }
  canBeCollected() {
    return true;
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
    SOUNDMAP.powerup.play();
    player.game.screenShakeLevel = 0.4;
    player.game.frameStop = 2;
    if(particles.powerup.enabled)
    for(var i=0;i<10;i++) {
      var x = this.x;// + (Math.random()*this.w-this.w/2)/2;
      var y = this.y;// - (Math.random()*this.h)/4;
      var w = 10;
      var h = 10;
      var vx = Math.random()*5-2;
      var vy = Math.random()*5-2-10;
      var color = this.color1;
      // if(i>=num-8) color = "#222";
      // if(i>=num-4) color = "#33d"
      // if(i>=num-2) color = "#fff"; 
      this.game.addEntity(new FallingParticle(x,y,w,h,vx,vy,30,color));
    }
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