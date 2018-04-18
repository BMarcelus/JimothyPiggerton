class FadeToBlack extends Scene {
  constructor(prevScene, nextScene, duration, direction) {
    super();
    this.duration = duration;//This is affected by deltatime. 
                        //If deltatime is scaled, so is this.
                            //not accurate count of seconds
    this.nextScene = nextScene;   //scene to load.
                          
    this.prevScene = prevScene;   //scene being unloaded
    this.direction = direction;   //1 or -1.  1 is transitioning out of levels
                                  //1 is fading to black, -1 is fading from black
    this.timer = 0.0;
    if(this.direction == -1){
      this.timer = duration;
    }
    
  }
 
  draw(canvas) {
    this.prevScene.draw(canvas);
    canvas.fillStyle="rgba(0,0,0,"+ this.timer/this.duration + ")"  //select color
    canvas.fillRect(0,0,canvas.width,canvas.height);
   
  }
  update(dt) {
    super.update(dt);
    if(this.timer > this.duration || this.timer < 0){
      this.loadNextLevel();
    }
    this.timer += dt*this.direction;
  }
  loadNextLevel(){
    //if prevScene == nextScene, it will resume the previous scene 
    //without making a new scene
    if(this.prevScene == this.nextScene){
      this.driver.setScene(this.prevScene);
    }else{
      this.driver.setScene(new this.nextScene());
    }
  }
}