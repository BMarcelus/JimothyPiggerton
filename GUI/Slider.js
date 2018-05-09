class Slider extends GUIElement{
  constructor(x,y,w,h,groupID,callback,defaultValue,barColor,handleColor,handleHeldColor){
    super(x,y,w,h,groupID);
    this.callback = callback;   //callback will be given [0-1] output value
    this.barColor = barColor;
    this.handleColor = handleColor;
    this.handleHeldColor = handleHeldColor;
    this.value = defaultValue;
  }
}