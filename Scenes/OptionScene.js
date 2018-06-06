class OptionScene extends Scene{
  constructor(playLevelIntro){
    super(playLevelIntro);
    this.keyMap = {
      '27': {down: this.safeButtonCall(this,this.goToMainMenu)},   //esc
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
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
    this.loadOptionGUI();
  }
  update(dt){
    this.camera.x += 3;
    super.update(dt);
    this.volumeLabel.text = "Volume: "+Math.floor(this.volumeSlider.value*100);
  }
  draw(canvas){
    this.background.drawLayers(canvas, this.camera);
    this.drawAllGUI(canvas);
  }
  loadOptionGUI(){
    var dim = rectDimFromCenter(.5,.5,.2,.1);
    this.volumeSlider = new Slider(dim[0],dim[1],dim[2],dim[3],
      0,undefined,0.03,DESTINATION.gain.value,'white','white','gray','black');
    this.volumeSlider.onRelease = this.playSliderSound.bind(this,this.volumeSlider); 
    this.volumeSlider.onHold = this.setVolume.bind(this,this.volumeSlider);
    this.gui.push(this.volumeSlider);

    dim = rectDimFromCenter(0,.4,.25,.1);
    this.volumeLabel = new Label(.4,dim[1],dim[2],dim[3],0,
      this.volumeSlider.value,'35px Noteworthy','white','left');
    this.gui.push(this.volumeLabel);

    dim = rectDimFromCenter(.8,.9,.2,.1);
    var backButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToMainMenu.bind(this),"Main Menu",'30px Noteworthy', 
    'white','transparent','white', 5,.05);
    this.gui.push(backButton);
    this.selectedButton = backButton;
    backButton.selected = true;

    dim = rectDimFromCenter(.5,.7,.2,.1);
    var gamepadBtn = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,() => {
      MAIN.gamepadOn = !MAIN.gamepadOn;
      gamepadBtn.text = "Gamepad " + (MAIN.gamepadOn ? 'On' : 'Off');
    },"Gamepad On",'30px Noteworthy', 
    'white','transparent','white', 5,.05);
    this.gui.push(gamepadBtn);

    dim = rectDimFromCenter(.5,.15,.4,.2);
    var optionsLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,"Options",'60px Noteworthy','white','center');
    this.gui.push(optionsLabel);

    
    this.buttons = getButtons(this.gui);
  }
  goToMainMenu(){
    this.driver.setScene(new MenuScene(false));
  }
  setVolume(slider){
    setVolume(slider.value);
  }
  playSliderSound(slider){
    SOUNDMAP.jump2.play();
  }
}