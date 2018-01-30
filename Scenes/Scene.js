function sceneTransition(driver, scene) {
  var func = function() {
    this.driver.setScene(new GameScene());
  };
  return func.bind(driver);
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
}
