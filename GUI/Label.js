class Label extends GUIElement{
  constructor(x,y,width,height,groupID
    ,text,font,textColor,textAlign){
    super(x,y,width,height,groupID);
    super.setOptions(false,true);
    this.text = text;
    this.font = font;
    this.textColor = textColor;
    this.textAlign = textAlign;
  }
  update(dt){}
  draw(canvas){
    var dim = this.getPixelDimensions(canvas);
    this.drawText(canvas,dim);
  }
  drawText(canvas,dim){
    canvas.font=this.font;
    canvas.fillStyle = this.textColor;
    canvas.textAlign = this.textAlign;
    canvas.textBaseline='middle';
    canvas.fillText(this.text,dim[0]+dim[2]/2,dim[1]+dim[3]/2,this.w*canvas.width*.9);
  }
}