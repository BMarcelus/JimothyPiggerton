
class Player extends Mover{
  constructor() {
    super();
    this.x = 100;
    this.y = 100;
    this.speed = 10;
    this.mx = 0;
  }
  die() {
    this.animation = new Animation(20, function(dt, frameCount) {
    }.bind(this), function() {
      this.vy=-20;      
      this.animation = new Animation(60, function(dt, frameCount) {
        this.y+=this.vy;
        this.vy++;
      }.bind(this), function() {
        this.game.respawn();
      }.bind(this))
    }.bind(this))
    // this.game.respawn();
  }
  resetControls() {
    this.mx = 0;
  }
  update(dt, frameCount){
    if(this.animation) {
      this.animation.update(dt, frameCount);
      return;
    }
    super.update(dt, frameCount);
  }
  draw(canvas){
    super.draw(canvas);
  }
  reset() {
    this.x=60;
    this.y=100;
    this.vx=0;
    this.vy=0;
    this.maxJumps=1;
    this.wallJumps=false;
    this.animation=null;
  }
}
Player.controls = {
  right: {held: function() { this.mx += 1; }},
  left: {held: function() { this.mx -= 1; }},
  up: {down: function() { this.jump(); }, up: function() { this.shortJump(); }},
  down: {down: function() { this.crouch(); }, up: function() { this.uncrouch(); }},
}