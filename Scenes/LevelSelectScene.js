//menustate constants
var SELECTWORLD = 0;
var SELECTLEVEL = 1;


class LevelSelectScene extends Scene{
    constructor(playIntro){
        super(playIntro);
        this.keyMap = {
          '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
          '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
          '79': {down: this.toggleDebug.bind(this)},    //O->debug
          '27': {down: this.safeButtonCall(this,this.handleEscape)},   //esc
    
          '87': { down: this.navigateLevelSelect.bind(this,0)},    //W
          '68': { down: this.navigateLevelSelect.bind(this,1)},    //D
          '83': { down: this.navigateLevelSelect.bind(this,2)},    //S
          '65': { down: this.navigateLevelSelect.bind(this,3)},   //A
    
          '38': { down: this.navigateLevelSelect.bind(this,0)},  //up
          '39': { down: this.navigateLevelSelect.bind(this,1)},  //right
          '40': { down: this.navigateLevelSelect.bind(this,2)},   //down
          '37': { down: this.navigateLevelSelect.bind(this,3)},   //left
        }
        this.levelsInWorld = [10,10,10];     //numbers should match how many levels are in each world
        this.menuState = SELECTWORLD;
        this.worldSelected = 0;
        this.levelIndex = 0;
        this.worldButtons = [];
        this.worldLabels = [];
        this.allowUIInput = true;
        this.backWall = [];
        this.addLevelSelectGUI();
        this.backgroundList = [[],[],[]];  //list of lists
                                                                //top to bottom
                                                                //4 ScrollingBackgrounds each
        this.createBackgrounds();



    }


