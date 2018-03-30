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
    this.transition = 0; //timer for transitions
    this.fsm = [];//state machine
    this.populateFsm();
    this.state = 0;//starting state
    this.xsight = 300;//line of sight
    this.ysight = 300;
  }

  populateFsm()
  {
    this.fsm.push({//initializing the state
        name: "Wandering", 
        index: 0, // will have to change this to be fsm.length
        run: function(entity)
        {//this is what we want to run while in this state
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight-100 && ydist > -entity.ysight-100)) {//exit condition
            console.log("1");
            entity.transition = 10;//set the transition timer
            entity.mx = 0;//prepare for next state
            entity.jump();//just a lil surprise animation
            return 1;//change state
          }
          return this.index;//nothing has changed
        },
      });

    this.fsm.push({
        name: "Noticing", 
        index: 1,
        run: function(entity){
          if (entity.transition <= 0 && entity.vy == 0)//exit condition- end of animation
          {
            console.log("2");
            entity.transition = 0;
            entity.mx = 5 * (entity.game.player.x-entity.x < 0 ? -1 : 1);//speed up for chase
            return 2;//now we chasing
          }
          entity.transition--;//tick down timer- might have to modify this so it's not fps dependent
          return this.index;
        },
      });

      this.fsm.push({
        name: "Chasing", 
        index: 2,
        run: function(entity){
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist < -entity.xsight || dist > entity.xsight || ydist > entity.ysight-100 || ydist < -entity.ysight-100)) {//exit condition
            console.log("3");
            entity.transition = 50;
            entity.mx = .35 * Math.sign(entity.mx);//prep for next animation
            return 3;
          }
          else if ((dist > -entity.xsight/4 && dist < entity.xsight/4 && ydist > -150) || (dist > -entity.xsight/3 && dist < entity.xsight/3) && (ydist > -150 && ydist < -50))
          {// jump when close, didn't really merit its own state
            entity.jump();
          }
          var left = dist < 0;
          var moveleft = entity.mx < 0;
          if (entity.vy == 0 && left != moveleft)//chase player
            entity.mx *= -1;
          return this.index;
        },
      });

      this.fsm.push({
        name: "Confused", 
        index: 3,
        run: function(entity){
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight-100 && ydist > -entity.ysight-100)) {//in case we find the player again
            console.log("1");
            entity.transition = 10;
            entity.mx = 0;
            entity.jump();
            return 1;
          }
          if (entity.transition <= 0) //otherwise
          {
            console.log("0");
            entity.transition = 0;
            entity.mx = -.5 * Math.sign(entity.mx);
            return 0;//back to wandering
          }
          else if (entity.transition == 30)
          {
            entity.mx *= -1; // turning around in confusion
            console.log("turn");
          }
          entity.transition--;
          return this.index;
        },
      });
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

    this.state = this.fsm[this.state].run(this); //update is all cleaned up now

    super.update(dt, frameCount);
  }
}