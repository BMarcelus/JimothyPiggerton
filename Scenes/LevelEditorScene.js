class LevelEditorScene extends Scene{
  constructor(index) {
    super(false);
    this.editLevel = index;
    this.zoom = 1;
    var grid;

    switch (this.editLevel)
    {
      case -2:
        this.world = new WorldDefault(48,24);
        break;
      case -1:
        var level = new PigFunScene();
        this.world = new WorldFromLevel(level.levels[0]);
        break;
      case 0:
        this.world = new WorldDefault(48, 24);      
        grid = this.load();
        this.world.h = grid.length;
        this.world.w = grid[0].length;
        break;
      default:
        var levels = createLevels();
        this.world = new WorldFromLevel(levels[this.editLevel-1]);
    }
      
    if(grid) {
      this.world.world = grid;
    }
    this.grid = this.world.world;
    this.camera = {x:0,y:0, offset: {x: 0, y: 0}};
    this.keyMap = {
      '32': {down: this.startDragging.bind(this), held: this.drag.bind(this)},
      '75': {down: this.runTest.bind(this)},    //K
      '80': {down: this.printLevel.bind(this)},       //P
      '83': {down: this.cycleBlockBackwards.bind(this)},//S
      '87': {down: this.cycleBlock.bind(this)},         //W
      '69': {down: this.cycleAbility.bind(this)},       //E
      '84': {down: this.zoomIn.bind(this)},             //T
      '71': {down: this.zoomOut.bind(this)},            //G
      '73': {down: this.growi.bind(this)},              //I
      '74': {down: this.growj.bind(this)},              //J
      '27': {down: this.backToSelect.bind(this)},       //Escape
      '88': {down: this.openBlockSelect.bind(this)},    //X
      '66': {down: this.resetCameraPosition.bind(this)},//B
      '65': {down: this.pickBlockFromLevel.bind(this)}, //A

      '82': {down: this.gridScrollUp.bind(this)},     //R
      '70': {down: this.gridScrollDown.bind(this)},   //F
      '68': {down: this.selectAir.bind(this)},        //D
      '72': {down: this.toggleCommandList.bind(this)},//H

      '90': {down: this.selectFromQuickSelect.bind(this,0)},   //Z
      '88': {down: this.selectFromQuickSelect.bind(this,1)},   //X
      '67': {down: this.selectFromQuickSelect.bind(this,2)},   //C
      '86': {down: this.selectFromQuickSelect.bind(this,3)},   //V
      
      '49': {down: this.selectFromBar.bind(this,0)},            //1
      '50': {down: this.selectFromBar.bind(this,1)},            //2
      '51': {down: this.selectFromBar.bind(this,2)},            //3
      '52': {down: this.selectFromBar.bind(this,3)},            //4
      '53': {down: this.selectFromBar.bind(this,4)},            //5
      '54': {down: this.selectFromBar.bind(this,5)},            //6
      '55': {down: this.selectFromBar.bind(this,6)},            //7

      
    }
    this.bottomBarHeight = 0.2;
    this.showCommands = false;
    this.dragPivot = {x: 0, y: 0};
    this.clickDragPivot = {x: 0, y: 0};
    this.mousePoint = {x: 0, y: 0};
    this.currentBlock = 1;
    this.playerAbility = [0,0];
    this.rowLength = 7;
    this.rowCount = 2;
    this.buttonGrid = Array(this.rowLength);
    this.quickSelect = [];
    this.resetCameraPosition();
    this.addLevelEditorGUI();
  }
  resetCameraPosition() {
    this.camera.x=this.world.w*this.world.s/2*this.zoom;
    this.camera.y=this.world.h*this.world.s/2*this.zoom;
  }
  openBlockSelect() {
    this.driver.setScene(new PauseScene(this));
  }
  zoomIn() {
    this.zoom += .1;
    if(this.zoom>2) {
      this.zoom=2;
      return;
    }
    this.camera.x += this.world.w*this.world.s*.1/2;
    this.camera.y += this.world.h*this.world.s*.1/2;
  }
  zoomOut() {
    this.zoom -= .1;
    if(this.zoom<.1) {
      this.zoom=.1;
      return;
    }
    this.camera.x -= this.world.w*this.world.s*.1/2;    
    this.camera.y -= this.world.h*this.world.s*.1/2;    
  }
  growi()
  {
    for (var j = 0; j < this.grid.length; j++)
    {
      this.grid[j].push(0);
    }
    this.world.w++;
  }
  growj()
  {
    var newrow = [];
    for (var j = 0; j < this.grid[0].length; j++)
    {
      newrow.push(0);
    }
    this.grid.push(newrow);
    this.world.h++;
  }
  shrinkj() {
    this.grid.splice(this.grid.length-1,1);
    this.world.h--;    
  }
  backToSelect()
  {
    var newScene = new LevelEditorSelectScene();
    this.driver.setScene(newScene);
  }
  cycleBlockBackwards() {
    var l = CELLMAP.length;
    this.currentBlock = (this.currentBlock - 1 + l) % l;
  }
  cycleBlock() {
    this.currentBlock = (this.currentBlock + 1) % CELLMAP.length;
  }
  cycleAbility() {
    if (this.playerAbility[1] == 0)
      this.playerAbility[1] = 1;
    else
    {
      if (this.playerAbility[0] == 0)
      {
        this.playerAbility = [1,0];
      }
      else
        this.playerAbility = [0,0];
    }
  }
  getLevelString() {
    var string = '[\n';
    for(var i = 0;i < this.grid.length;i++) {
      string += '[';
      for(var j=0;j<this.grid[i].length;j++) {
        var s = this.grid[i][j];
        if(s<10) s='0'+s;
        string += s + ',';
      }
      string += '],\n'
    }
    string += ']';
    return string;
  }
  save() {

    if (this.editLevel)
      return;
    var string = this.getLevelString();
    if(!localStorage||!localStorage.setItem)return;
    localStorage.setItem("currentLevel", string);
  }
  load() {
    if(!localStorage || !localStorage.getItem)return null;
    var string = localStorage.getItem("currentLevel");
    if(!string)return false;
    var grid = [];
    var currentRow;
    var currentDigit = '';
    var x = 0;
    var y = 0;
    for(var i = 1; i < string.length-1; i++) {
      var char = string[i];
      switch(char) {
        case '[':
          currentRow = [];
          break;
        case ']':
          grid.push(currentRow);
          break;
        case ',':
          if(currentDigit != '') {
            var type = parseInt(currentDigit, 10);
            if(!CELLMAP[type]) type = 0;
            currentRow.push(type);
            currentDigit = '';
          }
          break;
        default:
          currentDigit += char;
      }
    }
    return grid;
  }
  printLevel() {
    var string = this.getLevelString();
    console.log(string);
  }
  getLevel() {
    return {
      name: 'test1',
      abilities: this.playerAbility,
      modifyPlayer: function(player) {
        for (var i = 0; i < this.abilities.length; i++)
        {
          if (this.abilities[i] == 1)
          {
            PLAYER_ABILITIES[i+1](player);
          }
        }
      },
      grid: this.grid,
    }
  }
  runTest() {
    var testerScene = new LevelTesterScene(this.getLevel(), this);
    this.driver.setScene(testerScene);
  }
  startDragging() {
    this.dragPivot.x = this.driver.mouse.x;
    this.dragPivot.y = this.driver.mouse.y;
  }
  drag() {
    var dx = this.driver.mouse.x - this.dragPivot.x;
    var dy = this.driver.mouse.y - this.dragPivot.y;
    this.camera.x-=dx;
    this.camera.y-=dy;
    this.dragPivot.x += dx;
    this.dragPivot.y += dy;  
  }
  mousedown(e, mouse) {
    // var camera = this.camera;
    // var wx = mouse.x + camera.x - camera.offset.x;
    // var wy = mouse.y + camera.y - camera.offset.y;
    // var x = Math.floor(wx/this.world.s);
    // var y = Math.floor(wy/this.world.s);
    // if(this.world.oob(x,y))return;
    // var t = this.grid[y][x];
    // this.grid[y][x] = (t+1)%3;
    // this.grid[y][x] = this.currentBlock;
    // this.world.forceRedraw(); 
    var onGUI = pointContainsGUI(getPercentPoint(e),this.gui);
    if(!onGUI&&canvas.height-mouse.y> this.bottomBarHeight*canvas.height){
      this.clickDragPivot = {x:0,y:0};
      this.clickDragPivot.x = mouse.x/this.zoom;
      this.clickDragPivot.y = mouse.y/this.zoom;
    } else {
      this.clickDragPivot = undefined;
    }
    super.mousedown(e,mouse);
  }
  mouseup(e, mouse) {

    if(canvas.height-mouse.y> this.bottomBarHeight*canvas.height && this.clickDragPivot != undefined){
      var camera = this.camera;    
      var wx = mouse.x/this.zoom + (camera.x - camera.offset.x)/this.zoom;
      var wy = mouse.y/this.zoom + (camera.y - camera.offset.y)/this.zoom;
      var x1 = Math.floor(wx/this.world.s);
      var y1 = Math.floor(wy/this.world.s);

      wx = this.clickDragPivot.x + (camera.x - camera.offset.x)/this.zoom;
      wy = this.clickDragPivot.y + (camera.y - camera.offset.y)/this.zoom;
      var x2 = Math.floor(wx/this.world.s);
      var y2 = Math.floor(wy/this.world.s);

      var dx = (1 - 2 * (x2<x1));
      var dy = (1 - 2 * (y2<y1));
      for(var i = x1; i != x2+dx; i+= dx) {
        for(var j=y1; j!=y2+dy; j+=dy) {
          if(this.world.oob(i, j))continue;
          this.grid[j][i] = this.currentBlock;
          //var t = this.grid[j][i];
          //this.grid[j][i] = (t+1)%3;
        }
      }
      this.save();
      this.world.forceRedraw();
    }
    super.mouseup(e,mouse);
  }
  mousemove(e,mouse){
    super.mousemove(e);
    this.mousePoint.x = mouse.x;
    this.mousePoint.y = mouse.y;
  }
  // mouseheld(mouse) {

  // }
  // update(dt) {
  //   super.update(dt);
  //   var mouse = this.driver.mouse;
  //   if(mouse.held) {
  //     this.mouseheld(mouse);
  //   }
  // }
  update(dt){
    super.update(dt);
  }
  addLevelEditorGUI(){
    this.buildButtonGrid();
    this.buildQuickSelect();

    var dim = rectDimFromCenter(0.945,.75,.07,.08);
    var saveButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.save.bind(this),'Save','30px Noteworthy','black','rgba(255,255,255,0.75)','black',5);
    this.gui.push(saveButton);



    this.buttons = getButtons(this.gui);
  }
  buildButtonGrid(){
    
    var dim = [];
    var buttonGridRegionWidth = 0.7;
    var buttonGridRegionHeight = 0.2
    var origin = [.05,.85];
    var labelOffset = {x:0.043,y:0.036};
    var labelFont = '20px Noteworthy';
    var labelColor = 'black';
    for(var i = 0; i < this.rowCount; i++){
      this.buttonGrid[i] = [];
      for(var j = 0; j < this.rowLength; j++){
        dim = rectDimFromCenter(origin[0]+j/this.rowLength*buttonGridRegionWidth,
          origin[1]+i/this.rowCount*buttonGridRegionHeight,1/this.rowLength*buttonGridRegionWidth-.02,1/this.rowCount*buttonGridRegionHeight-.02);
        var button = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
          undefined,i*this.rowLength+j);
        button.onRelease = this.selectBlock.bind(this,button);
        this.buttonGrid[i].push(button);
        this.gui.push(button);

        if(i==0 && j < this.rowLength){
          var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,.05,.05,0,""+(j+1),labelFont,labelColor,'center');
          this.gui.push(label);
        }
      }
    }
  }
  buildQuickSelect(){
    var dim = [];
    var regionWidth = 0.2;
    var regionHeight = 0.2;
    var origin = {x:0.78,y:.85};
    var buttonWidth = 0.08;
    var buttonHeight = 0.09;

    var labelOffset = {x:0.043,y:0.045};
    var labelFont = '20px Noteworthy';
    var labelColor = 'black';
    dim = rectDimFromCenter(origin.x,origin.y,buttonWidth,buttonHeight);
    var button1 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button1.onRelease = this.quickSelectClick.bind(this,button1); 
    this.quickSelect.push(button1); 
    this.gui.push(button1);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'Z',labelFont,labelColor,'center');
    this.gui.push(label);    

    dim = rectDimFromCenter(origin.x+buttonWidth,origin.y,buttonWidth,buttonHeight);
    var button2 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button2.onRelease = this.quickSelectClick.bind(this,button2);  
    this.quickSelect.push(button2); 
    this.gui.push(button2);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'X',labelFont,labelColor,'center');
    this.gui.push(label);

    dim = rectDimFromCenter(origin.x,origin.y+buttonHeight,buttonWidth,buttonHeight);
    var button3 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button3.onRelease = this.quickSelectClick.bind(this,button3); 
    this.quickSelect.push(button3);  
    this.gui.push(button3);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'C',labelFont,labelColor,'center');
    this.gui.push(label);

    dim = rectDimFromCenter(origin.x+buttonWidth,origin.y+buttonHeight,buttonWidth,buttonHeight);
    var button4 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button4.onRelease = this.quickSelectClick.bind(this,button4); 
    this.quickSelect.push(button4);  
    this.gui.push(button4);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'V',labelFont,labelColor,'center');
    this.gui.push(label);

    dim = rectDimFromCenter(0.945,0.94,.06,.08);
    var resetBackWall = new ColoredBox(dim[0],dim[1],dim[2],dim[3],0,'white','black',5);
    this.gui.push(resetBackWall);
    var resetQuickSelectButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.resetQuickSelect.bind(this),'X','30px Noteworthy','red','transparent','transparent','3');
    this.gui.push(resetQuickSelectButton);
    
  }
  quickSelectClick(button){
    if(button.blockID == 0){
      button.blockID = this.currentBlock;
    } else {
      this.selectBlock(button);
    }
  }
  selectFromQuickSelect(quickSlotIndex){
    this.currentBlock = this.quickSelect[quickSlotIndex].blockID;
  }
  selectFromBar(index){
    this.currentBlock = this.buttonGrid[0][index].blockID;
  }
  selectBlock(button){
    this.currentBlock = button.blockID;
    if(this.currentBlock >= CELLMAP.length-1)
      this.currentBlock = CELLMAP.length-1;
    if(this.currentBlock < 0){      
      this.currentBlock = 0;
    }
  }
  resetQuickSelect(){
    for(var i = 0; i < this.quickSelect.length; i++){
      this.quickSelect[i].blockID = 0;
    }
  }
  gridScrollUp(){
    if(this.buttonGrid[0][0].blockID >= this.rowLength){
      for(var i = 0; i < this.rowCount; i++){
        for(var j = 0; j < this.rowLength; j++){
          this.buttonGrid[i][j].blockID -= this.rowLength;
        }
      }
    }
  }
  gridScrollDown(){
    if(this.buttonGrid[0][0].blockID <= this.rowLength*this.rowCount-7){
      for(var i = 0; i < this.rowCount; i++){
        for(var j = 0; j < this.rowLength; j++){
          this.buttonGrid[i][j].blockID += this.rowLength;
        }
      }
    }
  }
  drawBlockAtCursor(canvas){
    var offset = {x: 20, y: 20};
    var width = 30;
    var height = 30;
    var world = {
      getCell: function() {return true}
    };
    if(this.currentBlock < CELLMAP.length && this.currentBlock > 0 && CELLMAP[this.currentBlock].draw)
      CELLMAP[this.currentBlock].draw(canvas,this.mousePoint.x+offset.x,this.mousePoint.y+offset.y,width,height,world,0,0);
    canvas.strokeStyle = 'black';
    canvas.lineWidth = 3;
    canvas.strokeRect(this.mousePoint.x+offset.x,this.mousePoint.y+offset.y,width,height);
  }
  selectAir(){
    this.currentBlock = 0;
  }
  toggleCommandList(){
    this.showCommands = !this.showCommands;
  }
  pickBlockFromLevel(){

    var camera = this.camera;    
    var wx = this.mousePoint.x/this.zoom + (camera.x - camera.offset.x)/this.zoom;
    var wy = this.mousePoint.y/this.zoom + (camera.y - camera.offset.y)/this.zoom;
    var x = Math.floor(wx/this.world.s);
    var y = Math.floor(wy/this.world.s);
    if(x > this.world.w || x < 0 || y > this.world.h || y < 0) return;  //bail if out of bounds
    this.currentBlock = this.grid[y][x];
  
  }
  draw(canvas) {
    var camera = this.camera;
    var world1 = this.world;
    camera.offset = {x: canvas.width/2, y: canvas.height/2};
    var xmin = -canvas.width/2 + world1.s*this.zoom;
    var xmax = canvas.width/2 + (world1.w-1)*world1.s*this.zoom;
    var ymin = -canvas.height/2 + world1.s*this.zoom;
    var ymax = canvas.height/2 + (world1.h-1)*world1.s*this.zoom;
    if(camera.x<xmin) camera.x = xmin;
    if(camera.x>xmax) camera.x = xmax;
    if(camera.y>ymax)camera.y = ymax;
    if(camera.y<ymin)camera.y = ymin;  
    var camera = this.camera;
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));
    canvas.scale(this.zoom,this.zoom);
    canvas.strokeStyle = 'black';
    canvas.lineWidth = 10;
    canvas.strokeRect(0,0,world1.w*world1.s,world1.h*world1.s);
    this.world.draw(canvas,true);
    canvas.restore();
    var mouse = this.driver.mouse;

    //canvas.fillStyle='#fff';
    canvas.fillStyle = 'rgba(255,255,255,0.85)';

    canvas.beginPath();
    canvas.rect(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5);
    canvas.fill();
    canvas.stroke();
    
    canvas.fillStyle='#000';
    canvas.fillText("[" + CELLMAP[this.currentBlock].name + "]", canvas.width/5, canvas.height/1.1-100);
    canvas.fillText("[Wall Jump: " + this.playerAbility[0] + "   Double Jump: " + this.playerAbility[1]+ "]", canvas.width/1.5, canvas.height/1.1-100);
    
  /*
'32': {down: this.startDragging.bind(this), held: this.drag.bind(this)},
      '75': {down: this.runTest.bind(this)},    //K
      //'80': {down: this.printLevel.bind(this)},
      '65': {down: this.cycleBlockBackwards.bind(this)},//S
      '68': {down: this.cycleBlock.bind(this)},         //W
      '69': {down: this.cycleAbility.bind(this)},       //E
      '84': {down: this.zoomIn.bind(this)},             //T
      '71': {down: this.zoomOut.bind(this)},            //G
      '73': {down: this.growi.bind(this)},              //I
      '74': {down: this.growj.bind(this)},              //J
      '27': {down: this.backToSelect.bind(this)},       //Escape
      '88': {down: this.openBlockSelect.bind(this)},    //X
      '66': {down: this.resetCameraPosition.bind(this)},//B

      '82': {down: this.gridScrollUp.bind(this)},     //R
      '70': {down: this.gridScrollDown.bind(this)},   //F
      '69': {down: this.selectAir.bind(this)},        //D
      '72': {down: this.toggleCommandList.bind(this)},//H
  */
    canvas.font = "20px Noteworthy";
    canvas.textAlign = 'left';
    if(this.showCommands){
      var origin = {x:0.02,y:0.1};
      var gap = 0.04;
      var text = [
        "[H] - Toggle Command List",
        "[W] - Cycle block forward",
        "[S] - Cycle block backward",
        "[E] - Cycle abilities",
        "[A] - Block Picker",
        "[R] - Scroll Block Select Up",
        "[F] - Scroll Black Select Down",
        "[T] - Zoom In",
        "[G] - Zoom Out",
        "[D] - Select Erase (Air)",
        "[1/2/3/4] - Quick select",
        "[K] - Test Level",
        "[B] - Reset Camera",
        "[I] - Grow I",
        "[J] - Grow J",
        "[P] - Print as String",

      ];
      for(var i = 0; i < text.length; i++){
        canvas.fillStyle = 'rgba(255,255,255,0.75)';
        canvas.fillRect(origin.x*canvas.width,
          (origin.y+i*gap-gap/2)*canvas.height,300,gap*canvas.height);
        canvas.fillStyle = 'black';
        canvas.fillText(text[i],origin.x*canvas.width,
          (origin.y+i*gap)*canvas.height,1600);
      }
    } else {
      canvas.fillText("[H] - Help",canvas.width*0.02,canvas.height*0.1,1600);
    }
    canvas.textAlign = 'center';
    this.drawAllGUI(canvas);
    this.drawBlockAtCursor(canvas);
    if(mouse.held && this.clickDragPivot != undefined) {
      canvas.strokeStyle = "rgba(0,100,0,1)";
      canvas.fillStyle = "rgba(0,255,0,.5)";
      canvas.beginPath();
      var tx = this.clickDragPivot.x*this.zoom;
      var ty = this.clickDragPivot.y*this.zoom;
      canvas.rect(tx, ty, -tx+mouse.x, -ty+mouse.y);
      canvas.fill();
      canvas.stroke();
    }
  }
}