class PauseScene extends Scene {
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