class Enemy extends Mover {
	constructor(x,y) {
		super(x,y);
		this.color = "red";
		this.speed = 5;
		this.groundAccel = 5;
		this.mx = 1;
	}
		 
	enemyDies(player) {
		if(player.vy > 0 && player.y <= this.y) {
			player.vy = -20;
			return true;
			
		} else {
			false;
		}
	}


	update(dt, frameCount) {
		if(this.wallcolliding == true) {
			this.mx = this.mx*-1;
		}
		super.update(dt, frameCount);       
		var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
			if(this.enemyDies(this.game.player) == true) {
				this.die();
			} else {
				this.game.player.die();
			}
		}
	}       
	
}