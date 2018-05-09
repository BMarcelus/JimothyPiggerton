class Slider extends Button{
  constructor(x,y,w,h,groupID,callback,handleWidth,defaultValue,
    barColor,handleColor,handleHeldColor,handleOutlineColor,handleOutlineWeight){
    super(x,y,w,h,groupID,callback);
    this.barColor = barColor;
    this.handleWidth = handleWidth;
    this.handleColor = handleColor;
    this.handleHeldColor = handleHeldColor;
    this.handleOutlineColor = handleOutlineColor;
    this.handleOutlineWeight = handleOutlineWeight || 0;
    this.value = defaultValue;
    this.selectable = false;
  }
  update(dt,percentPoint){
    if(this.held){
      this.setValue((percentPoint.x-this.x)/this.w);
    }    
  }
  draw(canvas){
    canvas.fillStyle = this.handleBarColor;
    var dim = this.getPixelDimensions(canvas);
    dim[1] += dim[3]/3;
    dim[3] /= 3;
    canvas.fillRect(dim[0],dim[1],dim[2],dim[3]);

    canvas.fillStyle = (this.held) ? this.handleHeldColor : this.handleColor;
    canvas.strokeStyle = this.handleOutlineColor;
    canvas.lineWidth = this.handleOutlineWidth;
    dim = {x:0,y:0,w:0,h:0};
    dim.x = ((this.value * this.w)+this.x-this.handleWidth/2)*canvas.width;
    dim.y = this.y*canvas.height;
    dim.w = this.handleWidth*canvas.width;
    dim.h = this.h*canvas.height;
    canvas.fillRect(dim.x,dim.y,dim.w,dim.h);
    canvas.strokeRect(dim.x,dim.y,dim.w,dim.h);
  }
  setValue(x){
    this.value = x;
    this.value = (this.value > 1) ? 1 : this.value;
    this.value = (this.value < 0) ? 0 : this.value;
    if(this.callback) this.callback(this.value);
  }
  contains(x,y){
    return x>= this.x+this.value*this.w-this.handleWidth/2 && x<=this.x+this.value*this.w+this.handleWidth/2 && y>=this.y && y<=this.y+this.h;
  }
}