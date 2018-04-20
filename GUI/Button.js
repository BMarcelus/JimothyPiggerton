class Button extends GUIElement {
  constructor(x,y,w,h,groupID,callback){
    super(x,y,w,h,groupID);
    this.callback = callback;
    this.held = false;
    this.isDefault = false;   //Will load as selected UI element
    this.selected = false;
    //buttonlinks can be filled in later 
    //(buttons to be linked to may not exist at this time)
    //buttonLinks[0] = UP
    //buttonLinks[1] = RIGHT
    //buttonLinks[2] = DOWN
    //buttonLinks[3] = LEFT
    this.buttonLinks = Array(4).fill(undefined);
    
  }
  setOptions(interactable, visible, isDefault){
    super.setOptions(interactable,visible);
    this.isDefault = isDefault;
  }
  setNeighbors(buttonList){
    this.buttonLinks = buttonList;
  }
  getNeighbor(direction){
    switch(direction){
      case "up":
        return buttonLinks[0];
      case "right":
        return buttonLinks[1];
      case "down":
        return buttonLinks[2];
      case "left":
        return buttonLinks[3];
      default:
        console.log("getNeighbor()->Expected: [up,right,down,left]");
        console.log("               Received: " + direction);
        return undefined;
    }
  }
  
  
  
  update(dt){}
  draw(canvas){}
}