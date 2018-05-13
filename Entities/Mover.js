
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
    this.jumpPower = 15;
    this.flipped = false;
    this.color = "#000";
    this.cloudParticlesOn = true;
    this.wallcolliding = false;
    this.maxJumps = 1;
    this.jumpCount = 0;
    this.dashCount = 0;
    this.angle = 0;
    this.terminalVelocity = 20;
    this.mover = true;
    this.wallSlides = true;
    this.wallJumps = false;
    this.groundAccel = 2;
    this.currentGroundAccel = this.groundAccel;
    this.diesToSpikes = false;
    this.spinning = false;
    this.invisible=false;
    this.ceilingColliding=false;
    this._angle = 0;
    this.movementStun=0;
    this.jumpSoundType = SOUNDMAP.jump2;
  }
  die() {
    this.shouldDelete=true;
  }
  update(dt, frameCount) {
    if(this.mx>1)this.mx=1;
    if(this.mx<-1)this.mx=-1;
    if(this.my>1)this.my=1;
    if(this.my<-1)this.my=-1;
    if(this.movementStun>0) {
      this.movementStun--;
    }
    if(this.mx && !this.spinning){
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
      var ga = this.currentGroundAccel;
      if(!this.grounded)ga = ga/2;
      var mx = this.mx;
      if(this.movementStun) mx =0;
      if(mx==0&&this.grounded)ga = 10;
      this.vx = linearMove(this.vx, mx*this.speed, ga*dt); 
    }
    this.vy += this.grav * dt;
    if(this.vy>this.terminalVelocity)this.vy = this.terminalVelocity;
    // this.x += this.vx;
    // this.y += this.vy;
    this.safeMove(this.vx*dt,this.vy*dt + this.grav * dt * dt /2);
    // staticWorldCollide(this);
    // safeMoveOnWorld(this,this.vx,this.vy);
    var maxHeight = this.game.world.h*this.game.world.s+200;
    if(this.y > maxHeight) {
      this.groundCollide(maxHeight);
    }
    if(this.wallCollideTimer>0)this.wallCollideTimer-=1;
    if(this.vy>0) {
      this.grounded = false;
    }
    if(this.wallcolliding) {
      // this.spinning = false;
      
      if(this.wallJumps&&this.wallSlides&&this.vy>0) {
        this.vy = this.vy * .7;
        if(!this.spinning) {
          // this.flipped = this.mx > 0;
        }
        // this.width -= .5;
        // this.height += .5;
      }
      if(this.wallJumps)this.wallCollideTimer = 10;
    } else if(this.wallCollideTimer>0&&this.mx!=0&&((this.mx>0)==this.walldirection)) {
      this.wallCollideTimer=0;
    }
    // if(this.wallCollideTimer>0) {
    //   this.x -= this.vx;
    // }
    if(this.vy>this.grav*3&&this.jumpCount==0)this.jumpCount=1; 
    if (this.jumpCount == 1 && !this.wallcolliding) {
      // this.angle = Math.atan2(-this.vy, this.vx);//,this.vy);
      this.angle = -Math.cos(this.vy/this.terminalVelocity*Math.PI)*(1-2*this.flipped)*Math.abs(this.vx/this.speed)/2;
    }
    else if(this.spinning&&!this.ceilingColliding) {
      if(this.wallcolliding) {
        this.angle -= angleBetween(this.angle, 0)/5 * -(1-2*this.flipped); 
      } else {
        this.angle += Math.PI/10*(1-2*this.flipped);
      }
      // this.width += 1;
      // this.height -=  4;
    } else if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching&&this.grounded) {
      // this.angle = (Math.cos(this.x/this.speed*10*Math.PI/70)*Math.PI/20-Math.PI/40*(this.vx/this.speed));
      this.angle = -Math.PI/40*this.vx/this.speed + Math.cos(frameCount*Math.PI/7)*Math.PI/20;
    } else {
      this.angle = 0;
    }
    if(this.crouching) {
      this.width += (this.w*1.2-this.width)/2;
      this.height += (this.h*.6-this.height)/2;
    } else if(this.spinning) {
      this.width += (this.w*1-this.width)/5;
      this.height += (this.h*1-this.height)/5;
    } else {
      this.width += (this.w-this.width)/8;
      this.height += (this.h-this.height)/8;
    }
    if(this.ceilingColliding && (this.h-this.height) <= .5) {
      this.ceilingColliding = false;
    }
  }
  safeMove(vx,vy) {
    var world = this.game.world;
    var w = this.w;
    var h = this.h;
    var d = 0;//(1-2*this.flipped)*10;
    // this.ceilingColliding=false;    
    if(!world.rectCollides(this.x-w/2+vx+d, this.y-h+1,w,h-2,this, d+vx,0)) {
      this.x += vx;
      this.wallcolliding=false;
    } else {
      if(this.vx>0) {
        this.x = Math.floor((this.x+w/2+vx+d)/world.s)*world.s-w/2-1;
      } else if(this.vx<0){
        this.x = Math.floor((this.x-w/2+vx+d)/world.s+1)*world.s+w/2+1;
      }
      this.walldirection = (this.vx+d)>0;
      // if(this.vx>0)this.vx = 1;
      // else this.vx = -1;
      if(!(this.wallJumps&&this.wallSlides&&!this.grounded)) {
        this.vx = 0;
      } else {
        if(this.vx>this.speed/2)this.vx=this.speed/2;
        else if(this.vx<-this.speed/2)this.vx = -this.speed/2;
      }
      this.wallcolliding=true;
    }
    var yCol = world.rectCollides(this.x-w/2,this.y-h+vy,w,h,this, 0,vy);
    if(yCol) {
      if(this.vy>0) {
        this.groundCollide(Math.floor(yCol.y));        
        this.ceilingColliding=false;        
      } else {
        this.y = yCol.y+h+world.s;
        // this.vy = 0;
        this.width+=-this.vy+3;
        this.height-=5;
        // this.spinning=false;
        this.vy = this.vy*.7;
        vy = 0;
        this.ceilingColliding=true;
      }
    } else {
      this.y += vy;
    }
  }
  land() {
    this.width += 30;
    this.height -= 20;
    this.currentGroundAccel=this.groundAccel/2;
    SOUNDMAP.land.play(this);
    var self = this;
    setTimeout(function(){
      self.currentGroundAccel = self.groundAccel;
    }, 10);
    if(!this.crouching) {
      this.vx = 0;
    }
    if(this.cloudParticlesOn) {
      for(var i=0;i<6;i++) {
        this.game.addEntity(new Cloud(this.x+this.w/2+4,this.y+3,3+Math.random(),10,3*Math.random()-3*Math.random(),0));
        this.game.addEntity(new Cloud(this.x-this.w/2-4,this.y+3,3+Math.random(),10,3*Math.random()-3*Math.random(),0));
      }
    }
  }
  groundCollide(y, animationless) {
    this.y = y;
    this.vy = 0;
    if(!this.grounded && !animationless) {
      this.land();
    }
    this.grounded = true;
    this.jumpCount = 0;
    this.dashCount = 0;
    this.spinning=false;
  }
  draw(canvas) {
    if(this.invisible)return;
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    if(this.ceilingColliding) {
      canvas.translate(0,-this.h+this.height);
    }
    if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching&&this.grounded) {
      canvas.translate(0,-(Math.sin(this.x/this.speed*10*Math.PI/70)+1)*3)
    }
    if(this.spinning) {
      canvas.translate(0,-h/2);      
    }
    canvas.rotate(this.angle+this._angle);
    if(this.spinning) {
      canvas.translate(0,h/2);      
    }
    if(this.flipped) {
      canvas.scale(-1,1);
    }
    if(this.wallcolliding&&this.wallSlides&&this.wallJumps) {
      canvas.translate(-(this.w-this.width)/2,0);
    }
    this.drawShape(canvas,w,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;    
    canvas.fillRect(-w/2,-h, w,h);
  }
  jump(amt) {
    this.jumpRelease=false;    
    if(this.jumpSquating)return;
    // if(!this.grounded)return;
    if(this.wallCollideTimer>0&&this.wallJumps&&!this.grounded) {
      return this.wallJump();
    }
    if(this.jumpCount>=this.maxJumps)return;
    var time = 30;
    var jumpPower = amt || this.jumpPower;
    if(this.jumpCount>0) {
      time = 0;
      jumpPower += 2;
    } 
    {
      this.width = 55;
      this.height = 15;
    }
    // this.grounded = false;
    this.vy = 0;
    // this.jumpCount++;   
    this.jumpSquating = true; 
    this.vx = 0;
    this.currentGroundAccel=0;
    setTimeout(function() {
      this.jumpSquating = false;      
      this.vx = this.mx*this.speed; 
      this.currentGroundAccel=this.groundAccel;
      if(this.jumpCount>=this.maxJumps)return;      
      this.jumpCount++;
      this.grounded=false;
      if(this.jumpCount>1)this.spinning=true;
      else {
        this.height += 10;
        this.width -= 10;
      }
      this.vy = -jumpPower;
      this.playJumpSound();
      if(this.jumpRelease) this.vy = this.vy * .65;
      if(this.cloudParticlesOn) {
        for(var i=0;i<3;i++) {
          this.game.addEntity(new Cloud(this.x-i*5,this.y,5+i*2,10,-2,0,5+i*2));
          this.game.addEntity(new Cloud(this.x+i*5,this.y,5+i*2,10,2,0,5+i*2));
          this.game.addEntity(new Cloud(this.x-6+i*3,this.y,5,10,-1+i,0,5+i*2));
        }
      }
    }.bind(this), time);
    
  }
  playJumpSound() {
    this.jumpSound = this.jumpSoundType.play(this);
  }
  wallJump() {
    this.jumpCount = 1;
    this.dashCount = 0;
    this.vy = -this.jumpPower;
    this.playJumpSound();
    this.grounded = false;
    this.height += 10;
    this.width -= 10;
    this.spinning = false;
    if(this.cloudParticlesOn) {
      for(var i=0;i<3;i++) {
        this.game.addEntity(new Cloud(this.x-i*5,this.y,5+i*2,10,-2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x+i*5,this.y,5+i*2,10,2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x-6+i*3,this.y,5,10,-1+i,0,5+i*2));
      }
    }
    this.vx = 12*(1-2*this.walldirection)*.7;
    this.wallcolliding=0;
    this.wallCollideTimer=0;
  }
  shortJump() {
    this.jumpRelease = true;
    if(!this.grounded&&this.jumpCount==1&&this.vy<-this.jumpPower/2) {
      this.vy = this.vy*.65;
      this.jumpSound.stopSound();
    }
  }
  crouch() {
    this.crouching = true;
    if(!this.grounded&&this.vy>0) this.vy += 10;
  }
  uncrouch() {
    this.crouching = false;
  }
  getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-this.h, w:this.w, h:this.h};
  }
  dash(dir) {
    if(dir==undefined) dir = this.mx;
    if(!dir) dir = 1-2*this.flipped;
    if (this.dashCount == 0)
    {
      // if(this.grounded || this.jumpCount < this.maxJumps)
      {
        this.dashCount++;
        SOUNDMAP.dash.play(this);
        this.vx = (.5 * this.vx) + 30 * (dir);
        // if (this.vy < 0)
          // this.jumpCount++;
        // else
          this.vy = -10;
        this.grounded=false;
      }
    }
  }
}