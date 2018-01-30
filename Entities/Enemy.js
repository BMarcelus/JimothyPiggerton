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
		
	}
}