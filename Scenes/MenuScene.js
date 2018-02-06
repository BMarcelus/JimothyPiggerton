class MenuScene extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.keyMap = {
      '32': {down: sceneTransition(this, GameScene)},
      '69': {down: sceneTransition(this, LevelEditorScene)},
    }
  }
  draw(canvas) {
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    canvas.fillText('Press Space', canvas.width/2, canvas.height/2);
  }
}