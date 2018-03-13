class Enemy extends Mover {
	constructor(x,y) {
		super(x,y);
		this.w = 40;
		this.h = 40;
		this.height = this.h;
		this.width = this.w; 
		this.color = "red";
		this.speed = 5;
		this.groundAccel = 5;
		this.mx = 1;
		this.killPlayer = true;
	}
		 
	playerCollision(player) {
		if(player.vy > 0) {
			return true;
		} else {
			return false;
		}
	}

	getHitByEntity(player) {
		player.BounceOffEntity(this);
		this.h=this.h/2;
		// this.die();
	}

	onHitPlayer(player) {
		
	}


	update(dt, frameCount) {
		if(this.wallcolliding == true) {
			this.mx = this.mx*-1;
		}
		super.update(dt, frameCount);       
		var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
			if(this.playerCollision(this.game.player) == true) {
				 this.getHitByEntity(this.game.player);
			} else {
				this.onHitPlayer(this.game.player);
				this.game.player.getHitByEntity(this);
			}
		}
	}       
	draw(canvas) {
    super.draw(canvas);
    var box = this.getHitBox();
    canvas.strokeRect(box.x,box.y,box.w,box.h);
  }
}