
class Pig extends Mover {
  constructor(x,y) {
    x+=70;
    super(x,y);
    this.color = "pink";
    this.w = 25;
    this.h = 20;
    this.width = this.w;
    this.height = this.h;
    this.speed = 3;
    this.cloudParticlesOn=false;
    this.mx = 1;
    this.groundAccel=1;
    this.tx = x;
    this.ty = y;
    this.turnTime = 50;
    this.turnCounter = this.turnTime;
  }
  update(dt, frameCount) {
    if(this.x > this.tx+50) this.mx = -1;
    if(this.x < this.tx-50) this.mx = 1;
    if(this.turnCounter<=0||this.wallcolliding) {
      this.turnCounter = this.turnTime;
      this.mx = -this.mx;
    }
    super.update(dt, frameCount);
  }
}

function connectControls(controls, obj) {
  var result = {};
  for(var i in controls) {
    result[i] = {};
    for(var j in controls[i]) {
      result[i][j] = controls[i][j].bind(obj);
    }
  }
  return result;
}

