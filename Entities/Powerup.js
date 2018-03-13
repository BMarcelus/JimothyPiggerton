class Powerup extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 50;
    this.color="black";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 0;
  }

  playerCollision(player) {
		return false;
	}

  getHitByEntity(player) 
  {
    this.onHitPlayer(player);
		this.die();
	}

  onHitPlayer(player) 
  {
    PLAYER_ABILITIES[this.power](player);
  }
}