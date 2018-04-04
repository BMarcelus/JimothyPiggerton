
class PigBeginning extends Pig {
  //constructor(x,y) 
  //{
    //super(x,y);
  //}
  //update(dt, frameCount) 
  //{  
    //super.update(dt, frameCount);
  //}

  playerCollision()
  {
    if (this.game.player.y < this.y)
      this.game.player.BounceOffEntity(this);
  }

}