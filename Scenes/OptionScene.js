class OptionScene extends Scene{
  constructor(playLevelIntro){
    super(playLevelIntro);
    this.settings = {
      volume:1,
    }
    this.background = new InfiniteBackground();
   
    this.camera = {x:0,y:0,dx:0,dy:0};
    this.loadOptionGUI();
  }
  update(dt){
    this.camera.x += 3;
    super.update(dt);
    this.volumeLabel.text = ""+Math.floor(this.volumeSlider.value*100);
  }
  draw(canvas){
    this.background.drawLayers(canvas, this.camera);
    this.drawAllGUI(canvas);
  }
  loadOptionGUI(){
    var dim = rectDimFromCenter(.5,.5,.2,.1);
    this.volumeSlider = new Slider(dim[0],dim[1],dim[2],dim[3],
      0,undefined,0.03,1,'white','white','gray','black');
    this.volumeSlider.callback = this.setVolume.bind(this,this.volumeSlider);
    this.gui.push(this.volumeSlider);

    dim = rectDimFromCenter(.5,.35,.1,.1);
    this.volumeLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
      this.volumeSlider.value,'60px Noteworthy','white','center');
    this.gui.push(this.volumeLabel);

    dim = rectDimFromCenter(.8,.9,.2,.1);
    var backButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToMainMenu.bind(this),"Main Menu",'30px Noteworthy', 
    'white','transparent','white', 5,.05);
    this.gui.push(backButton);
    this.selectedButton = backButton;
    backButton.selected = true;

    this.buttons = getButtons(this.gui);
  }
  goToMainMenu(){
    this.driver.setScene(new MenuScene(false));
  }
  setVolume(slider){
    this.settings.volume = slider.value;
    DESTINATION.gain.setValueAtTime(slider.value, 0);
    SOUNDMAP.jump2.play();
  }
}