class Enemy extends Mover {
	constructor(x,y) {
		super(x,y);
		this.color = "red";
		this.speed = 5;
		this.groundAccel = 5;
		this.mx = 1;
	}
         
	update(dt, frameCount) {
		if(this.wallcolliding == true) {
			this.mx = this.mx*-1;
		}
		super.update(dt, frameCount);       
		var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
			this.color = "yellow";
		} else {
			this.color = "red";
		}
	}       
	draw(canvas) {
		super.draw(canvas);       
		var box = this.getHitBox();
		canvas.strokeRect(box.x, box.y, box.w, box.h);
	}
}