    update(dt){
      super.update(dt);
      this.updateBackgrounds(dt);
      this.levelNumLabel.text = this.levelIndex;
    }
    draw(canvas){
      this.drawBackgrounds(canvas);
      canvas.strokeStyle = 'black';
      if(this.menuState == SELECTWORLD)
        canvas.lineWidth = 3;
      else if(this.menuState == SELECTLEVEL)
        canvas.lineWidth = 10;
      canvas.strokeRect(0,this.worldSelected*canvas.height/3,canvas.width,canvas.height/3);
      this.drawAllGUI(canvas);
      drawTransitionOverlay(this.overlayColor,canvas);
      if(this.debug)
        drawGrid(canvas);



    }
    updateBackgrounds(dt){
      for(var i = 0; i < this.backWall.length; i++){
        this.backWall[i].update(dt);
      }
      for(var i = 0; i < this.backgroundList.length; i++){
        for(var j = 0; j < this.backgroundList[i].length; j++){
          this.backgroundList[i][j].update(dt);
        }
      }
    }
    drawBackgrounds(canvas){
      for(var i = 0; i < this.backWall.length; i++){
        this.backWall[i].draw(canvas);
      }
      for(var i = 0; i < this.backgroundList.length; i++){
        for(var j = 0; j < this.backgroundList[i].length; j++){
          this.backgroundList[i][j].draw(canvas);
        }
      }
    }
    createBackgrounds(){
      var slowSpeed = 3;
      var fastSpeed = 5;
      /*
      this.bg = createHillBackground(60, "#888", true);
      this.newBackground1 = new ScrollingBackgroundObject(this.bg,.6,.5,3,0,-200,false);
      this.newBackground2 = new ScrollingBackgroundObject(this.bg,.6,.5,3,this.bg.width,-200,true);
  
      this.otherbg = createHillBackground(100, "#666", false);
      this.newBackground3 = new ScrollingBackgroundObject(this.otherbg,.6,.5,16,0,-100,false);
      this.newBackground4 = new ScrollingBackgroundObject(this.otherbg,.6,.5,16,this.otherbg.width,-100,true);
      */
      var xScale = 0.55;
      var bgSprite1 = createHillBackground(6000, "rgb(10,92,31)", false);
      var bg1 = new ScrollingBackgroundObject(bgSprite1,xScale,.35,slowSpeed,0,-80,false,true);
      var bg2 = new ScrollingBackgroundObject(bgSprite1,xScale,.35,slowSpeed,bgSprite1.width,-80,true,true);
      this.backgroundList[0].push(bg1);
      this.backgroundList[0].push(bg2);
      
      var bgSprite2 = createHillBackground(6000, "rgb(11,102,35)", false);
      bg1 = new ScrollingBackgroundObject(bgSprite2,xScale,.2,fastSpeed,0,37,false,true);
      bg2 = new ScrollingBackgroundObject(bgSprite2,xScale,0.2,fastSpeed,bgSprite2.width,37,true,true);
      this.backgroundList[0].push(bg1);
      this.backgroundList[0].push(bg2);

      xScale = 0.7;
      var bgSprite3 = createHillBackground(6000, "rgb(187,154,57)", false);
      var bg1 = new ScrollingBackgroundObject(bgSprite3,xScale,.35,slowSpeed,0,120,false,false);
      var bg2 = new ScrollingBackgroundObject(bgSprite3,xScale,.35,slowSpeed,bgSprite3.width,120,true,false);
      this.backgroundList[1].push(bg1);
      this.backgroundList[1].push(bg2);

      var bgSprite4 = createHillBackground(6000, "rgb(239,209,59)", false);
      bg1 = new ScrollingBackgroundObject(bgSprite4,xScale,.2,fastSpeed,0,237,false,false);
      bg2 = new ScrollingBackgroundObject(bgSprite4,xScale,0.2,fastSpeed,bgSprite4.width,237,true,false);
      this.backgroundList[1].push(bg1);
      this.backgroundList[1].push(bg2);

      var bgSprite5 = createForrestBackground(60, "0b6623", false);
      var bg1 = new ScrollingBackgroundObject(bgSprite5,xScale,.35,slowSpeed,0,320,false,false);
      var bg2 = new ScrollingBackgroundObject(bgSprite5,xScale,.35,slowSpeed,bgSprite5.width,320,true,false);
      this.backgroundList[2].push(bg1);
      this.backgroundList[2].push(bg2);

      var bgSprite6 = createForrestBackground(100, "0b6623", false);
      bg1 = new ScrollingBackgroundObject(bgSprite6,xScale,.2,fastSpeed,0,437,false,false);
      bg2 = new ScrollingBackgroundObject(bgSprite6,xScale,0.2,fastSpeed,bgSprite6.width,437,true,false);
      this.backgroundList[2].push(bg1);
      this.backgroundList[2].push(bg2);
    }
    addLevelSelectGUI(){
      var bigFont = '40px Noteworthy';
      var buttonFont = '30px Noteworthy';
      var textColor = 'white';
      //level select title
      var dim = rectDimFromCenter(.5,.06,.3,.1);
      var levelSelectTitle = new Label(dim[0],dim[1],dim[2],dim[3],3,
        "Select Level",'50px Noteworthy',textColor,'middle');
      this.gui.push(levelSelectTitle);
      //Color lerp backgrounds
      var world1Back = new ColorLerpBox(0,0,1,.333,3,[135,206,235,255],[128,128,128,255],25,true );
      this.backWall.push(world1Back);

      var world2Back = new ColorLerpBox(0,.3333,1,.333,3,[230,166,68,255],[128,128,128,255],25,false );
      this.backWall.push(world2Back);

      var world3Back = new ColorLerpBox(0,.6666,1,.333,3,[135,206,235,255],[128,128,128,255],25,false );
      this.backWall.push(world3Back);

      //World labels
      dim = rectDimFromCenter(.1,.09,.2,.12);
      var world1Label = new Label(dim[0],dim[1],dim[2],dim[3],3,"World 1",bigFont,textColor,'middle');
      world1Label.setVisibility(true);
      this.gui.push(world1Label);
      this.worldLabels.push(world1Label);

      dim = rectDimFromCenter(.1,.09+.333,.2,.12);
      var world2Label = new Label(dim[0],dim[1],dim[2],dim[3],3,"World 2",bigFont,textColor,'middle');
      world2Label.setVisibility(false);
      this.gui.push(world2Label);
      this.worldLabels.push(world2Label);

      dim = rectDimFromCenter(.1,.09+.666,.2,.12);
      var world3Label = new Label(dim[0],dim[1],dim[2],dim[3],3,"World 3",bigFont,textColor,'middle');
      world3Label.setVisibility(false);
      this.gui.push(world3Label);
      this.worldLabels.push(world3Label);

      //World buttons (invisible but functional)
      var world1Button = new Button(0,0,1,1/3,0,this.selectWorld.bind(this,0));
      this.gui.push(world1Button);
      this.worldButtons.push(world1Button);

      var world2Button = new Button(0,.333,1,1/3,1,this.selectWorld.bind(this,1));
      this.gui.push(world2Button);
      this.worldButtons.push(world2Button);

      var world3Button = new Button(0,.666,1,1/3,2,this.selectWorld.bind(this,2));
      this.gui.push(world3Button);
      this.worldButtons.push(world3Button);

      world1Button.setNeighbors([world3Button,undefined,world2Button,undefined]);
      world2Button.setNeighbors([world1Button,undefined,world3Button,undefined]);
      world3Button.setNeighbors([world2Button,undefined,world1Button,undefined]);

      //Select level UI
      dim = rectDimFromCenter(.5,.5,.2,.1)
      this.levelNumLabel = new Label(dim[0],dim[1],dim[2],dim[3],4,"X",'50px Noteworthy',textColor,'middle');
      this.levelNumLabel.setVisibility(false);
      this.gui.push(this.levelNumLabel);

      dim = rectDimFromCenter(.5,.6,.18,.08);
      this.startButton = new TextButton(dim[0],dim[1],dim[2],dim[3],4,
      this.loadGameLevel.bind(this),"Start Level",buttonFont,textColor,'transparent',textColor,5);
      this.startButton.setVisibility(false);
      this.startButton.interactable = false;
      this.gui.push(this.startButton);

      dim = rectDimFromCenter(.6,.492,.05,.08);
      this.rightArrow = new ArrowSelector(dim[0],dim[1],dim[2],dim[3],5,this.incrementLevel.bind(this),.05,.015,'white','black',5,false);
      this.rightArrow.selectable = false;
      this.rightArrow.setVisibility(false);
      this.gui.push(this.rightArrow);

      dim = rectDimFromCenter(.4,.492,.05,.08);
      this.leftArrow = new ArrowSelector(dim[0],dim[1],dim[2],dim[3],5,this.decrementLevel.bind(this),.05,.015,'white','black',5,true);
      this.leftArrow.selectable = false;
      this.leftArrow.setVisibility(false);
      this.gui.push(this.leftArrow);

      this.buttons = getButtons(this.gui);
      this.selectedButton = world1Button;
    }
    updateWorldSelection(worldNumber){
      this.worldSelected = worldNumber;
      for(var i = 0; i < this.backWall.length; i++){
        this.backWall[i].activated = false;
        this.worldLabels[i].setVisibility(false);
      }
      this.worldLabels[worldNumber].setVisibility(true);
      this.backWall[worldNumber].activated = true;
      for(var i = 0; i < this.backgroundList.length;i++){
        for(var j = 0; j < this.backgroundList[i].length;j++){
          if(i == worldNumber)
            this.backgroundList[i][j].activated = true;
          else 
            this.backgroundList[i][j].activated = false;
        }
      }
    }
    selectWorld(worldNumber){
      this.worldSelected = worldNumber;
      this.menuState = SELECTLEVEL;
      this.selectedButton = this.startButton;
      this.selectedButton.selected = true;
      for(var i = 0; i < this.worldButtons.length; i++){
        this.worldButtons[i].setOptions(false,false,false);
      }
      var offSet = (this.worldSelected-1)/3;
      var group4GUI = getGUIInGroup(4,this.gui);
      for(var i = 0; i < group4GUI.length; i++){
        group4GUI[i].setOptions(true,true,true);
        group4GUI[i].y += offSet;
      }
      var group5GUI = getGUIInGroup(5,this.gui);
      for(var i = 0; i < group5GUI.length; i++){
        group5GUI[i].setOptions(true,false,true);
        group5GUI[i].y += offSet;
      }
      this.leftArrow.setVisibility(false);

    }
    returnToWorldSelect(){
      this.menuState = SELECTWORLD;
      this.selectedButton = getGUIInGroup(this.worldSelected,this.gui)[0];
      for(var i = 0; i < this.worldButtons.length; i++){
        this.worldButtons[i].setOptions(true,true,true);
      }
      var group4GUI = getGUIInGroup(4,this.gui);
      for(var i = 0; i < group4GUI.length; i++){
        group4GUI[i].setOptions(false,false,false);
        group4GUI[i].reset();
      }
      var group5GUI = getGUIInGroup(5,this.gui);
      for(var i = 0; i < group5GUI.length; i++){
        group5GUI[i].setOptions(false,false,false);
        group5GUI[i].reset();
      }
      this.levelIndex = 0;
    }
    loadGameLevel(){
      //This calls a fade to black transition and then loads the level at the end of the transition
      this.allowUIInput = false;
      var levelToLoad = 0;
      for(var i = 0; i < this.worldSelected; i++){
        levelToLoad += this.levelsInWorld[i];       //sums # of levels in previous worlds
      }
      levelToLoad += this.levelIndex;     
      this.startTransition(25,1,function() {
        var newScene = new GameScene();
        newScene.loadNewLevel(levelToLoad);
        this.driver.setScene(newScene);
      });
    
    }
    handleEscape(){
      if(this.menuState == SELECTWORLD){
        this.driver.setScene(new MenuScene(false));
      } else if(this.menuState == SELECTLEVEL){
        this.returnToWorldSelect();
      }
    }
    goToMainMenu(){
      this.driver.setScene(new MenuScene(false));
    }
    mousemove(e, mouse) {
      //Overload
      if(!this.allowUIInput)
        return;
      if(this.menuState == SELECTWORLD){
        var percentPoint = getPercentPoint(e);
        var worldNumber = Math.floor(percentPoint[1]*3);        //spreads values 0 to .999 -> 0 to 2.999
        var worldNumber = (worldNumber >= 3) ? 2 : worldNumber; //cap to 2 if too large
        var worldNumber = (worldNumber < 0) ? 0 : worldNumber;  //cap to 0 if too small
        this.updateWorldSelection(worldNumber);   
      } 
      handleMouseMove(this,e,this.buttons);
    }
    navigateLevelSelect(direction){
      //Overload
      if(!this.allowUIInput)
        return;
      if(this.menuState == SELECTWORLD){
        this.navigateUI(direction);
        this.updateWorldSelection(this.selectedButton.groupID);
      } else if(this.menuState == SELECTLEVEL){
        switch(direction){
          case 1: //right
            this.rightArrow.callback();
            //callback is incrementLevel+move
            return;
          case 3: //left
            this.leftArrow.callback();
            //callback is decrementLevel+move
            return;
        }

      }
    }
    incrementLevel(){
      this.levelIndex++;
      this.leftArrow.setVisibility(true);
      if(this.levelIndex >= this.levelsInWorld[this.worldSelected]){
        this.rightArrow.setVisibility(false);
        this.levelIndex = this.levelsInWorld[this.worldSelected]; 
      }
    }
    decrementLevel(){
      this.levelIndex--;
      this.rightArrow.setVisibility(true);
      if(this.levelIndex <= 0){
        this.leftArrow.setVisibility(false);
        this.levelIndex = 0;
      }
    }
}