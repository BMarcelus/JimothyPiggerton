
class Player extends Mover{
  constructor() {
    super();
    this.x = 100;
    this.y = 100;
    // this.speed = 10;
    this.mx = 0;
    this.eyeMovement = {x:0,y:0, blink: 0, blinkTime: 10, tx: 0, ty: 0};
    this.dead=false;
    this.player=true;
  }
  die() {
    this.dead=true;
    this.eyeMovement.x = -5;
    this.eyeMovement.y = 0;
      this.game.screenShakeLevel += 1;            
      this.eyeMovement.blink = 0;
    
    this.animation = new Animation(4, function(dt, frameCount) {
      this.mx = 0;
      this.angle = 0;
      this.width = this.w;
      this.height = this.h;
    }.bind(this), function() {
      var num = 20;
      for(var i=0;i<20;i++) {
        var x = this.x + (Math.random()*this.w-this.w/2)/2;
        var y = this.y - (Math.random()*this.h)/2;
        var w = 10;
        var h = 10;
        var vx = Math.random()*5-2+this.vx/5;
        var vy = Math.random()*5-2-10;
        var color = "#666";
        if(i>=num-8) color = "#222";
        if(i>=num-4) color = "#33d"
        if(i>=num-2) color = "#fff"; 
        this.game.addEntity(new FallingParticle(x,y,w,h,vx,vy,100,color));
      }
      this.vy=-20;   
      this.y=-1000;   
      this.animation = new Animation(60, function(dt, frameCount) {
        // this.y+=this.vy;
        // this.vy++;
      }.bind(this), function() {
        this.game.respawn();
      }.bind(this))
    }.bind(this))
    // this.game.respawn();
  }
  resetControls() {
    this.mx = 0;
  }
  update(dt, frameCount){
    if(this.animation) {
      this.animation.update(dt, frameCount);
      return;
    }
    this.updateEye(dt, frameCount);
    super.update(dt, frameCount);
  }
  draw(canvas){
    super.draw(canvas);
    var box = this.getHitBox();
		canvas.strokeRect(box.x, box.y, box.w, box.h);
  }
  reset() {
    this.x=60;
    this.y=100;
    this.vx=0;
    this.vy=0;
    this.maxJumps=1;
    this.wallJumps=false;
    this.animation=null;
  }
  updateEye(dt, frameCount) {
    var t = frameCount%120;
    // if(t<10) {
    //   this.eyeMovement.blink = (1+Math.cos(t*Math.PI/20))/2;
    // } else {
    //   this.eyeMovement.blink = 0;
    // }
    // if(frameCount%120==0) {
    if(Math.random()>.5&&frameCount%60==0) {
      this.eyeMovement.blink = this.eyeMovement.blinkTime;
    }
    if(this.eyeMovement.blink>0) {
      this.eyeMovement.blink--;
    }
    if(this.mx==0) {
      if(Math.random()>.99) {
        this.eyeMovement.tx = Math.random()*6-3;
        this.eyeMovement.ty = Math.random()*5-4;
      }
      if(!this.crouching) {
        // if(frameCount%80<30) {
        //   this.width += 1;
        //   this.height -= 1;
        // } else {
        //   this.width -= 1;
        //   this.height += 1;
        // }
      }
    }else {
      this.eyeMovement.tx= 0;
      this.eyeMovement.ty= 0;
    }
    // this.eyeMovement.x = this.eyeMovement.tx;
    this.eyeMovement.x += (this.eyeMovement.tx-this.eyeMovement.x)/10;
    this.eyeMovement.y += (this.eyeMovement.ty-this.eyeMovement.y)/10;
  }
  drawShape(canvas,w,h) {
    canvas.save();
    canvas.strokeStyle = "#000";
    canvas.strokeWidth=2;
    canvas.strokeRect(-w/2-1,-h-1,w+2,h+2);
    // canvas.fillStyle = "#73d";
    canvas.fillStyle = "#666";    
    
    // canvas.fillStyle = "#999";
    canvas.fillRect(-w/2,-h,w,h);
    // canvas.fillStyle = "#74e";
    // canvas.fillStyle = "#ddd";
    canvas.fillStyle = "#222";
    
    var shadeX = w*.4+this.eyeMovement.x/2;
    if(this.dead)shadeX-=5;
    canvas.fillRect(-w/2,-h,shadeX,h);
    var pantsHeight = h/8;
    canvas.fillStyle = "#33d";
    canvas.fillRect(-w/2,-pantsHeight,w,pantsHeight);    
    canvas.fillStyle = "#44e";
    canvas.fillRect(0,-pantsHeight,w/2,pantsHeight);        
    
    
    canvas.fillStyle="#fff";
    var squint = 1-.6*Math.abs(this.vy)/this.terminalVelocity;
    var eyey = -h+10 + this.eyeMovement.y;
    var eyex = 6 + this.eyeMovement.x;
    var eyed = 10 - this.eyeMovement.x/3;
    
    if(this.crouching) {
      // squint *= .2;
    }
    var blink = 0;
    if(this.eyeMovement.blink>0) {
      var t = this.eyeMovement.blinkTime - this.eyeMovement.blink+1;
      blink = (1+Math.cos(t*Math.PI/20))/2;
    }
    squint*= (1-blink);
    eyey += blink*4;
    // eyey -= this.width/this.w * 5;
    var eyh = 8*squint;
    var eyh2 = eyh;
    if(this.crouching) {
      // eyed += 2;
      eyex += 2;
    }
    canvas.fillRect(eyex-eyed,eyey,8,eyh);
    canvas.fillRect(eyex,eyey,6,eyh2);
    w=this.w;
    canvas.translate(0,-h);
    var hatAngle = Math.abs(this.angle);
    if(hatAngle>Math.PI/4)hatAngle=Math.PI/4;
    canvas.rotate(-hatAngle);
    canvas.rotate(0);
    canvas.fillStyle = "#f4d";
    // canvas.fillStyle = "#444";
    canvas.beginPath();
    canvas.rect(-w/2-1,-4,w+9,4);
    canvas.rect(-w/2-1,-12,w-3,12);
    canvas.stroke();
    canvas.fill();

    canvas.fillStyle = "#c2d";
    // canvas.fillStyle = "#111";
    canvas.beginPath();
    canvas.rect(-w/2-1,-4,(w+9)/4,4);
    canvas.rect(-w/2-1,-12,(w-3)/2,12);
    canvas.fill();
    canvas.restore();    
  }
}
Player.controls = {
  right: {held: function() { this.mx += 1; }},
  left: {held: function() { this.mx -= 1; }},
  up: {
    down: function() { this.jump(); },
    up: function() { this.shortJump(); this.eyeMovement.ty = 0; },
    held: function() { this.eyeMovement.ty = - 6; this.height += .5; this.width -= .5},
  },
  down: {down: function() { this.crouch(); }, up: function() { this.uncrouch(); }},
}