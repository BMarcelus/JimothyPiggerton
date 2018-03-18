class Woof extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="gray";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.startY= y;
  }

  playerCollision(player) {
		if(player.y < this.y) {
			return true;
		} else {
			return false;
		}
	}


  onHitPlayer(player) {
    this.y -= 5;
    player.vy = -5;
    player.vx = (2*(this.mx >= 0)-1) * 35;
    super.onHitPlayer(player);

  }


  getHitByEntity(player) {
		player.BounceOffEntity(this);
    player.y -= 20;
		//this.h=this.h/2;
		//this.die();
	}


  update(dt, frameCount) {
    var dist = this.game.player.x-this.x;
    var close = false;
    var superclose = false;
    if ((dist > -200 && dist < 200)) {
      close = true;
      if ((dist > -100 && dist < 100)) {
        superclose = true;
      }
    }
    
    var ydist = this.game.player.y-this.y;
    if (close && ydist < 200 && ydist > -400)
    {
      var left = dist < 0;
      var moveleft = this.mx < 0;
      
      if (superclose)
      {
        if (ydist <= 0)
          this.jump();
      }
      else if (this.vy == 0 && left != moveleft)
        this.mx *= -1;

      
    }

    super.update(dt, frameCount);
  }
}