class PauseScene extends Scene {
  constructor(prevScene) {
    super();
    this.prevScene = prevScene;
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) },
      '27': {down: this.unpause.bind(this)},
      '79': {down: this.toggleDebug.bind(this)},
      '87': { down: this.navigateUp.bind(this) },     //W
      '65': { down: this.navigateRight.bind(this) },  //D
      '83': { down: this.navigateDown.bind(this) },   //S
      '68': { down: this.navigateLeft.bind(this) },   //A
      '38': { down: this.navigateUp.bind(this) },     //up
      '39': { down: this.navigateRight.bind(this) },  //right
      '40': { down: this.navigateDown.bind(this) },   //down
      '37': { down: this.navigateLeft.bind(this) },   //left
    }
    this.allowUIInput = true;
    this.selectedButton = undefined;
    this.addPauseMenuGUI();
    this.buttons = getButtons(this.gui);
  }
  update(dt){
    this.updateTransition(dt);
  }
  unpause() {
    this.driver.setScene(this.prevScene);
  }
  goToMainMenu(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,MenuScene));
  }
  goToLevelSelect(){
    //this.allowUIInput = false;
    this.startTransition(25,1,undefined)    //TBD when level select is created
  }
  restartLevel(){
    this.allowUIInput = false;
    this.prevScene.loadNewLevel();
    this.unpause();
  }
  draw(canvas) {
    this.prevScene.draw(canvas);
    canvas.fillStyle="rgba(255,255,255,.7)"
    canvas.fillRect(0,0,canvas.width,canvas.height);
    this.drawAllGUI(canvas);
    if(this.debug)
      drawGrid(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
  }
  addPauseMenuGUI(){
    var bigFont = "60px Noteworthy";
    var buttonFont = "30px noteworthy";
    var textColor = 'black';
    var buttonGap = 0.085;

    var dim = rectDimFromCenter(.5,.4,.2,.08);
    var pauseLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "Paused",bigFont,textColor);
    this.gui.push(pauseLabel);

    dim = rectDimFromCenter(0.5,.55,0.2,.08);
    var resumeButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.unpause.bind(this),"Resume",buttonFont,textColor,'transparent',textColor,5);
    this.gui.push(resumeButton);

    dim = rectDimFromCenter(.5,.55+buttonGap,.2,.08);
    var levelSelectButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.goToLevelSelect.bind(this),"Level Select",buttonFont,textColor,'transparent',textColor,5);
    this.gui.push(levelSelectButton);

    dim = rectDimFromCenter(0.5,0.55+buttonGap*2,.2,.08);
    var restartButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.restartLevel.bind(this),"Restart",buttonFont,textColor,'transparent',textColor,5);
    this.gui.push(restartButton);
    
    dim = rectDimFromCenter(0.5,0.55+buttonGap*3,.2,.08);
    var mainMenuButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.goToMainMenu.bind(this),"Main Menu",buttonFont,textColor,'transparent',textColor,5);
    this.gui.push(mainMenuButton);

    this.selectedButton = resumeButton;
    this.selectedButton.selected = true;

    resumeButton.setNeighbors([mainMenuButton,undefined,levelSelectButton,undefined]);
    levelSelectButton.setNeighbors([resumeButton,undefined,restartButton,undefined]);
    restartButton.setNeighbors([levelSelectButton,undefined,mainMenuButton,undefined]);
    mainMenuButton.setNeighbors([restartButton,undefined,resumeButton,undefined]);
  }
} 