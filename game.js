function linearMove(a,b,s) {
  if(Math.abs(a-b)<=s)return b;
  if(a>b)return a-s;
  if(a<b)return a+s;
}
class Cloud {
  constructor(x,y,w,h,vx,vy,life) {
    this.x=x;this.y=y;this.w=w;this.h=h;this.vx=vx;this.vy=vy;
    this.life = life||10;
    this.maxlife = this.life;
  }
  update() {
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
      return;
    }
    this.x+=this.vx;
    this.y+=this.vy;
  }
  draw(canvas) {
    canvas.save();
    canvas.fillStyle = "rgba(200,200,200,.4)";
    canvas.globalAlpha = this.life/this.maxlife;
    var w = this.w + (this.maxlife-this.life);
    var h = w;
    canvas.translate(this.x,this.y);
    canvas.fillRect(-w/2,-h,w,h);
    canvas.restore();
  }
}

class Mover {
  constructor(x,y) {
    this.x = x||10;
    this.y = y||10;
    this.w = 25;
    this.h = 35;
    this.width = this.w;
    this.height = this.h;
    this.vx = 0;
    this.vy = 0;
    this.grav = .8;
    this.mx = 0;
    this.my = 0;
    this.speed = 10;
    this.grounded = false;
    this.jumpPower = 14;
    this.flipped = false;
    this.color = "#000";
    this.cloudParticlesOn = true;
    this.wallcolliding = false;
    this.maxJumps = 1;
    this.jumpCount = 0;
    this.angle = 0;
    this.terminalVelocity = 20;
    this.mover = true;
    this.wallSlides = true;
    this.wallJumps = false;
    this.groundAccel = 2;
  }
  update(dt, frameCount) {
    if(this.mx>1)this.mx=1;
    if(this.mx<-1)this.mx=-1;
    if(this.my>1)this.my=1;
    if(this.my<-1)this.my=-1;
    if(this.mx){
      this.flipped=this.mx<0;
      if(!this.wallcolliding&&this.cloudParticlesOn&&this.grounded&&!this.crouching&&(frameCount%20==0||this.vx*this.mx<=0||Math.abs(this.vx)<1)) {
        for(var i=0;i<3;i++) {
          this.game.addEntity(new Cloud(this.x-this.mx*i*5,this.y+Math.random(),5+i*2,10,-this.mx,0,10+i*2));
        }
      }
    }
    if(this.crouching&&this.grounded) {
      this.vx -= this.vx / 10;
      this.mx = 0;
    } else {
      // this.vx += (this.mx*this.speed-this.vx)/3;     
      this.vx = linearMove(this.vx, this.mx*this.speed, this.groundAccel); 
    }
    this.vy += this.grav;
    if(this.vy>this.terminalVelocity)this.vy = this.terminalVelocity;
    // this.x += this.vx;
    // this.y += this.vy;
    this.safeMove(this.vx,this.vy);
    // staticWorldCollide(this);
    // safeMoveOnWorld(this,this.vx,this.vy);
    var maxHeight = this.game.world.h*this.game.world.s+200;
    if(this.y > maxHeight) {
      this.groundCollide(maxHeight);
    }
    if(this.wallCollideTimer>0)this.wallCollideTimer-=1;
    if(this.vy>0) {
      this.grounded = false;
      if(this.wallcolliding) {
        if(this.wallJumps&&this.wallSlides)this.vy = this.vy * .8;
        if(this.wallJumps)this.wallCollideTimer = 10;
      } else if(this.wallCollideTimer>0&&this.mx!=0&&((this.mx>0)==this.walldirection)) {
        this.wallCollideTimer=0;
      }
    }
    // if(this.wallCollideTimer>0) {
    //   this.x -= this.vx;
    // }
    if(this.vy>this.grav*5&&this.jumpCount==0)this.jumpCount=1;    
    if(this.jumpCount>1) {
      this.angle += Math.PI/10*(1-2*this.flipped);
    } else if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching) {
      // this.angle = (Math.cos(this.x/this.speed*10*Math.PI/70)*Math.PI/20-Math.PI/40*(this.vx/this.speed));
      this.angle = -Math.PI/40*this.vx/this.speed + Math.cos(frameCount*Math.PI/7)*Math.PI/20;
    } else {
      this.angle = 0;
    }
    if(this.crouching) {
      this.width += (this.w*1.2-this.width)/2;
      this.height += (this.h*.6-this.height)/2;
    } else {
      this.width += (this.w-this.width)/2;
      this.height += (this.h-this.height)/2;
    }
  }
  safeMove(vx,vy) {
    var world = this.game.world;
    var w = this.w;
    var h = this.h;
    if(!world.rectCollides(this.x-w/2+vx, this.y-h+1,w,h-2,this)) {
      this.x += vx;
      this.wallcolliding=false;
    } else {
      if(this.vx>0) {
        this.x = Math.floor((this.x+w/2+vx)/world.s)*world.s-w/2-1;
      } else if(this.vx<0){
        this.x = Math.floor((this.x-w/2+vx)/world.s+1)*world.s+w/2+1;
      }
      this.walldirection = this.vx>0;
      this.vx = 0;
      this.wallcolliding=true;
    }
    if(world.rectCollides(this.x-w/2,this.y-h+vy,w,h,this)) {
      if(this.vy>0) {
        this.groundCollide(Math.floor((this.y+vy)/world.s)*world.s);
      } else {
        this.y = (Math.floor((this.y+vy-h)/world.s+1)*world.s)+h;
        this.vy = 0;
      }
    } else {
      this.y += this.vy;
    }
  }
  groundCollide(y) {
    this.y = y;
    this.vy = 0;
    if(!this.grounded) {
      this.width += 20;
      this.height -= 20;
      if(!this.crouching)
      this.vx = 0;
      if(this.cloudParticlesOn) {
        for(var i=0;i<6;i++) {
          this.game.addEntity(new Cloud(this.x,this.y-Math.random()*5,3+Math.random(),10,3*Math.random()-3*Math.random(),0));
        }
      }
    }
    this.grounded = true;
    this.jumpCount = 0;
  }
  draw(canvas) {
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching) {
      canvas.translate(0,-(Math.sin(this.x/this.speed*10*Math.PI/70)+1)*3)
    }
    if(this.jumpCount>1) {
      canvas.translate(0,-h/2);      
    }
    canvas.rotate(this.angle);
    canvas.fillStyle = this.color;
    if(this.jumpCount>1) {
      canvas.translate(0,h/2);      
    }
    canvas.fillRect(-w/2,-h, w,h);
    canvas.restore();
  }
  jump() {
    // if(!this.grounded)return;
    if(this.wallCollideTimer>0&&this.wallJumps) {
      return this.wallJump();
    }
    if(this.jumpCount>=this.maxJumps)return;
    this.jumpCount++;
    this.vy = -this.jumpPower;
    this.grounded = false;
    this.height += 10;
    this.width -= 10;
    if(this.cloudParticlesOn) {
      for(var i=0;i<3;i++) {
        this.game.addEntity(new Cloud(this.x-i*5,this.y,5+i*2,10,-2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x+i*5,this.y,5+i*2,10,2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x-6+i*3,this.y,5,10,-1+i,0,5+i*2));
      }
    }
  }
  wallJump() {
    this.vy = -this.jumpPower;
    this.grounded = false;
    this.height += 10;
    this.width -= 10;
    if(this.cloudParticlesOn) {
      for(var i=0;i<3;i++) {
        this.game.addEntity(new Cloud(this.x-i*5,this.y,5+i*2,10,-2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x+i*5,this.y,5+i*2,10,2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x-6+i*3,this.y,5,10,-1+i,0,5+i*2));
      }
    }
    this.vx = 12*(1-2*this.walldirection);
    this.wallcolliding=0;
    this.wallCollideTimer=0;
  }
  shortJump() {
    if(!this.grounded&&this.jumpCount==1&&this.vy<0) {
      this.vy = this.vy/2;
    }
  }
  crouch() {
    this.crouching = true;
    if(!this.grounded&&this.vy>0) this.vy += 10;
  }
  uncrouch() {
    this.crouching = false;
  }
}
class Player extends Mover{
  constructor() {
    super();
    this.x = 100;
    this.y = 100;
    this.speed = 10;
    this.mx = 0;
  }
  die() {
    this.game.respawn();
  }
  resetControls() {
    this.mx = 0;
  }
  update(dt, frameCount){
    super.update(dt, frameCount);
  }
  draw(canvas){
    super.draw(canvas);
  }
  reset() {
    this.x=60;
    this.y=100;
    this.vx=0;
    this.vy=0;
    this.maxJumps=1;
    this.wallJumps=false;
  }
}
Player.controls = {
  right: {held: function() { this.mx += 1; }},
  left: {held: function() { this.mx -= 1; }},
  up: {down: function() { this.jump(); }, up: function() { this.shortJump(); }},
  down: {down: function() { this.crouch(); }, up: function() { this.uncrouch(); }},
}


