class Enemy extends Mover {
	constructor(x,y) {
		super(x,y);
		this.color = "red";
		this.speed = 5;
		this.groundAccel = 5;
	}

	update(dt, frameCount) {
		super.update(dt, frameCount);	
	}
}