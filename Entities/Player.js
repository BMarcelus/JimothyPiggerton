
class Player extends Mover{
  constructor() {
    super();
    this.x = 100;
    this.y = 100;
    this.speed = 10;
    this.mx = 0;
  }
  die() {
    this.game.respawn();
  }
  resetControls() {
    this.mx = 0;
  }
  update(dt, frameCount){
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
  }
}
Player.controls = {
  right: {held: function() { this.mx += 1; }},
  left: {held: function() { this.mx -= 1; }},
  up: {down: function() { this.jump(); }, up: function() { this.shortJump(); }},
  down: {down: function() { this.crouch(); }, up: function() { this.uncrouch(); }},
}