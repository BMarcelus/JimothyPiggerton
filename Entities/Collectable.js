class Collectable {
  constructor(x,y) {
    this.w=30;
    this.h=30;
    this.x=x-this.w/2;
    this.y=y-this.h/2;
    this.color = 'gainsboro';

    this.color1 = "red";
    this.color2 = "#a00";
    this.color3 = "#fff";
    this.color4 = "#640";
  }
  getHitBox() {
    return this;
  }
  update(dt, frameCount) {
    if(this.game.collidesWithPlayer(this)) {
      this.shouldDelete=true;
      var player = this.game.player;
      SOUNDMAP.pickup.play(player);
      player.game.screenShakeLevel = 0.4;
      player.game.frameStop = 2;
      if(particles.collectable.enabled)
      for(var i=0;i<10;i++) {
        var x = this.x;// + (Math.random()*this.w-this.w/2)/2;
        var y = this.y;// - (Math.random()*this.h)/4;
        var w = 10;
        var h = 10;
        var vx = Math.random()*5-2;
        var vy = Math.random()*5-2-10;
        var color = this.color1;
        // if(i>=num-8) color = "#222";
        // if(i>=num-4) color = "#33d"
        // if(i>=num-2) color = "#fff"; 
        this.game.addEntity(new FallingParticle(x,y,w,h,vx,vy,30,color));
      }
    }
  }
  draw(canvas) {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x,this.y,this.w,this.h);
    canvas.save();
    canvas.translate(this.x+this.w/2,this.y+this.h/2);
    this.drawShape(canvas,this.w,this.h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    // canvas.strokeStyle = "#fff";
    // canvas.lineWidth = 7;
    // canvas.strokeRect(-w/2,-h,w,h);    
    // canvas.strokeRect(-w*0.1,-h*1.3,w*0.2,h*0.3);
    
    canvas.fillStyle = this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    canvas.fillStyle = this.color2;
    canvas.fillRect(-w/2,-h,w/2,h);
    canvas.fillStyle= this.color3;
    canvas.fillRect(-w*0.1,-h*0.9,w*0.5,h*0.2);
    canvas.fillStyle = this.color4;
    canvas.fillRect(-w*0.1,-h*1.3,w*0.2,h*0.3);
  }
}