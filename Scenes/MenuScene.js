class MenuScene extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.keyMap = {
      '32': {down: sceneTransition(this, PigFunScene)},
      '69': {down: sceneTransition(this, LevelEditorScene)},
    }
    this.background = new InfiniteBackground();
    this.camera = {x:0,y:0,dx:0,dy:0};
  }
  update() {
    this.camera.x+=3;
  }
  draw(canvas) {
    this.background.draw(canvas, this.camera);
    canvas.fillStyle = 'white';
    canvas.textAlign = 'center';
    canvas.save();
    canvas.scale(2,2);
    canvas.fillText('Jimothy Piggerton', canvas.width/4, canvas.height/6);    
    canvas.restore();
    canvas.fillText('Press Space', canvas.width/2, canvas.height*.6);
  }
}