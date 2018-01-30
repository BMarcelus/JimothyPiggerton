
class GameScene extends Scene {
  constructor() {
    super();
    this.player = new Player();
    this.entities = [];
    this.addEntity(this.player);
    var p1controls = connectControls(Player.controls, this.player);
    this.keyMap = {
      68: p1controls.right,
      87: p1controls.up,
      65: p1controls.left,
      83: p1controls.down,

      37: p1controls.left,
      38: p1controls.up,
      39: p1controls.right,
      40: p1controls.down,

      32: p1controls.up,

      27: {down: this.pause.bind(this)},
      69: {down: function() {
        this.player.vx += 30 * (1-2*this.player.flipped);
      }.bind(this)}
    }
    this.camera = {x:0,y:0,dx:0};
    // this.world = new World(200,50,50);
    this.levels = createLevels();
    this.levelIndex = 0;
    this.level = this.levels[0];
    this.world = new WorldFromLevel(this.level);
    this.addEntity(new Pig(this.world.w*this.world.s-200,100));  
    this.addEntity(new Enemy(300,100));
    this.shouldFillAroundWorld = true;
  }
  addEntity(entity) {
    this.entities.push(entity);
    entity.game = this;
  }
  pause() {
    this.driver.setScene(new PauseScene(this));
  }
  moveCamera() {
    var camera = this.camera;
    var player = this.player;
    var canvas = this.canvas;
    // if(player.mx) {
      var cdx = (player.x-camera.x+camera.dx)/10;
      if(Math.abs(cdx)>3)camera.x += cdx;
      // camera.x += (player.x-camera.x+camera.dx)/10;
    // }
    // camera.x = linearMove(camera.x, (player.x + camera.dx), 5);    
    camera.y += (player.y-camera.y-30)/10;
    if(player.vy>0) camera.y += (player.y-camera.y-30)/10;
    //make the camera point more towards the direction
    //that the player is moving in so they can see ahead
    if(player.mx!=0) {
      // camera.dx = linearMove(camera.dx, (player.mx * 100), 5);
    }
    if(!canvas)return;
    var world1 = this.world;
    if(camera.x<canvas.width/2)camera.x = canvas.width/2;
    if(camera.x>world1.w*world1.s-canvas.width/2) camera.x = world1.w*world1.s-canvas.width/2;
    if(camera.y>world1.h*world1.s-canvas.height/2)camera.y = world1.h*world1.s-canvas.height/2;
    if(camera.y<canvas.height/2)camera.y = canvas.height/2;    
  }
  detectLevelComplete() {
    if(this.player.x/this.world.s >= this.world.w-2&&this.player.grounded) {
      this.loadNewLevel();
    }
  }
  loadNewLevel(same) {
    this.levelIndex = this.levelIndex+1;
    if(this.levelIndex>=this.levels.length) {
      this.driver.setScene(new WinScene());
      return;
    }
    var level = this.levels[this.levelIndex];
    if(!same)
    this.world = new WorldFromLevel(level);
    this.player.reset();
    if(level.modifyPlayer) {
      level.modifyPlayer(this.player);
    }
    this.level=level;
    this.camera.x=this.player.x;
    this.camera.y=this.player.y;
    this.entities = [this.player];
    this.addEntity(new Pig(this.world.w*this.world.s-200,100));     
  }
  respawn() {
    this.levelIndex-=1;
    this.loadNewLevel(true);
  }
  update(dt, frameCount) {
    this.player.resetControls();
    var entities = this.entities;
    super.update(dt);for(var i=0;i<entities.length;i+=1) {
      var entity = entities[i];
      entity.update(dt, frameCount);
      if(entity.shouldDelete) {
        entities.splice(i--,1);
      }
    }
    this.moveCamera();
    this.detectLevelComplete();
  }
  draw(canvas) {
    if(!this.canvas) {
      this.canvas = canvas;
    }
    var camera = this.camera;
    canvas.clearRect(0,0,canvas.width,canvas.height);
    this.world.drawBackground(canvas, this.camera);    
    if(this.shouldFillAroundWorld) {
      this.fillAroundWorld(canvas);
    }
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);  
    // canvas.scale(.5,.5);  
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));

    
    this.world.draw(canvas);
    for(var i=0;i<this.entities.length;i+=1) {
      var entity = this.entities[i];
      entity.draw(canvas);
    }
    canvas.restore();
    if(this.level.name) {
      canvas.fillStyle='#fff';
      canvas.fillText(this.level.name, 200, canvas.height-30);
    }
  }
  fillAroundWorld(canvas) {
    if(this.world.image) {
      var cameraOffsetY = canvas.height/2-Math.floor(this.camera.y);
      canvas.fillStyle="black";          
      canvas.fillRect(0,this.world.image.height+cameraOffsetY,this.world.image.width,1000);  
      canvas.fillRect(0,-1000+cameraOffsetY,this.world.image.width,1000);    
    }
  }
}