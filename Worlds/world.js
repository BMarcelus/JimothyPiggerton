
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
  
  return world;
}
function randomizeWorld(world, width,height) {
  var x = 1; var y = 1;
    var dx = 1;
    var dy = 0;
    for(var i=0;i<10000;i++) {
      world[y][x] = 0;
      x+=dx;
      y+=dy;
      if(x<1)x = 1;
      if(y<1)y = 1;
      if(x>width-2) x = width-2;
      if(y>height-2) y = height-2;
      if(Math.random()>.8) {
        var d = Math.floor(Math.random()*2)*2-1;
        if(Math.random()>.5) {
          dx = d;
          dy = 0;
        } else {
          dy = d;
          dx = 0;
        }
      }
    }
}
class World {
  constructor() {
    this.background = new Background();    
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
  drawBackground(canvas, camera) {
    this.background.draw(canvas, camera);
  }
}

class WorldDefault extends World {
  constructor(w,h,s) {
    this.w=w;
    this.h=h;
    this.s=s;
    this.world = makeWorld(w,h);
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
