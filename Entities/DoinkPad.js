
class DoinkPad {
    constructor(x,y){
        this.x=x;this.y=y;
        this.w= 20;
        this.h = 20;
        this.r = 15;
        this.bounceAnimation = 0;
    }
    update() {    
		var doinkBox = this.getHitBox();
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(doinkBox, playerBox) == true) {
			if(this.playerCollision(this.game.player) == true) {
				 this.getHitByEntity(this.game.player);
			}
		}
        if (this.bounceAnimation > 0)this.bounceAnimation-=1;
	}
    draw(canvas) {
    var r = this.r;
    r += Math.cos(this.bounceAnimation*Math.PI/5)*10;
    canvas.fillStyle="#f33";
    canvas.beginPath();
    canvas.arc(this.x,this.y-Math.cos(this.bounceAnimation*Math.PI/10)*10,r,0,Math.PI*2);
    canvas.fill();
    }

    getHitByEntity(player) {
        this.bounceAnimation = 20;
		player.BounceOffEntity(this);
	}

    playerCollision(player) {
		if(player.vy > 0) {
			return true;
		} else {
			return false;
		}
	}

    getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-this.h, w:this.w, h:this.h};
    }
    
}