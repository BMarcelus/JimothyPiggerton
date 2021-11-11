class Flame extends Mover {
  constructor(x,y,w,h,vx,vy,life) {
    super(x,y);
    this.x=x;this.y=y;this.w=w;this.h=h;this.vx=vx;this.vy=vy;
    this.startingW = w;
    this.life = life||50;
    this.maxlife = this.life;
    this.startingGreen = 180 + (75 * Math.random());
    this.color = "rgba(255,"+ this.startingGreen +",0,1)";
    this.killPlayer = true;
  }
  update() {
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
      return;
    }
    this.x+=this.vx;
    this.y+=this.vy;
    var val = Math.floor(this.startingGreen * this.life/this.maxlife);
    // var val = *this.life/this.maxlife;
    this.color = "rgb(255,"+val+",0)";
  }
  draw(canvas) {
    canvas.save();
    canvas.fillStyle = this.color;
    this.w = Math.floor(this.startingW * this.life/this.maxlife);
    this.h = this.w;
    canvas.translate(this.x,this.y);
    canvas.fillRect(-this.w/2, -this.h/2, this.w, this.h)
    
    canvas.restore();

    // copied from big saw:
    var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
      this.game.player.getHitByEntity(this);
    }
  }

  getHitBox() {
    var w = this.w;
    var h = this.h;
    return {x:this.x-.5*w, y:this.y-h, w:w, h:h};
  }
}