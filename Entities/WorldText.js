class WorldText{
  constructor(x,y,w,text,font,inactiveColor,activeColor,
    changeDuration,isVisible){
    this.x = x;
    this.y = y;
    this.w = w;
    this.text = text;
    this.font = font;
    this.inactiveColor = inactiveColor;
    this.activeColor = activeColor;
    this.changeDuration = changeDuration;
    this.colorTimer = (isVisible) ? this.changeDuration : 0;
    this.visible = isVisible || false;
  }
  update(dt){
    if(this.visible){
      this.colorTimer += dt;
      if(this.colorTimer > this.changeDuration)
        this.colorTimer = this.changeDuration;
    } else {
      this.colorTimer -= dt;
      if(this.colorTimer < 0)
        this.colorTimer = 0;
    } 
  }
  setVisible(x){
    this.visible = x;
  }
  appear(){
    this.visible = true;
  }
  disappear(){
    this.visible = false;
  }
  draw(canvas){
    canvas.save();
    canvas.textAlign = 'center';
    var fillColor = colorLerp(this.inactiveColor,this.activeColor,this.colorTimer*1.0/this.changeDuration);
    canvas.globalAlpha = this.colorTimer*1.0/this.changeDuration;
    fillColor[3] = 1;
    canvas.fillStyle = makeColorStr(fillColor);
    canvas.font = this.font;
    canvas.fillText(this.text,this.x,this.y,this.w);
    canvas.restore();
  }

}