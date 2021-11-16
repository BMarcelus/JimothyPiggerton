class Brazier {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.w = 40;
    this.h = 40;
    this.flameSpeed = 15;
    this.secondFlameSpeed = 10;
    this.flameTimer = this.flameSpeed;
    this.secondFlameTimer = this.secondFlameSpeed;
    this.fireTime = 0;
    this.fireChangeSpeed = 15;
    this.fireSeed = 0;
    this.killPlayer = true;
  }
  update(dt,frameCount) {
    this.flameTimer += 1;
    if(this.flameTimer>this.flameSpeed) {
      this.flameTimer=Math.floor(5 * Math.random());
      this.makeFlame();
    }
    this.secondFlameTimer += 1;
    if(this.secondFlameTimer>this.secondFlameSpeed) {
      this.secondFlameTimer=Math.floor(5 * Math.random());
      this.makeFlame();
    }

    this.fireTime++;
    if (this.fireTime >= this.fireChangeSpeed)
    {
      this.fireTime = 0;
      this.fireSeed++;
    }
  
    var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
      this.game.player.getHitByEntity(this);
    }
  }

  getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-.5*this.h, w:this.w, h:this.h};
  }

  draw(canvas) {
    var color1 = "#f00";
    var color2 = "#fa0";
    var color3 = "#ff0";

    var w = this.w;
    var h = this.h;
    var x = this.x - this.w/2;
    var y = this.y - this.h;
    

    var s = Math.max(w,h);
    var ww = s/3;
    var hh = ww;
    var spacing = 3;
    // canvas.strokeRect(x,y,w,h);
    canvas.fillStyle=color1;
    

    canvas.fillStyle=color1;
    for(var ii=0;ii<10;ii++) {
        var r1 = psuedoRandom(x,y,ii,this.fireSeed+1);
        var r2 = psuedoRandom(x,y,ii,this.fireSeed+2);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
    }

    canvas.fillStyle=color2;
    for(var ii=0;ii<10;ii++) {
        var r1 = psuedoRandom(x,y,ii,this.fireSeed+3);
        var r2 = psuedoRandom(x,y,ii,this.fireSeed+4);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
    }

    canvas.fillStyle=color3;
    for(var ii=0;ii<10;ii++) {
        var r1 = psuedoRandom(x,y,ii,this.fireSeed+5);
        var r2 = psuedoRandom(x,y,ii,this.fireSeed+6);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
    }  }
  makeFlame() {
    var spawnX = (this.x - this.w /2) + Math.random() * this.w;
    var spawnY = (this.y - this.h /2) - Math.random() * this.h;
    var flame = new Flame(spawnX, spawnY, 30, 30, 0, -1, 75);
    this.game.addEntity(flame);
  }
}