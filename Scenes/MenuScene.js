class MenuScene extends Scene{
  constructor() {
    super();
    //I need a better way to do this
    // MAINMENU = 0;
    // OPTIONS = 1;
    // CREDITS = 2;
    // LEVELSELECT = 3;

    //up    - 0
    //right - 1
    //down  - 2
    //left  - 3
    this.menuState = 0;
    this.allowUIInput = true;
    this.addMainMenuGUI();
    this.buttons = getButtons(this.gui);
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) },
      '69': { down: sceneTransition(this, LevelEditorSelectScene) },
      '79': { down: this.toggleDebug.bind(this) },
      '87': { down: this.navigateUI.bind(this,0)},    //W
      '65': { down: this.navigateUI.bind(this,1)},   //D
      '83': { down: this.navigateUI.bind(this,2)},    //S
      '68': { down: this.navigateUI.bind(this,3)},    //A
      '38': { down: this.navigateUI.bind(this,0)},  //up
      '39': { down: this.navigateUI.bind(this,1)},  //right
      '40': { down: this.navigateUI.bind(this,2)},   //down
      '37': { down: this.navigateUI.bind(this,3)},   //left

    }
    this.background = new InfiniteBackground();
    this.camera = {x:0,y:0,dx:0,dy:0};
    this.startTransition(25,-1,undefined);
  }
  
  update(dt) {
    this.camera.x+=3;
    this.updateTransition(dt);
  }
  draw(canvas) {
    this.background.draw(canvas, this.camera);
    this.drawAllGUI(canvas);
    if(this.debug)
      drawGrid(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
  }
  drawAllGUI(canvas){
    for(var i = 0; i < this.gui.length; i++){
      if(this.gui[i].visible){
        this.gui[i].draw(canvas);
      }
    }
  }
 
  addMainMenuGUI(){
    var bigFont = "60px Noteworthy";
    var buttonFont = "30px Noteworthy";

    var dim = rectDimFromCenter(.5,.28,.58,.12);
    var mainTitle = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "Jimothy Piggerton",bigFont,"white");
    this.gui.push(mainTitle);

    dim = rectDimFromCenter(.5,.48,.22,.1);
    var startButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.startGame.bind(this),
      "Start Game",buttonFont,"white","transparent","white",5);
    this.gui.push(startButton);

    dim = rectDimFromCenter(.5,.60,.22,.1);
    var levelSelectButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToLevelSelect.bind(this),
      "Level Select",buttonFont,"white","transparent","white",5);
    this.gui.push(levelSelectButton);

    dim = rectDimFromCenter(.5,.72,.22,.1);
    var optionsButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToOptions.bind(this),
      "Options",buttonFont,"white","transparent","white",5);
    this.gui.push(optionsButton);

    dim = rectDimFromCenter(.5,.84,.22,.1);
    var creditsButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToCredits.bind(this),
      "Credits",buttonFont,"white","transparent","white",5);
    this.gui.push(creditsButton);

    startButton.setNeighbors([creditsButton,undefined,levelSelectButton,undefined]);
    levelSelectButton.setNeighbors([startButton,undefined,optionsButton,undefined]);
    optionsButton.setNeighbors([levelSelectButton,undefined,creditsButton,undefined]);
    creditsButton.setNeighbors([optionsButton,undefined,startButton,undefined]);

    this.selectedButton = startButton;
    this.selectedButton.selected = true;
  }
  startGame(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,PigFunScene));
  }
  goToLevelSelect(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,LevelSelectScene));
  }
  goToOptions(){

  }
  goToCredits(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,CreditsScene));
  }
  
  
}
function someFunction(){
  console.log("Button Pressed");
}


