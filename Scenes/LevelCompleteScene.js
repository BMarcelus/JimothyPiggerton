class LevelCompleteScene extends Scene{
  constructor(prevScene, callback){
    super(false);
    this.prevScene = prevScene;
    this.callback = callback;
    this.player = prevScene.player;
    this.pig = prevScene.pig;
    this.prevLevelAlpha = 1;
    this.camera = this.prevScene.camera;
    this.entities = [this.player, this.pig];
    this.time = 0;
    this.maxTime = 100;
    this.midPoint = {
      x: (this.player.x+this.pig.x)/2,
      y: (this.player.y+this.pig.y)/2
    };
    this.pig.animationState = 2;
    var player = this.player;
    player.angle = 0;
    player.uncrouch();
    this.r = 20;
    this.update = this.update0;
    prevScene.screenShakeLevel = 0;
    this.keyMap = {
      27: {down: this.loadNextScene.bind(this) },
    };
    this.butcher = new Butcher(0,0);
    this.butcher.ghostOn = true;
    this.butcher.state = -1;
  }
  update0(dt,frameCount) {
    super.update(dt,frameCount);
    if(this.player.grounded||true) {
      this.update = this.update1;
      this.player.ghostOn = true;
      this.pig.ghostOn = true;
      this.time = 0;
      return;
    }
    this.entities.forEach(e => {
      e.update(dt,frameCount)
    });
  }
  update1(dt, frameCount){
    super.update(dt,frameCount);
    var t = this.time/this.maxTime;
    this.prevLevelAlpha = 1 - t;
    if(this.time>=this.maxTime) {
      this.prevLevelAlpha = 0;
      // this.loadNextScene();
      this.time = 0;
      this.update = this.update2;
      return;
    }
    this.entities.forEach(e => {
      e.vy = 0;
      e.update(dt,frameCount)
    });
    this.time += 1;
    this.midPoint.x += (this.camera.x - this.midPoint.x)*t*t;
    this.midPoint.y += (this.camera.y - this.midPoint.y)*t*t;
    // this.midPoint.x += ;
    var angle = t*t * Math.PI*4 + Math.PI;
    // var rw = 20+t*100 - (2-t*t)*100;
    if(t<.75) this.r += (100-this.r)/10;
    else if(t<.9) this.r += (10-this.r)/10;
    else this.r += (10-this.r)/10;
    var rw = this.r;
    var rh = rw/2;
    this.player.angle = Math.cos(angle)*Math.PI/20;
    this.player.x = this.midPoint.x + Math.cos(angle)*rw;
    this.player.y = this.midPoint.y + Math.sin(angle)*rh;
    angle += Math.PI;
    this.pig.x = this.midPoint.x + Math.cos(angle)*rw;
    this.pig.y = this.midPoint.y + Math.sin(angle)*rh;
    this.player.flipped = this.player.x > this.pig.x;
    this.pig.flipped = !this.player.flipped;
    if(t>.75) {
      this.player.eyeMovement.blink = 7*t*t;          
    }
  }
  update2(dt,frameCount) {
    super.update(dt,frameCount);
    this.time += 1;
    this.maxTime = 40;
    var t = this.time/this.maxTime;
    this.player.y += Math.sin(t*t*Math.PI*2) *1;
    this.pig.y += Math.sin(t*t*Math.PI*2) *1;
    if(this.time>this.maxTime) {
      this.prevScene.screenShakeLevel = 1; 
      this.time = 0;
      this.maxTime = 100;     
      this.update = this.update3;
      this.entities.splice(1,0,this.butcher);
      return;
    }
    this.player.eyeMovement.blink = 7;    
  }
  update3(dt,frameCount) {
    super.update(dt,frameCount);
    this.time += 1;    
    var t = this.time/this.maxTime;
    var player = this.player;
    var pig = this.pig;
    pig.animationState = 0;
    this.prevScene.updateScreenShakeLevel();
    pig.x += (t*t)*20;
    if(this.time >= this.maxTime) {
      this.loadNextScene();
    }
    player.eyeMovement.blink = -2 + 2*t;
    player.angle = t*Math.PI/5-Math.PI/5;
    player.eyeMovement.x = 5*t;
    player.eyeMovement.y = -3;
    // player.updateEye(dt,frameCount);
    pig.angle = t*t*Math.PI*2;
    this.butcher.x = pig.x+40;
    this.butcher.y = pig.y - 20;
    this.butcher.flipped = true;
    this.butcher.mx = -1;
    this.butcher.update(dt,frameCount);
  }
  draw(canvas){
    canvas.save();
    canvas.globalAlpha = this.prevLevelAlpha;
    this.prevScene.draw(canvas);
    canvas.restore();
    this.drawWithCamera(canvas);
  }
  drawWithCamera(canvas) {
    var camera = this.prevScene.camera;
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);  
    canvas.rotate(camera.r);
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));    
    for(var i=0;i<this.entities.length;i+=1) {
      var entity = this.entities[i];
      entity.draw(canvas);
    }
    canvas.restore();
  }
  loadNextScene(){
    this.update = super.update;    
    this.startTransition(25, 1, function() {     
      this.player.ghostOn = false;
      this.pig.ghostOn = false;
      this.driver.setScene(this.prevScene);
      this.callback();
    });
  }
}