class Pig extends Mover {
  constructor(x,y) {
    x+=70;
    super(x,y);
    this.color = "pink";
    this.w = 25;
    this.h = 20;
    this.width = this.w;
    this.height = this.h;
    this.speed = 3;
    this.cloudParticlesOn=false;
    this.mx = 1;
    this.groundAccel=1;
    this.tx = x;
    this.ty = y;
    this.turnTime = 50;
    this.turnCounter = this.turnTime;
  }
  update(dt, frameCount) {
    if(this.x > this.tx+50) this.mx = -1;
    if(this.x < this.tx-50) this.mx = 1;
    if(this.turnCounter<=0||this.wallcolliding) {
      this.turnCounter = this.turnTime;
      this.mx = -this.mx;
    }
    super.update(dt, frameCount);
  }
}

function connectControls(controls, obj) {
  var result = {};
  for(var i in controls) {
    result[i] = {};
    for(var j in controls[i]) {
      result[i][j] = controls[i][j].bind(obj);
    }
  }
  return result;
}


function makeWorld(width, height) {
  var world = [];
  for(var j=0;j<height;j++) {
    var row = [];
    for(var i=0;i<width;i++) {
      if(i==0||j==0||i==width-1||j==height-1||Math.random()>.9)row.push(1);
      else row.push(0);
      // row.push(1);
    }
    world.push(row);
  }
  // var x = 1; var y = 1;
  // var dx = 1;
  // var dy = 0;
  // for(var i=0;i<10000;i++) {
  //   world[y][x] = 0;
  //   x+=dx;
  //   y+=dy;
  //   if(x<1)x = 1;
  //   if(y<1)y = 1;
  //   if(x>width-2) x = width-2;
  //   if(y>height-2) y = height-2;
  //   if(Math.random()>.8) {
  //     var d = Math.floor(Math.random()*2)*2-1;
  //     if(Math.random()>.5) {
  //       dx = d;
  //       dy = 0;
  //     } else {
  //       dy = d;
  //       dx = 0;
  //     }
  //   }
  // }
  return world;
}
class World {
  constructor(w,h,s) {
    if(!w)return;
    this.w=w;
    this.h=h;
    this.s=s;
    this.world = makeWorld(w,h);
  }
  draw(canvas) {
    if(this.image) {
      canvas.drawImage(this.image,0,0);
      return;
    }
    this.image = document.createElement('canvas');
    this.image.width = this.w*this.s;
    this.image.height = this.h*this.s;
    var ctx = this.image.getContext('2d');
    var s = this.s;
    var world = this.world;
    for(var i=0;i<this.w;i++) {
      for(var j=0;j<this.h;j++) {
        var type = world[j][i];
        if(type == 1) ctx.fillStyle='#000';
        else if(type == 2) ctx.fillStyle='#f00';
        if(type) {
          ctx.fillRect(s*i,s*j, s,s);
        }
      }
    }
    canvas.drawImage(this.image,0,0);    
  }
  oob(x,y) {
    return x<0||y<0||x>=this.w||y>=this.h;
  }
  wallExists(x,y) {
    return this.oob(x,y) || this.world[y][x];
  }
  pointCollides(x,y,entity) {
    var type = this.wallExists(Math.floor(x/this.s), Math.floor(y/this.s));
    // this.entityCollision(entity, type);
    return type;
  }
  rectCollides(x,y,w,h,entity) {
    var points = [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
    var types = {};
    for(var i in points) {
      var x1 = points[i][0];
      var y1 = points[i][1];
      var type = this.pointCollides(x1,y1);
      if(type == 1) return true;
      else types[type] = true;
    }
    for(var i in types) {
      this.entityCollision(entity, i);
    }
    // return this.pointCollides(x,y,entity) +
    //   this.pointCollides(x+w,y,entity) +
    //   this.pointCollides(x,y+h,entity) +
    //   this.pointCollides(x+w,y+h,entity);
  }
  entityCollision(entity, type) {
    if(type==2) {
      entity.die();
    }
  }
}

class WorldFromLevel extends World {
  constructor(level) {
    super();
    this.s = 40;
    var grid = level.grid;
    this.world = grid;
    this.h = grid.length;
    this.w = grid[0].length;
  }
}

class GameDriver extends Scene {
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
    }
    this.camera = {x:0,y:0,dx:0};
    // this.world = new World(200,50,50);
    this.levels = createLevels();
    this.levelIndex = 0;
    this.level = this.levels[0];
    this.world = new WorldFromLevel(this.level);
    this.addEntity(new Pig(this.world.w*this.world.s-200,100));    
    this.background1 = this.createBackground(60, "#888");
    this.background2 = this.createBackground(100, "#666");
  }
  addEntity(entity) {
    this.entities.push(entity);
    entity.game = this;
  }
  pause() {
    this.driver.setScene(new PauseScreen(this));
  }
  moveCamera() {
    var camera = this.camera;
    var player = this.player;
    var canvas = this.canvas;
    // if(Math.abs(player.x-camera.x+camera.dx)>60) {
      camera.x += (player.x-camera.x+camera.dx)/10;
    // }
    // if(Math.abs(camera.y-player.y)>10) {
    camera.y += (player.y-camera.y-30)/10;
    if(player.vy>0) camera.y += (player.y-camera.y-30)/10;
    // camera.dx = 0;
    // if(player.vx>0&&player.x > camera.x-camera.dx+50) camera.dx = 100;
    // if(player.vx<0&&player.x < camera.x-camera.dx-50) camera.dx = -100;
    if(player.mx!=0)
    camera.dx = linearMove(camera.dx, (player.mx * 100), 5);
    // else camera.dx = -camera.dx/50;
    if(player.mx!=0) {
      // camera.x += (player.x-camera.x+player.mx*100)/10;
    }
    // if(player.mx==0) camera.dx = 0;
    // }
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
      this.driver.setScene(new WinScreen());
      return;
    }
    var level = this.levels[this.levelIndex];
    this.world = new WorldFromLevel(level);
    this.player.reset();
    if(level.modifyPlayer) {
      level.modifyPlayer(this.player);
    }
    this.level=level;
    if(!same) {
      this.background1 = this.createBackground(60, "#888");
      this.background2 = this.createBackground(100, "#666");
    }
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
    this.drawBackground(canvas);  
    canvas.fillStyle="black";
    if(this.world.image)
    canvas.fillRect(0,this.world.image.height,1000,1000);      
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
  drawBackground(canvas) {
    var camera = this.camera;    
    canvas.save();
    // canvas.translate(canvas.width/2,canvas.height/2);
    canvas.translate(-camera.x/4,-camera.y/4);
    canvas.fillStyle = '#888';
    // canvas.fillRect(100,100,80,500);
    // canvas.fillRect(260,200,80,500);  
    canvas.drawImage(this.background1,-150,-50);     
    canvas.fillStyle = '#666';      
    canvas.translate(-camera.x/4,-camera.y/4);
    // canvas.fillRect(100,200,100,500);
    // canvas.fillRect(300,300,100,500);   
    canvas.drawImage(this.background2,-150,0); 
    canvas.restore();
  }
  createBackground(w,c) {
    return createCityRuinBackground(w,c);
  }
}

function createForrestBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  500;
  canvas.fillStyle = c;
  for(var i=0;i<image.width;i+=w) {
    var ww = w/3;
    canvas.fillRect(i+w/2-ww/2, 200, ww, 400);
    canvas.beginPath();
    for(var j=0;j<250;j+=ww) {
      canvas.moveTo(i+w/2-ww, 200+j);
      canvas.lineTo(i+w/2+ww, 200+j);
      canvas.lineTo(i+w/2, 200+j-ww*2);
      canvas.fill();
    }
  }
  return image;
}

function createSpikeBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  500;
  canvas.fillStyle = c;
  for(var i=0;i<image.width;i+=w) {
    var ww = w/3;
    canvas.fillRect(i+w/2-ww/2, 200, ww, 400);
    canvas.beginPath();
    canvas.moveTo(i+w/2-ww, 200);
    canvas.lineTo(i+w/2+ww, 200);
    canvas.lineTo(i+w/2, 200- ww*2);
    canvas.fill();
  }
  return image;
}

function createCityRuinBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  1000;
  canvas.fillStyle = c;    
  for(var i=0;i<image.width;i+=w) {
    canvas.fillRect(i, Math.floor(Math.random()*40)*5+400, w, 400);
  }
  for(var i=0;i<350;i++) {
    canvas.clearRect(Math.random()*image.width, Math.random()*image.height, Math.random()*50, Math.random()*50);
  }
  return image;
}