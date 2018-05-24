class LevelEditorSelectScene extends LevelSelectScene{
  constructor(playIntro){
    super(playIntro);
    
    this.keyMap['69'] = {down: this.loadLocalLevel.bind(this)};
    this.keyMap['82'] = {down: this.loadPigLevel.bind(this)};
    this.addExtraGUI();
  }
  update(dt,frameCount){
    super.update(dt,frameCount);
  }
  draw(canvas){
    super.draw(canvas);
  }
  
  loadLocalLevel(){
    this.loadGameLevel(0);
  }
  loadPigLevel(){
    this.loadGameLevel(-1);
  }
  addExtraGUI(){
    var dim = rectDimFromCenter(.5,.33,.7,.1);
    var levelEditorLabel = new Label(dim[0],dim[1],dim[2],dim[3],7,"Level Editor    [E] - Local Level    [R] - PigFunScene",'30px Noteworthy','white','center');
    this.gui.push(levelEditorLabel);
  }
  loadGameLevel(index){
    if(index == undefined){
      super.loadGameLevel();
      return;
    }
    if (index == 24)
      index = -1;
    var scene = new LevelEditorScene(index);
    this.driver.setScene(scene);
  }
}