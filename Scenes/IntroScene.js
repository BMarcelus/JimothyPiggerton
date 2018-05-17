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
    this.gamePadOn = false;
    // this.player.x = 500;
    this.player.flipped = true;
    this.pig = new Pig(this.player.x+30, this.player.y);
    this.pig.speed=0;
    this.butcher = new Butcher(this.player.x+600, this.player.y);
    this.addEntity(this.butcher);
    this.butcher.speed=0;    
    this.addEntity(this.pig);
    this.player.updateEye = function() {};
    this.pig.mx = 0;
    this.pig.bounceFrq = Math.PI/30;
    this.totalTime = 400;
    this.time = this.totalTime+1000;
    this.player.resetControls = function() {};
    this.player.speed = 4;
    this.player._angle = Math.PI/10;
    this.player.eyeMovement.blink = 1;
    this.pig.animationState = 1;
    this.startTransition(100, -1, function() {
      this.time=this.totalTime;
      this.butcher.speed = 3.9;
    });
    this.makeLetterBox();
    this.gen = this.test();
    this.timeToWait=0;
  }
  *test() {
    yield 0;
    return 0;
  }
  makeLetterBox(){
    var upperBoxHeight = 0.2;
    var lowerBoxHeight = 0.2;

    this.upperLetterBox = new ColoredBox(0,0,1,upperBoxHeight,0,'black','transparent',1);
    this.lowerLetterBox = new ColoredBox(0,1-lowerBoxHeight,1,lowerBoxHeight,0,'black','transparent',1);
    this.gui.push(this.upperLetterBox);
    this.gui.push(this.lowerLetterBox);
  }
  moveCamera(){
    var camera = this.camera;
    var player = this.player;
    var canvas = this.canvas;
    // if(player.mx) {
      var cdx = (player.x-camera.x+camera.dx)/10;
      if(Math.abs(cdx)>3)camera.x += cdx;
      // camera.x += (player.x-camera.x+camera.dx)/10;
    // }
    // camera.x = linearMove(camera.x, (player.x + camera.dx), 5);    

    // var cdy = (player.y-camera.x+camera.dy-30)/10;
    // if(Math.abs(cdy)>3)camera.y += cdy;
    camera.y += (player.y-camera.y-30)/30;
    if(player.grounded) camera.y += (player.y-camera.y-30)/20;
    var d = 0;
    if(player.vy>0 && camera.y < player.y - 30) camera.y += (player.y-camera.y-30)/10;
    if(player.crouching&&player.grounded) camera.dy += 1; else camera.dy=0;
    if(camera.dy>60)camera.dy=60;
    if(camera.dy>10) camera.y+=(camera.dy-10)/3;
    //make the camera point more towards the direction
    //that the player is moving in so they can see ahead
    if(player.mx!=0) {
      // camera.dx = linearMove(camera.dx, (player.mx * 100), 5);
    }
    if(!canvas)return;
    var world1 = this.world;
    if(camera.x<canvas.width/2)camera.x = canvas.width/2;
    if(camera.x>world1.w*world1.s-canvas.width/2) camera.x = world1.w*world1.s-canvas.width/2;
    if(camera.y>world1.h*world1.s-canvas.height/2+canvas.height*this.lowerLetterBox.h)camera.y = world1.h*world1.s-canvas.height/2+canvas.height*this.lowerLetterBox.h;
    if(camera.y<canvas.height/2-canvas.height*this.upperLetterBox.h)camera.y = canvas.height/2-canvas.height*this.upperLetterBox.h;  
  }
  update(dt, frameCount) {
    super.update(dt,frameCount);
    if(this.timeToWait<=0) {
      this.timeToWait = this.gen.next().value;
    }
    this.timeToWait--;
    this.time--;
    if(this.time<=0) {
      this.driver.setScene(new LevelIntroScene(new GameScene(),true));
    }
    if(this.time == this.totalTime - 200) {
      this.player.flipped = false;
      this.player.jump(7);
      this.player._angle = 0;      
      this.player.eyeMovement.blink = 0;      
    }
    if(this.time < this.totalTime - 230) {
      this.player.mx = 1;
      this.moveCamera = function() {};
    }
    
  }
  draw(canvas){
    super.draw(canvas);
    this.drawAllGUI(canvas);
  }
}