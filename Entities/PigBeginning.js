
class PigBeginning extends Pig {
  constructor(x,y) 
  {
    super(x,y);
    this.apples = 0;
  }
  update(dt, frameCount) 
  {  
    if (this.apples >= 4)
    {
      this.game.win();
    }
    super.update(dt, frameCount);
  }

  playerCollision()
  {
    if (this.game.player.y < this.y)
      this.game.player.BounceOffEntity(this);
  }

}