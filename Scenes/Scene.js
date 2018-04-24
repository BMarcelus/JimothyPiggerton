function sceneTransition(driver, scene) {
  var func = function() {
    this.driver.setScene(new scene());
  };
  return func.bind(driver);
}
function loadTransitionScene(driver, nextScene, TransitionType, duration, direction) {
  //direction is 1 or -1.  1 is fade to black, -1 is fade from black
  var func = function () {
    this.driver.setScene(new TransitionType(driver, nextScene, duration, direction));
  };
  return func.bind(driver);
}
function drawTransitionOverlay(color, canvas){
  canvas.fillStyle=color;
  canvas.fillRect(0,0,canvas.width,canvas.height);
}
function drawGrid(canvas){
  canvas.lineWidth = 1;
  canvas.strokeStyle = 'black';
  for(var i = 0; i < 10; i++){
    canvas.beginPath();
    canvas.moveTo(i/10.0*canvas.width,0);
    canvas.lineTo(i/10.0*canvas.width,canvas.height);
    canvas.stroke();
  }
  for(var j = 0; j < 10; j++){
    canvas.beginPath();
    canvas.moveTo(0,j/10.0*canvas.height);
    canvas.lineTo(canvas.width,j/10.0*canvas.height);
    canvas.stroke();
  }
}
class Scene {
  constructor() {
    this.keyMap = [];
    this.gui = [];
    this.selectedButton = undefined;
    this.buttons = undefined;
    this.debug = false;

    this.inTransition = false;
    this.overlayColor = "rgba(0,0,0,0)";
    this.transitionTimer = 0;
    this.transitionDuration = 25;
    this.postTransitionCallback = undefined;
    this.transitionDirection = 1;
  }
  update(dt){
    this.handleHeldKeys(dt);
  }
  updateTransition(dt){
    if(this.inTransition){
      if(this.transitionTimer > this.transitionDuration
        || this.transtionTimer < 0){
        this.transitionTimer = (this.direction == 1) ? 0 : this.transitionDuration;
        this.inTransition = false;
        this.overlayColor = 'transparent';
        if(this.postTransitionCallback != undefined)
          this.postTransitionCallback();
      } else {
        this.transitionTimer += this.transitionDirection*dt;
        this.overlayColor = 'rgba(0,0,0,' + 
          (this.transitionTimer*1.0/this.transitionDuration) + ')';
      }
    }
  }
  draw(canvas){}
  keydown(k) {
    var keyMap = this.keyMap;    
    if(keyMap[k]&&keyMap[k].down) {
      keyMap[k].down();
    }
  }
  keyup(k) {
    var keyMap = this.keyMap;
    if(keyMap[k]&&keyMap[k].up) {
      keyMap[k].up();
    }
  }
  handleHeldKeys(dt) {
    var keys = this.keys;
    var keyMap = this.keyMap;
    for(var k in keyMap) {
      if(keys[k]&&keyMap[k].held) {
        keyMap[k].held(dt);
      }
    }
  }
  drawAllGUI(canvas){
    for(var i = 0; i < this.gui.length; i++){
      if(this.gui[i].visible){
        this.gui[i].draw(canvas);
      }
    }
  }
  updateAllGUI(dt){
    for(var i = 0; i < this.gui.length; i++){
      this.gui[i].update(dt);
    }
  }
  startTransition(duration,direction,callback){
    //callback is optional and is undefined if not provided
    this.inTransition = true;
    this.transitionDuration = duration;
    this.transitionTimer = (direction == 1) ? 0 : duration;
    this.transitionDirection = direction;
    this.postTransitionCallback = callback;
  }
  pressButton(){
    //called by keys, not mouse
    if(!this.allowUIInput)
      return;
    this.selectedButton.held = true;
    this.allowUIInput = false;
  }
  unpressButton(){
    //called by keystrokes, not mouse
    this.allowUIInput = true;
    if(this.selectedButton.held){
      this.selectedButton.held = false;
      this.selectedButton.callback();
    }
  }
  navigateUI(direction){
    if(this.selectedButton.buttonLinks[direction] == undefined || !this.allowUIInput)
      return;
    this.selectedButton.selected = false;
    this.selectedButton.buttonLinks[direction].selected = true;
    this.selectedButton = this.selectedButton.buttonLinks[direction];
  }
  toggleDebug(){
    this.debug = !this.debug;
  }
  mousedown(e, mouse) {
    if(!this.allowUIInput)
      return;
    handleMouseDown(e,this.buttons);
  }
  mouseup(e, mouse) {
    if(!this.allowUIInput)
      return;
    handleMouseUp(e,this.buttons);
  }
  mousemove(e, mouse) {
    if(!this.allowUIInput)
      return;
    handleMouseMove(this,e,this.buttons);
  }
  
}
