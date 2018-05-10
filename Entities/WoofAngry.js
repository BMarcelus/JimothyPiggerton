class Woof extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 40;
    this.jumpPower = 7;
    this.killPlayer = true;
    this.startY= y;
    this.mx = .5;
    this.transition = 0; //timer for transitions
    this.fsm = [];//state machine
    this.populateFsm();
    this.state = 0;//starting state
    this.xsight = 300;//line of sight
    this.ysight = 300;
    this.color1="#aaa";
    this.color2="#888";
    this.color3="#555";
    this.jumpSoundType = SOUNDMAP.woof; 
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
            return entity.toOne();
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
            return entity.toTwo();
          }
          entity.transition--;//tick down timer- might have to modify this so it's not fps dependent
          return this.index;
        },
      });

      this.fsm.push({
        name: "Charging", 
        index: 2,
        run: function(entity)
        {
          //console.log(this.wallcolliding);
          if (entity.transition ==1 && entity.vy == 0)//exit condition- end of animation
          {
            return entity.toThree();
          }
          if(entity.wallcolliding && entity.transition == 0)
          {
            entity.speed = -5;
            entity.transition = 20;

            entity.vx = -10 * entity.mx;
            entity.mx *= -1;
            entity.vy = -10;
            //entity.jump();
            //entity.killPlayer = false;
            //entity.mx *= -1;
          }
          //if (entity.transition == 20)
          //{
          //   entity.jump();
          //}

          if (entity.transition > 1)
            entity.transition--;

          else 
          {
            var dist = entity.game.player.x-entity.x;
            if (dist > -entity.xsight/2 && dist < entity.xsight/2 && entity.transition == 0)
            {
              entity.jump();
              //entity.killPlayer = true;
            }
          }
          
          return this.index;
        },
      });

      this.fsm.push({
        name: "Confused", 
        index: 3,
        run: function(entity){
          //var dist = entity.game.player.x-entity.x;
          //var ydist = entity.game.player.y-entity.y;
          /*if ((dist > -entity.xsight && dist < entity.xsight  && ydist < 100 && ydist > -100)) {//in case we find the player again
            toOne()
          }*/
          if (entity.transition <= 0) //otherwise
          {
            return entity.toZero();
          }
          else if (entity.transition == 30)
          {
            entity.mx *= -1; // turning around in confusion
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
		player.bounceOffEntity(this);
    player.y -= 20;
    this.width+=20;
    this.height-=10;
    this.movementStun += 10;
    this.toThree();
		//this.h=this.h/2;
		//this.die();
	}

  toZero()
  {
    this.transition = 0;
    this.mx = .5 * Math.sign(this.mx);
    this.speed = 3;
    return 0;//back to wandering
  }

  toOne()
  {
    this.transition = 10;//set the transition timer
    this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);//prepare for next state
    this.speed = 0;
    this.jump();//just a lil surprise animation
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
    this.transition = 60;
    this.mx = -1 * Math.sign(this.mx);//prep for next animation
    this.speed = 1;
    return 3;
  }

  update(dt, frameCount) {

    this.state = this.fsm[this.state].run(this); //update is all cleaned up now
    //if (!CELLMAP[this.game.world.pointCollides(this.x + this.mx * 200, this.y)]==1)// && CELLMAP[this.game.world.pointCollides(this.x + this.mx * 100, this.y - 2*this.game.world.s)] == 0)
    //{
     // this.jump();
    //}
    super.update(dt, frameCount);
  }
  drawShape(canvas,w,h) {
    var hh = h*.2;
    canvas.translate(0,-hh);
    h -= hh;
    canvas.fillStyle = this.color1;
    canvas.strokeStyle = "#000";
    canvas.lineWidth = 5;
    canvas.strokeRect(-w/2,-h,w,h);
    this.pathEars(canvas,w,h);
    canvas.stroke();
    this.pathTail(canvas,w,h);
    canvas.stroke();
    this.pathFeet(canvas,w,h,hh);    
    canvas.stroke();
    canvas.fillStyle = this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    this.pathEars(canvas,w,h);
    canvas.fill();
    this.pathFeet(canvas,w,h,hh);    
    canvas.fill();
    this.pathTail(canvas,w,h);    
    canvas.fill();
    canvas.fillStyle = this.color2;
    canvas.fillRect(-w/2,-h,w/3,h);
    // canvas.fillRect(-w/2,-h/6,w,h/6);
    canvas.translate(w/4,-h*.6);
    this.drawFace(canvas, w/2,h*.6);
  }
  pathFeet(canvas,w,h,hh) {
    hh-=2;
    canvas.beginPath();
    canvas.fillStyle=this.color3;
    var ww = w/10;
    var d = this.angle*10;
    canvas.rect(-w*.4+d,-d/2,ww,hh);
    canvas.rect(w*.3-ww-d,-d/2,ww,hh);
  }
  pathEars(canvas, w,h) {
    canvas.beginPath();
    canvas.rect(w*.35, -h-4, 4,4);
    canvas.rect(0, -h-4, 4,4);
    canvas.fillStyle = this.color2;    
  }
  pathTail(canvas,w,h) {
    canvas.beginPath();
    var ww = 8;
    var hh = 8;
    canvas.fillStyle=this.color3;
    canvas.rect(-w/2-ww*.8,-h-hh*.3,ww,hh);
    ww*=.8;
    hh*=.8;
    canvas.rect(-w/2-ww*1.5,-h-hh,ww,hh);
  }
  drawFace(canvas, w,h) {
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.beginPath();
    canvas.moveTo(-w/4-2, -h/4);
    canvas.lineTo(-w/4,-h/4+2);
    canvas.moveTo(w/4+2, -h/4);
    canvas.lineTo(w/4,-h/4+2);    
    canvas.stroke();
    canvas.lineWidth = 3;
    canvas.beginPath();
    canvas.moveTo(1,0);
    canvas.lineTo(0,0);
    canvas.stroke();
    canvas.translate(0,4);
    canvas.lineWidth = 1;  
    var m = Math.abs(this.vy);
    canvas.translate(0,-m/4);
    this.drawMouth(canvas,w*.6,h*.8);
    canvas.translate(0,m); 
    this.drawMouth(canvas,w*.6,h*.8); 
  }
  drawMouth(canvas, w,h) {
    canvas.beginPath();
    canvas.moveTo(-w/2,2);
    canvas.lineTo(-w/2,h/4);
    canvas.lineTo(-w/7,2);
    canvas.lineTo(0,h/4);
    canvas.lineTo(w/7,2);    
    canvas.lineTo(w/2,h/4);    
    canvas.lineTo(w/2,2);  
    canvas.stroke();
  }
}