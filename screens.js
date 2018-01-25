
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


class MenuScreen extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.keyMap = {
      '32': {down: this.start.bind(this)}
    }
  }
  start() {
    this.driver.setScene(new GameDriver());
  }
  draw(canvas) {
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    canvas.fillText('Press Space', canvas.width/2, canvas.height/2);
  }
}

class PauseScreen extends Scene {
  constructor(prevScene) {
    super();
    this.prevScene = prevScene;
    this.keyMap = {
      '27': {down: this.unpause.bind(this)}
    }
  }
  unpause() {
    this.driver.setScene(this.prevScene);
  }
  draw(canvas) {
    this.prevScene.draw(canvas);
    canvas.fillStyle="rgba(255,255,255,.7)"
    canvas.fillRect(0,0,canvas.width,canvas.height);
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    canvas.fillText('Paused', canvas.width/2, canvas.height/2);
  }
}


class WinScreen extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.keyMap = {
      '32': {down: this.start.bind(this)}
    }
  }
  start() {
    this.driver.setScene(new GameDriver());
  }
  draw(canvas) {
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    canvas.fillText('You Win! Press Space To Restart', canvas.width/2, canvas.height/2);
  }
}