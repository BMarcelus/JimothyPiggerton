class IntroScene extends GameScene{
  constructor() {
    var w = 18;
    var l = 19;
    super({
      grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,0,19,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,18,19,19,18,19,18,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [4,0,0,0,0,0,0,0,19,0,19,18,18,19,18,18,18,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,19,18,18,18,18,19,19,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,19,0,18,18,18,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,0,0,0,0,4,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
    },true);
    this.gui = [];
    this.keyMap = {
      '27': {down: sceneTransition(this, GameScene)},
    }
    // this.player.x = 500;
    this.player.flipped = true;
    this.pig = new Pig(this.player.x+30, this.player.y);
    this.pig.speed=0;
    this.butcher = new Butcher(this.player.x+300, this.player.y);
    this.addEntity(this.butcher);
    this.addEntity(this.pig);
    this.player.updateEye = function() {};
    this.pig.mx = 0;
    this.pig.bounceFrq = Math.PI/30;
    this.totalTime = 300;
    this.time = this.totalTime;
    this.player.resetControls = function() {};
    this.player.speed = 4;
    this.player._angle = Math.PI/10;
    this.player.eyeMovement.blink = 1;
    this.pig.animationState = 1;
  }
  update(dt, frameCount) {
    super.update(dt,frameCount);
    this.time--;
    if(this.time<=0) {
      this.driver.setScene(new GameScene());      
    }
    if(this.time == this.totalTime - 100) {
      this.player.flipped = false;
      this.player.jump(7);
      this.player._angle = 0;      
      this.player.eyeMovement.blink = 0;      
    }
    if(this.time < this.totalTime - 130) {
      this.player.mx = 1;
      this.moveCamera = function() {};
    }
    
  }
}