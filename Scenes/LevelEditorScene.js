class LevelEditorScene extends Scene{
  constructor() {
    super();
    this.editLevel = -1;
    this.gui = [];
    this.world = new WorldDefault(48, 24);
    if(this.editLevel)
    {
      if (this.editLevel == -1)
      {
        var level = new PigFunScene();
        var grid = level.levels[0].grid;
      }
      else
      {
        var levels = createLevels();
        var grid = levels[this.editLevel].grid;
      }
    }
    else
      var grid = this.load();
    if(grid) {
      this.world.world = grid;
    }
    this.grid = this.world.world;
    this.camera = {x:0,y:0, offset: {x: 0, y: 0}};
    this.keyMap = {
      '32': {down: this.startDragging.bind(this), held: this.drag.bind(this)},
      '82': {down: this.runTest.bind(this)},
      '80': {down: this.printLevel.bind(this)},
      '65': {down: this.cycleBlockBackwards.bind(this)},
      '68': {down: this.cycleBlock.bind(this)},
      '83': {down: this.cycleAbility.bind(this)},
      '73': {down: this.growi.bind(this)},
      '74': {down: this.growj.bind(this)},
    }
    this.dragPivot = {x: 0, y: 0};
    this.clickDragPivot = {x: 0, y: 0};
    this.currentBlock = 1;
    this.playerAbility = [0,0];
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
        string += this.grid[i][j] + ',';
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
    this.clickDragPivot.x = mouse.x;
    this.clickDragPivot.y = mouse.y;
  }
  mouseup(e, mouse) {
    var camera = this.camera;    
    var wx = mouse.x + camera.x - camera.offset.x;
    var wy = mouse.y + camera.y - camera.offset.y;
    var x1 = Math.floor(wx/this.world.s);
    var y1 = Math.floor(wy/this.world.s);

    wx = this.clickDragPivot.x + camera.x - camera.offset.x;
    wy = this.clickDragPivot.y + camera.y - camera.offset.y;
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
    this.world.forceRedraw();
    this.save();
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
  draw(canvas) {
    var camera = this.camera;
    var world1 = this.world;
    camera.offset = {x: canvas.width/2, y: canvas.height/2};
    if(camera.x<canvas.width/2)camera.x = canvas.width/2;
    if(camera.x>world1.w*world1.s-canvas.width/2) camera.x = world1.w*world1.s-canvas.width/2;
    if(camera.y>world1.h*world1.s-canvas.height/2+canvas.height/5)camera.y = world1.h*world1.s-canvas.height/2+canvas.height/5;
    if(camera.y<canvas.height/2)camera.y = canvas.height/2;  
    var camera = this.camera;
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);  
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));
    this.world.draw(canvas,true);
    canvas.restore();
    var mouse = this.driver.mouse;

    canvas.fillStyle='#fff';
    canvas.beginPath();
    canvas.rect(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5);
    canvas.fill();
    canvas.stroke();
    canvas.fillStyle='#000';
    canvas.fillText("'A' - [" + CELLMAP[this.currentBlock].name + "]", canvas.width/5, canvas.height/1.1);
    canvas.fillText("'S' - [Wall Jump: " + this.playerAbility[0] + "   Double Jump: " + this.playerAbility[1]+ "]", canvas.width/1.5, canvas.height/1.1);


    if(mouse.held) {
      canvas.strokeStyle = "rgba(0,100,0,1)";
      canvas.fillStyle = "rgba(0,255,0,.5)";
      canvas.beginPath();
      var tx = this.clickDragPivot.x;
      var ty = this.clickDragPivot.y;
      canvas.rect(tx, ty, -tx+mouse.x, -ty+mouse.y);
      canvas.fill();
      canvas.stroke();
    }
  }
}