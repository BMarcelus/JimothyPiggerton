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
    this.allowInput = true;
    this.allowNavigation = true;
    this.gui = [];
    this.selectedButton = undefined;
    this.addMainMenuGUI();
    this.buttons = getButtons(this.gui);
    this.keyMap = {
      //'32': { down: loadTransitionScene(this,PigFunScene,FadeToBlack,25.0, 1) },
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) },
      '69': { down: sceneTransition(this, LevelEditorScene) },
      '79': { down: this.toggleDebug.bind(this) },
      '87': { down: this.navigateUp.bind(this) },     //W
      '65': { down: this.navigateRight.bind(this) },  //D
      '83': { down: this.navigateDown.bind(this) },   //S
      '68': { down: this.navigateLeft.bind(this) },   //A
    }
    this.background = new InfiniteBackground();
    this.camera = {x:0,y:0,dx:0,dy:0};
    this.debug = false;
    
  }
  
  update(dt) {
    this.camera.x+=3;
  }
  draw(canvas) {
    this.background.draw(canvas, this.camera);
    this.drawAllGUI(canvas);
    if(this.debug)
      drawGrid(canvas);
  }
  drawAllGUI(canvas){
    for(var i = 0; i < this.gui.length; i++){
      if(this.gui[i].visible){
        this.gui[i].draw(canvas);
      }
    }
  }
  pressButton(){
    if(!this.allowInput)
      return;
    this.selectedButton.held = true;
    this.allowInput = false;
  }
  unpressButton(){
    this.allowInput = true;
    this.selectedButton.held = false;
    this.selectedButton.callback();
  }
  navigateUp(){
    if(this.selectedButton.buttonLinks[0] == undefined || !this.allowInput)
      return;
    this.selectedButton.selected = false;
    this.selectedButton.buttonLinks[0].selected = true;
    this.selectedButton = this.selectedButton.buttonLinks[0];
  }
  navigateRight(){
    if(this.selectedButton.buttonLinks[1] == undefined || !this.allowInput)
      return;
    this.selectedButton.selected = false;
    this.selectedButton.buttonLinks[1].selected = true;
    this.selectedButton = this.selectedButton.buttonLinks[1];
  }
  navigateDown(){
    if(this.selectedButton.buttonLinks[2] == undefined || !this.allowInput)
      return;
    this.selectedButton.selected = false;
    this.selectedButton.buttonLinks[2].selected = true;
    this.selectedButton = this.selectedButton.buttonLinks[2];
  }
  navigateLeft(){
    if(this.selectedButton.buttonLinks[3] == undefined || !this.allowInput)
      return;
    this.selectedButton.selected = false;
    this.selectedButton.buttonLinks[3].selected = true;
    this.selectedButton = this.selectedButton.buttonLinks[3];
  }
  
  addMainMenuGUI(){
    var dim = rectDimFromCenter(.5,.28,.58,.12);
    var mainTitle = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "Jimothy Piggerton","60px Noteworthy","white");
    this.gui.push(mainTitle);

    dim = rectDimFromCenter(.5,.48,.22,.1);
    var startButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.startGame.bind(this),
      "Start Game","30px Noteworthy","white","transparent","white",5);
    this.gui.push(startButton);

    dim = rectDimFromCenter(.5,.60,.22,.1);
    var levelSelectButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToLevelSelect.bind(this),
      "Level Select","30px Noteworthy","white","transparent","white",5);
    this.gui.push(levelSelectButton);

    dim = rectDimFromCenter(.5,.72,.22,.1);
    var optionsButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToOptions.bind(this),
      "Options","30px Noteworthy","white","transparent","white",5);
    this.gui.push(optionsButton);

    dim = rectDimFromCenter(.5,.84,.22,.1);
    var creditsButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToCredits.bind(this),
      "Credits","30px Noteworthy","white","transparent","white",5);
    this.gui.push(creditsButton);

    startButton.setNeighbors([undefined,undefined,levelSelectButton,undefined]);
    levelSelectButton.setNeighbors([startButton,undefined,optionsButton,undefined]);
    optionsButton.setNeighbors([levelSelectButton,undefined,creditsButton,undefined]);
    creditsButton.setNeighbors([optionsButton,undefined,undefined,undefined]);

    this.selectedButton = startButton;
    this.selectedButton.selected = true;
  }
  startGame(){
    this.driver.setScene(new FadeToBlack(this, PigFunScene, 25, 1));
  }
  goToLevelSelect(){
    
  }
  goToOptions(){

  }
  goToCredits(){

  }
  toggleDebug(){
    this.debug = !this.debug;
  }
  mousedown(e, mouse) {
    if(!this.allowInput)
      return;
    handleMouseDown(e,this.buttons);
  }
  mouseup(e, mouse) {
    if(!this.allowInput)
      return;
    handleMouseUp(e,this.buttons);
  }
  mousemove(e, mouse) {}
}
function someFunction(){
  console.log("Button Pressed");
}
function drawGrid(canvas){
  canvas.lineWidth = 1;
  canvas.strokeStyle = 'black';
  for(var i = 0; i < 10; i++){
    canvas.beginPath();
    canvas.moveTo(i/10.0*canvas.width,0);
    canvas.lineTo(i/10.0*canvas.width,canvas.height);
    canvas.stroke();
  }
  for(var j = 0; j < 10; j++){
    canvas.beginPath();
    canvas.moveTo(0,j/10.0*canvas.height);
    canvas.lineTo(canvas.width,j/10.0*canvas.height);
    canvas.stroke();
  }
}
