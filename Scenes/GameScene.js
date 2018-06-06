
class GameScene extends Scene {
  constructor(level, dontSpawnPig,playIntro) {
    super(playIntro);
    this.dontSpawnPig=dontSpawnPig;
    this.player = new Player();
    this.entities = [];
    this.behinds=[];    
    this.addEntity(this.player);
    var p1controls = connectControls(Player.controls, this.player);
    this.p1controls = p1controls;
    this.gamePadOn = true;
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
      69: p1controls.dash,
      78: {down: function() {
        if(this.keys[67]) {
          this.loadNewLevel(this.levelIndex+1);
        }
      }.bind(this)},
      66: {down: function() {
        if(this.keys[67]) {
          this.loadNewLevel(this.levelIndex-1);
        }
      }.bind(this)},
    }
    this.camera = {x:0,y:0,dx:0,dy:0,speed:10};
    
    // this.world = new World(200,50,50);

    this.inTransition = false;
    this.transitionDirection = -1;
    this.overlayColor = "rgba(0,0,0,0)";
    this.transitionTimer = 25.0;
    this.transitionDuration = 25.0;

    if(level) {
      this.levels = [level];
    } else {
      this.levels = createLevels();
    }
    this.levelIndex = 0;
    this.levelCompleted = false;
    this.loadNewLevel(0);
    this.shouldFillAroundWorld = true;    
    // this.level = this.levels[0];
    // this.world = new WorldFromLevel(this.level);
    // this.addEntity(new Pig(this.world.w*this.world.s-200,100));  
    // this.addEntity(new Enemy(300,100));
    this.screenShakeLevel=0;
    this.totalDeaths = 0;
    this.levelDeaths = 0;
    this.constrainCamera();
    this.frameStop = 0;
  }
  addEntity(entity) {
    entity.game = this;
    this.entities.push(entity);
  }
  collidesWithPlayer(entity) {
		var entityBox = entity.getHitBox();
		var playerBox = this.player.getHitBox();
		return rectangleCollision(entityBox, playerBox);
  }
  playLevelIntro(){
    this.startTransition(25,-1,undefined);
  }
  playLevelOutro(){
    var win = this.levelIndex+1>=this.levels.length;
    if(this.music) {
      // this.music.pause();
    }
    if(this.pig)
    this.driver.setScene(new LevelCompleteScene(this, () => {
      // this.startTransition(25, 1, function() { 
        if(this.levelIndex+1 >= this.levels.length) {
          this.win();
        } else {
          this.loadNewLevel(this.levelIndex+1);
          this.driver.setScene(new LevelIntroScene(this,true));
        }
      // });
    }, win));
    else {
       this.startTransition(25, 1, function() { 
        if(this.levelIndex+1 >= this.levels.length) {
          this.win();
        } else {
          this.loadNewLevel(this.levelIndex+1);
          this.driver.setScene(new LevelIntroScene(this,true));
        }
      });
    }
  }
  pause() {
    this.driver.setScene(new PauseScene(this));
  }
  moveCamera(targetX,targetY) {
    var target = {x:targetX,y:targetY};
    var camera = this.camera;
    var a = target.y-camera.y;
    a = a*a;
    var b = target.x-camera.x;
    b = b*b;
    var distance = Math.sqrt(a+b);
    if(camera.speed >= distance){
      camera.x = targetX;
      camera.y = targetY;
    }
    var directionToPoint = Math.atan2(target.y-camera.y,target.x-camera.x);
    var displace = circleMove(directionToPoint,camera.speed);
    camera.x += circleMoveX(directionToPoint,camera.speed);
    camera.y += circleMoveY(directionToPoint,camera.speed);

    this.constrainCamera();
  }
  followPlayer(){
    var camera = this.camera;
    var player = this.player;
    var canvas = this.canvas;
    // if(player.mx) {
      var cdx = (player.x-camera.x+camera.dx)/10;
      if(Math.abs(cdx)>3)camera.x += cdx;
      // camera.x += (player.x-camera.x+camera.dx)/10;
    // }
    // camera.x = linearMove(camera.x, (player.x + camera.dx), 5);    

    // var cdy = (player.y-camera.x+camera.dy-30)/10;
    // if(Math.abs(cdy)>3)camera.y += cdy;
    camera.y += (player.y-camera.y-30)/30;
    if(player.grounded) camera.y += (player.y-camera.y-30)/20;
    var d = 0;
    if(player.vy>0 && camera.y < player.y - 30) camera.y += (player.y-camera.y-30)/10;
    if(player.crouching&&player.grounded) camera.dy += 1; else camera.dy=0;
    if(camera.dy>60)camera.dy=60;
    if(camera.dy>10) camera.y+=(camera.dy-10)/3;
    //make the camera point more towards the direction
    //that the player is moving in so they can see ahead
    if(player.mx!=0) {
      // camera.dx = linearMove(camera.dx, (player.mx * 100), 5);
    }
    this.constrainCamera();
  }
  constrainCamera(x,y,w,h){
    var camera = this.camera;
    var canvas = this.canvas;
    if(!canvas)return;
      var world1 = this.world;
    if(x == undefined || y == undefined || w == undefined || h == undefined){
      camera.x = constrain(camera.x,canvas.width/2,world1.w*world1.s-canvas.width/2);
      camera.y = constrain(camera.y,canvas.height/2,world1.h*world1.s-canvas.height/2);
    } else {
      camera.x = constrain(camera.x,x+canvas.width/2,x+w-canvas.width/2);
      camera.y = constrain(camera.y,y+canvas.width/2,y+h-canvas.width/2);
      this.constrainCamera();
    }
  }

  detectLevelComplete() {
    if(this.player.x/this.world.s >= this.world.w-2&&this.player.grounded) {
      this.loadNewLevel(this.levelIndex+1);
    }
  }
  levelComplete() {
    if(this.player.dead)return;
    if(!this.levelCompleted) {
      this.levelCompleted = true;
      this.playLevelOutro();
    }
  }
  
  win() {
    this.driver.setScene(new PostWinScene(this));    
  }
  loadNewLevel(index) {   
    if(index<0)index=0;
    this.butcher = null;
    this.kingByrd = null;
    var same = false;
    var entities = this.entities;
    if(index==undefined) {
      same=true;
    } else {
      this.levelIndex = index;
      this.levelDeaths = 0;
      if(this.music) {
        this.music.resume();
      } else
      this.music = SOUNDMAP.music.play(); 
    }
    if(this.levelIndex>=this.levels.length) {
      this.win();
      return;
    }
    var level = this.levels[this.levelIndex];
    if(!same)
      this.world = new WorldFromLevel(level, this.levelIndex);
    this.player.reset();
    this.entities = [];    
    //this.addEntity(new Byrd(100,400));
    this.world.loadWorld(this);
    this.entities.push(this.player);
    this.initializeLevel(level);
    // this.behinds.forEach(function (e){
    //   entities.unshift(e);
    // });
    // this.behinds=[];
    if(level.modifyPlayer) {
      level.modifyPlayer(this.player);
    }
    this.level=level;
    this.camera.x=this.player.x;
    this.camera.y=this.player.y;
    this.constrainCamera();

    //if(!this.dontSpawnPig) {
    //  this.pig = new Pig(this.world.w*this.world.s-200,100);
    //  this.addEntity(this.pig);
    //}
    // this.addEntity(new Enemy(300,100));  
    this.playLevelIntro();
    this.levelCompleted = false;
    /*
    var text = new WorldText(800,600,300,"TEXT HERE",'60px Noteworthy',[0,0,0,0],[0,0,0,1],
      100,false)
    this.entities.push(text);
    var trigger = new TriggerZone(800,700,100,100,this.player,text.appear.bind(text),undefined,text.disappear.bind(text),true);
    this.entities.push(trigger);
    */
  }
  initializeLevel(level){
    if(level.init){
      level.init(this);
    }
  }
  respawn() {
    this.totalDeaths++;
    this.levelDeaths++;
    // console.log(this.deaths);
    this.loadNewLevel();
  }
  musicFadeOnPig() {
    var pig = this.pig;
    var player = this.player;
    if(!this.music) this.music = SOUNDMAP.music.play();
    if(pig&&player) {
      var r = distanceBetweenEntities(pig, player);
      if(r<500) {
        SOUNDMAP.music.setVolume(r/500);     
        if(r<100) {
          this.musicFaded = true;
          this.musicTime = this.music.getTime();
          this.music.pause();
        } else {
          if(this.musicFaded)
          this.music.resume(this.musicTime);
          this.musicFaded=false;          
        }
      } else {
        if(this.music) {
          if(this.musicFaded)
          this.music.resume(this.musicTime);
          this.musicFaded=false;          
        }
        this.musicTime = this.music.getTime();
        SOUNDMAP.music.setVolume(1);
      }
    }
  }
  update(dt, frameCount) {
    this.musicFadeOnPig();
    this.player.resetControls();
    var entities = this.entities;
    super.update(dt);
    if(this.gamePadOn) {
      handleGamePad(this.player);
    }
    if(this.frameStop>0) {
      // this.frameStop -= 1;
      // this.followPlayer();   
      // this.updateScreenShakeLevel();         
      // return;
      this.frameStop-=0.1;
      var t = this.frameStop;
      dt = dt * (1 - 0.8 * t/5)
    }
    for(var i=0;i<entities.length;i+=1) {
      var entity = entities[i];
      entity.update(dt, frameCount);
      if(entity.shouldDelete) {
        entities.splice(i--,1);
      }
    }
    entities = this.entities;
    this.behinds.forEach(function (e){
      entities.unshift(e);
    });
    this.behinds=[];
    // this.entities = this.entities.sort(function(a,b) {
    //   return -b.behind;
    // })
    this.followPlayer();

    

    // this.detectLevelComplete();
    this.updateScreenShakeLevel();
    // this.screenShakeLevel -= this.screenShakeLevel/10;
  }
  updateScreenShakeLevel() {
    this.screenShakeLevel = linearMove(this.screenShakeLevel, 0, .05);    
  }
  draw(canvas) {
    if(!this.canvas) {
      this.canvas = canvas;
      this.constrainCamera();
    }
    var camera = this.camera;
    canvas.clearRect(0,0,canvas.width,canvas.height);
    this.doScreenShake(canvas);    
    
    
    // canvas.translate(-canvas.width/2,-canvas.height/2);      

    // canvas.translate(canvas.width/2,canvas.height/2);  
  
    canvas.save();
    this.world.drawBackground(canvas, this.camera);    
    if(this.shouldFillAroundWorld) {
      this.fillAroundWorld(canvas);
    }

    canvas.translate(canvas.width/2,canvas.height/2);  
    canvas.rotate(camera.r);
    
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
    drawTransitionOverlay(this.overlayColor,canvas);
    
  }

  fillAroundWorld(canvas) {
    if(this.world.image) {
      var cameraOffsetY = canvas.height/2-Math.floor(this.camera.y);
      canvas.fillStyle="black";          
      canvas.fillRect(0,this.world.image.height+cameraOffsetY,this.world.image.width,1000);  
      canvas.fillRect(0,-1000+cameraOffsetY,this.world.image.width,1000);    
    }
  }
  doScreenShake(canvas) {
    if(this.screenShakeLevel==0) {
      return this.camera.r = 0;
    }
    var x = Math.cos(this.driver.frameCount*Math.PI/3)*this.screenShakeLevel*10;
    var y = Math.sin(this.driver.frameCount*Math.PI/3)*this.screenShakeLevel*10;
    var r = Math.cos(this.driver.frameCount*Math.PI/4)*this.screenShakeLevel*Math.PI/80;
    // canvas.translate(x,y);
    this.camera.x+=x;
    this.camera.y+=y;
    this.camera.r=r;
    // canvas.rotate(r);
  }
  
  collidesWithPlayer(entity) {
    var h1 = entity.getHitBox();	// Perforamnce effeciency issue
    var playerBox = this.player.getHitBox();
		return rectangleCollision(h1, playerBox);
  }
  
}
