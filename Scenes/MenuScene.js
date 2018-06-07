class MenuScene extends Scene{
  constructor(playIntro) {
    super(playIntro);
    
    //up    - 0
    //right - 1
    //down  - 2
    //left  - 3
    this.menuState = 0;
    this.allowUIInput = true;
    this.addMainMenuGUI();
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
      '69': { down: () => {if(DEBUG)this.driver.setScene(new LevelEditorSelectScene(false));} },
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
    this.allowUIInput = true;
  }
  
  update(dt) {
    this.camera.x+=3;
    super.update(dt);
   
  }
  draw(canvas) {
    this.background.drawLayers(canvas, this.camera);

    
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
      "Jimothy Piggerton",bigFont,"white",'center');
    this.gui.push(mainTitle);

    dim = rectDimFromCenter(.5,.48,.18,.1);
    var startButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.startGame.bind(this),
      "Start Game",buttonFont,"white","transparent","white",5,.08);
    this.gui.push(startButton);

    dim = rectDimFromCenter(.5,.60,.18,.1);
    var levelSelectButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToLevelSelect.bind(this),
      "Level Select",buttonFont,"white","transparent","white",5,.08);
    this.gui.push(levelSelectButton);

    dim = rectDimFromCenter(.5,.72,.18,.1);
    var optionsButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToOptions.bind(this),
      "Options",buttonFont,"white","transparent","white",5,.08);
    this.gui.push(optionsButton);

    dim = rectDimFromCenter(.5,.84,.18,.1);
    var creditsButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToCredits.bind(this),
      "Credits",buttonFont,"white","transparent","white",5,.08);
    this.gui.push(creditsButton);

    startButton.setNeighbors([undefined,undefined,levelSelectButton,undefined]);
    levelSelectButton.setNeighbors([startButton,undefined,optionsButton,undefined]);
    optionsButton.setNeighbors([levelSelectButton,undefined,creditsButton,undefined]);
    creditsButton.setNeighbors([optionsButton,undefined,undefined,undefined]);

    this.selectedButton = startButton;
    this.selectedButton.selected = true;
    this.buttons = getButtons(this.gui);

  }
  startGame(){
   
    this.allowUIInput = false;
    //this.driver.setScene(new PigFunScene());
    this.startTransition(25,1,sceneTransition(this,IntroScene,true));
  }
  goToLevelSelect(){
   
    this.allowUIInput = false;
    this.driver.setScene(new LevelSelectScene(false));

  }
  goToOptions(){
    this.allowUIInput = false;
    this.driver.setScene(new OptionScene(false));
  } 
  goToCredits(){
   
    this.allowUIInput = false;
    this.driver.setScene(new CreditsScene(false));
  }
  
  
}



