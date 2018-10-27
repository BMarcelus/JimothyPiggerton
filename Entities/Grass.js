class Grass {
	constructor(x,y,i,j) {
    x+=(Math.random()*2-1)*20;
    this.x = x;
    this.y = y;
		// super(x,y);
		this.w = 10+Math.random()*10;
		this.h = 10+Math.random()*20;
		this.height = this.h;
		this.width = this.w; 
    this.color = "#070";
    this.color2 = "#191";
    this.isColliding = false;
    this.angle = 0;
    this.timeFromCollision = 0;
    this.tangle = 0;
    this.i=i;
    this.j=j-1;
    this._angle = Math.PI/40*(Math.random()*2-1);
    if(Math.random()>.7) this.drawShape = this.drawShape2;
	}
	getHitByEntity(player) {
    this.timeFromCollision = 0;
    this.tangle = Math.PI/4*(player.flipped ? -1 : 1);
  }
  
  playerInCell() {
    var p = this.game.player.matrixPosition;
    return p&&p.x == this.i && (p.y == this.j || p.y == this.j-1);
  }

	update(dt, frameCount) {
    var w = this.w*2;
		var mbox = {
      x: this.x-w/2,
      y: this.y-this.h,
      w,
      h: this.h,
    }	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(mbox, playerBox) == true) {
    // if(this.playerInCell()) {
      if(!this.isColliding) {
        this.getHitByEntity(this.game.player);
        this.isColliding = true;
      }
		} else {
      this.isColliding = false;
    }
    this.timeFromCollision+=1;
    var div = 5;
    var dif = 8;
    if(this.timeFromCollision<dif) {
      this.angle += (this.tangle - this.angle)/5;
    } else if(this.timeFromCollision<dif*2){
      this.angle += (-this.tangle/2 - this.angle)/5;
    } else if(this.timeFromCollision<dif*3) {
      this.angle += (0 - this.angle)/3;
    }
	}
  draw(canvas) {
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    canvas.rotate(this.angle+this._angle);
    if(this.flipped) {
      canvas.scale(-1,1);
    }
    this.drawShape(canvas,w,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;    
    // canvas.strokeStyle = 'black';
    // canvas.lineWidth = 1;    
    // canvas.strokeRect(-w/2,-h, w,h);
    canvas.fillRect(-w/2,-h, w,h);
    canvas.fillStyle = this.color2;    
    canvas.fillRect(-w/2,-h, w,h/2);
  }
  drawShape2(canvas,w,h) {
    canvas.fillStyle = this.color;    
    // canvas.strokeStyle = 'black';
    // canvas.lineWidth = 1;    
    // canvas.strokeRect(-w/2,-h, w,h);
    canvas.fillRect(-w/2,-h, w,h);
    canvas.fillStyle = this.color2;    
    canvas.fillRect(-w/2,-h, w,h/2);
    canvas.fillStyle = '#3a8';
    canvas.fillRect(-w*.6,-h-w*.3,w*1.2,w*.6);
    canvas.fillRect(-w*.3,-h-w*.6,w*.6,w*1.2);
    canvas.fillStyle = '#ab4';
    canvas.fillRect(-w*.2,-h-w*.2,w*.4,w*.4);
  }
}