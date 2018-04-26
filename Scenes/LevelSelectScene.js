class LevelSelectScene extends Scene{
  constructor(playIntro){
    super(playIntro);
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
      '79': {down: this.toggleDebug.bind(this)},    //O->debug
      '27': {down: this.safeButtonCall(this,this.goToMainMenu)},   //esc

      '87': { down: this.navigateUI.bind(this,0)},    //W
      '65': { down: this.navigateUI.bind(this,1)},   //D
      '83': { down: this.navigateUI.bind(this,2)},    //S
      '68': { down: this.navigateUI.bind(this,3)},    //A

      '38': { down: this.navigateUI.bind(this,0)},  //up
      '39': { down: this.navigateUI.bind(this,1)},  //right
      '40': { down: this.navigateUI.bind(this,2)},   //down
      '37': { down: this.navigateUI.bind(this,3)},   //left
    }
    this.allowUIInput = true;
    this.addLevelSelectGUI();
  }



  update(dt){
    super.update(dt);
  }
  draw(canvas){
    canvas.fillStyle = 'gray';
    canvas.fillRect(0,0,canvas.width,canvas.height);
    this.drawAllGUI(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
    if(this.debug)
      drawGrid(canvas);
  }
  addLevelSelectGUI(){
    var titleFont = "60px Noteworthy";
    var buttonFont = "30px Noteworthy";
    var textColor = 'white';

    var dim = rectDimFromCenter(.5,.15,.4,.2);
    var levelSelectTitle = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "Select Level",titleFont,textColor,'center');
    this.gui.push(levelSelectTitle);

    dim = rectDimFromCenter(.63,.9,.1,.09);
    var backButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.goToMainMenu.bind(this), "Back",buttonFont,textColor,'transparent',textColor,3);
    this.gui.push(backButton);
    //Hardcoded to 16:9 aspect ratio (in order to make squares)
    var buttonWidth = 0.062;
    var buttonGap = 0.07;
    var square = [1,16/9];
    var rowLength = 5;
    var buttonList = [];
    var origin = [0.5-buttonGap*(rowLength-1)/2,.30]; //top left of button grid

    for(var i = 0; i < rowLength; i++){
      for(var j = 0; j < rowLength; j++){
        dim = rectDimFromCenter(origin[0]+buttonGap*i*square[0],origin[1]+buttonGap*j*square[1],
          buttonWidth*square[0],buttonWidth*square[1]);
        buttonList[i+j*5] = new TextButton(dim[0],dim[1],dim[2],dim[3],1,
          this.loadGameLevel.bind(this,i+j*5),
          ""+(i+1+j*5),buttonFont,textColor,'transparent',textColor,3);
        this.gui.push(buttonList[i+j*5]);
      }
    }
    for(var i = 0; i < rowLength; i++){
      for(var j = 0; j < rowLength; j++){
        var neighbors = [undefined,undefined,undefined,undefined];
        if(i > 0){
          neighbors[1] = buttonList[i-1+j*5];
        }
        if(i < rowLength-1){
          neighbors[3] = buttonList[i+1+j*5];
        }
        if(j > 0){
          neighbors[0] = buttonList[i+(j-1)*5];
        }
        if(j < rowLength-1){
          neighbors[2] = buttonList[i+(j+1)*5];
        }
        if(j == rowLength-1){
          neighbors[2] = backButton;
        }
        if(i == rowLength-1 && j == rowLength-1)
          backButton.setNeighbors([buttonList[i+j*5],undefined,undefined,undefined]);
        buttonList[i+j*5].setNeighbors(neighbors);
      }
    }
    this.selectedButton = buttonList[0];
    buttonList[0].selected = true;

    this.buttons = getButtons(this.gui);

  }
  loadGameLevel(index){
    //This calls a fade to black transition and then loads the level at the end of the transition
    this.allowUIInput = false;
    this.startTransition(25,1,function() {
      var newScene = new GameScene();
      newScene.loadNewLevel(index);
      this.driver.setScene(newScene);
    });

  }
  goToMainMenu(){
    this.driver.setScene(new MenuScene(false));
  }

}