
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
    this.diesToSpikes = false;
    this.spinning = false;
  }
  die() {
    this.shouldDelete=true;
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
    }
    if(this.wallcolliding) {
      if(this.wallJumps&&this.wallSlides&&this.vy>0) {
        this.vy = this.vy * .8;
        if(!this.spinning) {
          this.flipped = this.mx > 0;
        }
      }
      if(this.wallJumps)this.wallCollideTimer = 10;
    } else if(this.wallCollideTimer>0&&this.mx!=0&&((this.mx>0)==this.walldirection)) {
      this.wallCollideTimer=0;
    }
    // if(this.wallCollideTimer>0) {
    //   this.x -= this.vx;
    // }
    if(this.vy>this.grav*5&&this.jumpCount==0)this.jumpCount=1; 
    if (this.jumpCount == 1) {
      // this.angle = Math.atan2(-this.vy, this.vx);//,this.vy);
      this.angle = -Math.cos(this.vy/this.terminalVelocity*Math.PI)*(1-2*this.flipped)*Math.abs(this.vx/this.speed)/2;
    }
    else if(this.spinning) {
      this.angle += Math.PI/10*(1-2*this.flipped);
      this.width += 1;
      this.height -=  4;
    } else if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching&&this.grounded) {
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
    this.spinning=false;
  }
  draw(canvas) {
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching&&this.grounded) {
      canvas.translate(0,-(Math.sin(this.x/this.speed*10*Math.PI/70)+1)*3)
    }
    if(this.spinning) {
      canvas.translate(0,-h/2);      
    }
    canvas.rotate(this.angle);
    if(this.spinning) {
      canvas.translate(0,h/2);      
    }
    if(this.flipped) {
      canvas.scale(-1,1);
    }
    this.drawShape(canvas,w,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;    
    canvas.fillRect(-w/2,-h, w,h);
  }
  jump() {
    // if(!this.grounded)return;
    if(this.wallCollideTimer>0&&this.wallJumps) {
      return this.wallJump();
    }
    if(this.jumpCount>=this.maxJumps)return;
    this.jumpCount++;
    if(this.jumpCount>1)this.spinning=true;
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
    this.jumpCount = 1;
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