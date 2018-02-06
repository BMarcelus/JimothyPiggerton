class LevelEditorScene extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.world = new WorldDefault(48, 24);
    this.grid = this.world.world;
    this.camera = {x:0,y:0, offset: {x: 0, y: 0}};
    this.keyMap = {
      '32': {down: this.startDragging.bind(this), held: this.drag.bind(this)},
      '82': {down: this.runTest.bind(this)},
    }
    this.dragPivot = {x: 0, y: 0};
    this.clickDragPivot = {x: 0, y: 0};
    this.currentBlock = 1;
  }
  getLevel() {
    return {
      name: 'test1',
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
        // this.grid[j][i] = this.currentBlock;
        var t = this.grid[j][i];
        this.grid[j][i] = (t+1)%3;
      }
    }
    this.world.forceRedraw();
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
    if(camera.y>world1.h*world1.s-canvas.height/2)camera.y = world1.h*world1.s-canvas.height/2;
    if(camera.y<canvas.height/2)camera.y = canvas.height/2;  
    var camera = this.camera;
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);  
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));
    this.world.draw(canvas);
    canvas.restore();
    var mouse = this.driver.mouse;
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