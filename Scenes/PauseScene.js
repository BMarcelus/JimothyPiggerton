class PauseScene extends Scene {
  constructor(prevScene) {
    super();
    this.prevScene = prevScene;
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter

      '27': {down: this.safeButtonCall(this,this.unpause)}, //esc
      '87': { down: this.navigateUI.bind(this,0)},    //W
      '65': { down: this.navigateUI.bind(this,1)},   //D
      '83': { down: this.navigateUI.bind(this,2)},    //S
      '68': { down: this.navigateUI.bind(this,3)},    //A
      '38': { down: this.navigateUI.bind(this,0)},  //up
      '39': { down: this.navigateUI.bind(this,1)},  //right
      '40': { down: this.navigateUI.bind(this,2)},   //down
      '37': { down: this.navigateUI.bind(this,3)},   //left

      '78': {down: function() {
        if(this.keys[67] && DEBUG) {
          this.goToLevelEditor(prevScene.levelIndex+1);
        }
      }.bind(this)},
    }
    this.allowUIInput = true;
    this.selectedButton = undefined;
    this.addPauseMenuGUI();
  }
  update(dt){
    super.update(dt);
    SOUNDMAP.music.lerpVolume(0.2, 0.05);
  }
  unpause() {
    this.driver.setScene(this.prevScene);
  }
  goToMainMenu(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,MenuScene,true));
  }
  goToLevelSelect(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,LevelSelectScene,true));
  }
  restartLevel(){
    this.allowUIInput = false;
    this.prevScene.loadNewLevel();
    if(this.prevScene instanceof PigFunScene)
      this.prevScene.spawnPig();
    this.unpause();
  }
  goToLevelEditor(index){
    if (index == 24)
      index = -1;
    var scene = new LevelEditorScene(index);
    this.driver.setScene(scene);
  }
  draw(canvas) {
    this.prevScene.draw(canvas);
    canvas.fillStyle="rgba(255,255,255,.7)"
    canvas.fillRect(0,0,canvas.width,canvas.height);
    this.deathCount.text = ""+this.prevScene.levelDeaths;
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
      "Paused",bigFont,textColor,'center');
    this.gui.push(pauseLabel);

    dim = rectDimFromCenter(.96,.95,.05,.08);
    this.deathCount = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "X", bigFont, textColor,'left');
    this.gui.push(this.deathCount);

    dim = rectDimFromCenter(.82,.96,.2,.08);
    var deathLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "Fails:", buttonFont,textColor,'right');
    this.gui.push(deathLabel);

    dim = rectDimFromCenter(0.5,.55,0.2,.08);
    var resumeButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.unpause.bind(this),"Resume",buttonFont,textColor,'transparent',textColor,5,.08);
    this.gui.push(resumeButton);

    dim = rectDimFromCenter(.5,.55+buttonGap,.2,.08);
    var levelSelectButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.goToLevelSelect.bind(this),"Level Select",buttonFont,textColor,'transparent',textColor,5,.08);
    this.gui.push(levelSelectButton);

    dim = rectDimFromCenter(0.5,0.55+buttonGap*2,.2,.08);
    var restartButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.restartLevel.bind(this),"Restart",buttonFont,textColor,'transparent',textColor,5,.08);
    this.gui.push(restartButton);
    
    dim = rectDimFromCenter(0.5,0.55+buttonGap*3,.2,.08);
    var mainMenuButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.goToMainMenu.bind(this),"Main Menu",buttonFont,textColor,'transparent',textColor,5,.08);
    this.gui.push(mainMenuButton);

    this.selectedButton = resumeButton;
    this.selectedButton.selected = true;

    resumeButton.setNeighbors([undefined,undefined,levelSelectButton,undefined]);
    levelSelectButton.setNeighbors([resumeButton,undefined,restartButton,undefined]);
    restartButton.setNeighbors([levelSelectButton,undefined,mainMenuButton,undefined]);
    mainMenuButton.setNeighbors([restartButton,undefined,undefined,undefined]);

    this.buttons = getButtons(this.gui);

  }
} 