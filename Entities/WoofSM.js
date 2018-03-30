class Woof extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="gray";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.startY= y;
    this.mx = .5;
    this.transition = 0;
    this.fsm = [];
    this.populateFsm();
    this.state = 0;
    this.xsight = 300;
    this.ysight = 300;
  }

  populateFsm()
  {
    this.fsm.push({
        name: "Wandering", 
        index: 0,
        run: function(entity){
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight-100 && ydist > -entity.ysight-100)) {
            console.log("1");
            entity.transition = 10;
            entity.mx = 0;
            entity.jump();
            return 1;
          }
          return this.index;
        },
      })

    this.fsm.push({
        name: "Noticing", 
        index: 1,
        run: function(entity){
          if (entity.transition <= 0 && entity.vy == 0)
          {
            console.log("2");
            entity.transition = 0;
            entity.mx = 5 * (entity.game.player.x-entity.x < 0 ? -1 : 1);
            return 2;
          }
          entity.transition--;
          return this.index;
        },
      })

      this.fsm.push({
        name: "Chasing", 
        index: 2,
        run: function(entity){
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist < -entity.xsight || dist > entity.xsight || ydist > entity.ysight-100 || ydist < -entity.ysight-100)) {
            console.log("3");
            entity.transition = 50;
            entity.mx = .4 * Math.sign(entity.mx);
            return 3;
          }
          else if (dist > -entity.xsight/4 && dist < entity.xsight/4)
          {
            entity.jump();
          }
          var left = dist < 0;
          var moveleft = entity.mx < 0;
          if (entity.vy == 0 && left != moveleft)
            entity.mx *= -1;
          return this.index;
        },
      })

      this.fsm.push({
        name: "Confused", 
        index: 3,
        run: function(entity){
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight-100 && ydist > -entity.ysight-100)) {
            console.log("1");
            entity.transition = 10;
            entity.mx = 0;
            entity.jump();
            return 1;
          }
          if (entity.transition <= 0)
          {
            console.log("0");
            entity.transition = 0;
            entity.mx = -.5 * Math.sign(entity.mx);
            return 0;
          }
          else if (entity.transition == 30)
          {
            entity.mx *= -1;
            console.log("turn");
          }
          entity.transition--;
          return this.index;
        },
      })
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
    //player.vy = -5;
    player.vx = (2*(this.mx >= 0)-1) * 20;
    super.onHitPlayer(player);

  }


  getHitByEntity(player) {
		player.BounceOffEntity(this);
    player.y -= 20;
		//this.h=this.h/2;
		//this.die();
	}


  update(dt, frameCount) {
    //this.state = 2;
    this.state = this.fsm[this.state].run(this);

    super.update(dt, frameCount);
  }
}