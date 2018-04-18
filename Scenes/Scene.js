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
function drawScreenOverlay(color, canvas){
  canvas.fillStyle=color;
  canvas.fillRect(0,0,canvas.width,canvas.height);
}
class Scene {
  constructor() {
    this.keyMap = [];
  }
  update(dt){
    this.handleHeldKeys(dt);
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
  mousedown(e, mouse) {}
  mouseup(e, mouse) {}
  mousemove(e, mouse) {}
}
