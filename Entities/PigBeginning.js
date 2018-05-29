
class PigBeginning extends Pig {
  constructor(x,y) 
  {
    super(x,y);
    this.apples = 0;
    this.fsm = [];//state machine
    this.populateFsm();
    this.state = 0;//starting state
    this.xsight = 100;//line of sight
    this.ysight = 100;
    this.transition = 1;
    this.animationState = 2;
    this.speed = 3;
    this.groundAccel = 1;
  }
  update(dt, frameCount) 
  {  
    if (this.apples >= 4)
    {
      this.game.win();
    }
    this.state = this.fsm[this.state].run(this);
    super.update(dt, frameCount);
  }

  playerCollision()
  {
    if (this.game.player.y < this.y && this.game.player.vy>0)
      this.game.player.bounceOffEntity(this, 22);
  }

  populateFsm()
  {
    this.fsm.push({//initializing the state
        name: "Following", 
        index: 0, // will have to change this to be fsm.length
        run: function(entity)
        {//this is what we want to run while in this state
          if (entity.transition == 1)
            entity.toZero();
          else if (entity.transition > 1)
            entity.speed = 0;
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight && ydist > -entity.ysight)) {//exit condition
            return entity.toOne();
          }
          if (entity.wallcolliding)
          {
            entity.transition = 10;
            //return entity.toOne();
          }
          return this.index;//nothing has changed
        },
      });

    this.fsm.push({
        name: "Waiting", 
        index: 1,
        run: function(entity){
          if (entity.vy == 0)
            entity.speed = 0;
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if (dist > -entity.xsight/1.5 && dist < entity.xsight/1.5 && ydist < 100 && entity.game.player.vy > 0)
          {
            entity.speed = 3;
            entity.jump();
          }
          if ((dist < -entity.xsight || dist > entity.xsight)) {//exit condition
            return entity.toZero();
          }
          //entity.transition--;//tick down timer- might have to modify this so it's not fps dependent
          return this.index;
        },
      });

      this.fsm.push({
        name: "Charging", 
        index: 2,
        run: function(entity)
        {
          //console.log(this.wallcolliding);
          
          
          return this.index;
        },
      });
  }
  toZero()
  {
    this.transition = 0;
    this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);
    this.speed = 3;
    return 0;//back to wandering
  }

  toOne()
  {
    this.transition = 10;//set the transition timer
    //this.mx = -1 * (this.game.player.x-this.x > 0 ? -1 : 1);//prepare for next state
    this.speed = 0;
    //this.jump();//just a lil surprise animation
    return 1;//change state
  }

  toTwo()
  {
    this.transition = 0;
    this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);//speed up for chase
    this.speed = 10;
    return 2;//now we chasing
  }

  toThree()
  {
    this.transition = 120;
    this.mx = -1 * Math.sign(this.mx);//prep for next animation
    this.speed = 1;
    return 3;
  }


}