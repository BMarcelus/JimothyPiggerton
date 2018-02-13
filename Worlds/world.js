
function makeWorld(width, height) {
  var world = [];
  for(var j=0;j<height;j++) {
    var row = [];
    for(var i=0;i<width;i++) {
      // if(i==0||j==0||i==width-1||j==height-1||Math.random()>.9)row.push(1);
      if(i==0||i==width-1||j==height-1)row.push(1);
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
  forceRedraw() {
    this.image = null;
  }
  draw(canvas) {
    CELLMAP[2].angle += Math.PI/10;
    var s = this.s;
    var world = this.world;
    if(this.image) {
      canvas.drawImage(this.image,0,0);
      for(var i=0;i<this.w;i++) {
        for(var j=0;j<this.h;j++) {
          var type = world[j][i];
          var cell = CELLMAP[type];
          if(cell.draw&&cell.redraws) {
            cell.draw(canvas, s*i,s*j,s,s, this, i,j);
          }
          // if(type == 1) ctx.fillStyle='brown';
          // else if(type == 2) ctx.fillStyle='#fdd';
          // if(type) {
          //   ctx.fillRect(s*i,s*j, s,s);
          // }
        }
      }
      return;
    }
    this.image = document.createElement('canvas');
    this.image.width = this.w*this.s;
    this.image.height = this.h*this.s;
    var ctx = this.image.getContext('2d');
    for(var i=0;i<this.w;i++) {
      for(var j=0;j<this.h;j++) {
        var type = world[j][i];
        var cell = CELLMAP[type];
        if(cell.draw) {
          var c = ctx;
          if(cell.redraws)c = canvas;
          cell.draw(c, s*i,s*j,s,s, this, i,j);
        }
        // if(type == 1) ctx.fillStyle='brown';
        // else if(type == 2) ctx.fillStyle='#fdd';
        // if(type) {
        //   ctx.fillRect(s*i,s*j, s,s);
        // }
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
    var result = false;
    var points = [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
    var types = {};
    for(var i in points) {
      var x1 = points[i][0];
      var y1 = points[i][1];
      var type = this.pointCollides(x1,y1);
      if(type == 1) return true;
      if(type != 0) types[type] = {x: x1, y: y1};
    }
    for(var i in types) {
      if(this.entityCollision(entity, i, types[i])){
        result = true;
      }
    }
    return result;
    // return this.pointCollides(x,y,entity) +
    //   this.pointCollides(x+w,y,entity) +
    //   this.pointCollides(x,y+h,entity) +
    //   this.pointCollides(x+w,y+h,entity);
  }
  entityCollision(entity, type, pos) {
    var cell = CELLMAP[type];
    if(!cell)return false;
    if(!cell.entityCollision)return true;
    return cell.entityCollision(entity, pos);
  }
  drawBackground(canvas, camera) {
    this.background.draw(canvas, camera, this);
  }
  getCell(x,y) {
    if(this.oob(x,y))return {};
    return CELLMAP[this.world[y][x]];
  }
}

class WorldDefault extends World {
  constructor(w,h,s) {
    super();    
    this.w=w;
    this.h=h;
    s = 40;    
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

// for(var index in CELLMAP)

var CELLMAP = {
  // 'false': {},
  0: {
    //air
  },
  1: {
    //Ground
    solid: true,
    groundBlock: true,
    draw: function(canvas, x,y,w,h, world,i,j) {
      var color1 = "#732";
      var color2 = "#843";
      var color3 = "#090";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      var ww = s/3;
      var hh = ww;
      var spacing = 10;
      for(var ii=0;ii<3;ii++) {
        var r1 = psuedoRandom(x,y,ii,1);
        var r2 = psuedoRandom(x,y,ii,2);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
      }
      if(!world.getCell(i,j-1).groundBlock) {
        canvas.fillStyle=color3;
        canvas.fillRect(x,y,w,s/8);
        canvas.strokeRect(x,y,w,0);
      }
      if(!world.getCell(i,j+1).groundBlock) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).groundBlock) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).groundBlock) {
        canvas.strokeRect(x,y,0,h);
      }
    }
  },
  2: {
    //Spike
    solid: true,
    angle: 0,
    redraws: false,
    draw: function(canvas, x,y,w,h, world,i,j) {
      canvas.fillStyle="white";
      canvas.strokeStyle = "#000";
      canvas.save();
      canvas.translate(x+w/2,y+h/2);
      canvas.rotate(this.angle);
      // this.angle += Math.PI/20*1.5;
      w=w*.9;
      h=h*.9;
      for(var i=0;i<3;i++){
        canvas.rotate(Math.PI/8);
        canvas.fillRect(-w/2,-h/2,w,h);        
        canvas.strokeRect(-w/2,-h/2,w,h);
      }
      w=w*.8;
      h=h*.8;
      canvas.rotate(-3*Math.PI/8);
      canvas.fillStyle="grey";
      canvas.fillRect(-w/2,-h/2,w,h);      
      canvas.restore();
    },
    entityCollision: function(entity, pos) {
      if(entity.player) entity.die();
      return true;
    }
  },
  3: {
    //Spike floor
    solid: true,
    redraws: false,
    groundBlock: true,
    draw: function(canvas, x,y,width,height, world,ii,jj) {
      var w= width;
      var h=height;
      var dd = width*.1;
      CELLMAP[2].draw(canvas,x+dd,y+dd,width-dd*2,height-dd*2,world,ii.jj)
      var dh = h * .4;
      CELLMAP[1].draw(canvas,x,y+dh, width, height-dh, world, ii,jj);
    },
    entityCollision: function(entity, pos) {
      if(entity.player && entity.grounded) entity.die();
      return true;
    }
  }
}