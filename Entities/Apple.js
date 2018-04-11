
class Apple extends Mover {
    constructor(x,y){
        super(x,y);
        this.x=x;this.y=y;
        this.startY=this.y;
        this.w= 20;
        this.h = 20;
        this.r = 15;
        this.mx = 0;
        //this.vy = 0;
        this.grav = 0;
        this.color = "red";
        //this.behind = true;
    }
    update(dt, frameCount) {    
		var doinkBox = this.getHitBox();
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(doinkBox, playerBox) == true) {
			if(this.playerCollision(this.game.player) == true) {
				 this.getHitByEntity(this.game.player);
			}
		}
        if(rectangleCollision(doinkBox, this.game.pig.getHitBox()) == true) {
            this.grav = 0;
            this.y -= 5000;
            this.game.pig.apples++;
		}
        super.update(dt, frameCount);

       // if (this.bounceAnimation > 0)this.bounceAnimation-=1;
	}

    getHitByEntity(player) {
        //this.bounceAnimation = 20;
      //player.BounceOffEntity(this);
      this.grav = 1;
      //player.apples++;
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