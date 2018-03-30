class MenuScene extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.keyMap = {
      '32': {down: sceneTransition(this, GameScene)},
      '69': {down: sceneTransition(this, LevelEditorScene)},
    }
    // this.world = new WorldDefault();
    // this.world.background.backgroundColor = null;
    this.background = new InfiniteBackground();
    this.camera = {x:0,y:0,dx:0,dy:0};
  }
  update() {
    this.camera.x+=3;
    // if(this.camera.x>3000*4)this.camera.x=0;
  }
  draw(canvas) {
    // canvas.fillStyle = '#4df';
    // canvas.fillRect(0,0,canvas.width,canvas.height);
    // var d = 2000;
    // canvas.save();
    // canvas.translate(-this.camera.x+d,0);
    // var c = {x:this.camera.x-d,y:0,dx:0,dy:0};
    // this.world.drawBackground(canvas, c);
    // canvas.translate(-d,0);
    // this.world.drawBackground(canvas, this.camera);
    // canvas.restore();
    this.background.draw(canvas, this.camera);
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    canvas.fillText('Press Space', canvas.width/2, canvas.height/2);
  }
}