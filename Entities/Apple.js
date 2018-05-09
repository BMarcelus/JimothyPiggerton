
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
        this.hit = false;
    }
    update(dt, frameCount) {    
		  var doinkBox = this.getHitBox();
      var playerBox = this.game.player.getHitBox();
      if(!this.hit&&rectangleCollision(doinkBox, playerBox)) {
        if(this.playerCollision(this.game.player)) {
          this.getHitByEntity(this.game.player);
          setTimeout(() => {
            this.y = this.startY;
            this.hit = false;
            this.grav = 0;
          }, 1000);
        }
      }
      if(this.game.pig&&rectangleCollision(doinkBox, this.game.pig.getHitBox())) {
          this.grav = 0;
          this.y -= 5000;
          this.game.pig.apples++;
      }
      super.update(dt, frameCount);
      // if (this.bounceAnimation > 0)this.bounceAnimation-=1;
	}

    getHitByEntity(player) {
        //this.bounceAnimation = 20;
        // player.jumpCount--;
        // player.jump(5);
        player.bounceOffEntity(this, 12);
        this.grav = 1;
        this.hit=true;
      //player.apples++;
	}

  playerCollision(player) {
		return true;
	}

    getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-this.h, w:this.w, h:this.h};
    }
    
}