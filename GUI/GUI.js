class GUIElement{
  constructor(x,y,w,h,groupID){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.interactable = true; //Can this element be moused over/used/clicked?       
    this.groupID = groupID;   //for ease of grouping UI elements (eg: 0 is main menu UI elements, 1 is level select elements etc)
    this.visible = true;      //should this be drawn? 
  }
  move(vx,vy){
    this.x += vx;
    this.y += vy;
  }
  contains(x,y){
    //x,y are in SCREEN PERCENT
    return x>= this.x && x<=this.x+this.w && y>=this.y && y<=this.y+this.h;
  }
  setVisibility(x){
    this.visible = x;
  }
  setOptions(interactable, visible){
    this.interactable = interactable;
    this.visible = visible;
  }
  getPixelDimensions(canvas){
    //returns pixel [x,y,width,height] for this button
    return [this.x*canvas.width, this.y*canvas.height, this.w*canvas.width, this.h*canvas.height];
  }
  update(dt){}
  draw(canvas){}
}
function rectDimFromCenter(x,y,width,height){
  var result = [];
  result.push(x-width/2);
  result.push(y-height/2);
  result.push(width);
  result.push(height);
  return result;
}
function getPercentPoint(e){
  //Will return percentPoint relative to object clicked in
  //eg: if there was a smaller canvas in the game, clicking on that
  //would yield the percent point within that smaller canvas.
  //Currently this should never happen.
  var point = [];
  point.push(e.offsetX/e.path[0].width);
  point.push(e.offsetY/e.path[0].height);
  return point;
}
function moveAllGUI(vx,vy){
  for(var i = 0; i < guiList.length; i++){
    guiList[i].move(vx,vy);
  }
}
function getButtons(guiList){
  var result = [];
  for(var i = 0; i < guiList.length; i++){
    if(guiList[i] instanceof Button){
      result.push(guiList[i]);
    }
  }
  return result;
}
function getGUIInGroup(n){
  var result = [];
  for(var i = 0; i < guiList.length; i++){
    if(guiList[i].groupID == n){
      result.push(guiList[i]);
    }
  }
  return result;
}
function handleMouseDown(e,buttonList){
  for(var i = 0; i < buttonList.length; i++){
    var percentPoint = getPercentPoint(e);
    if(buttonList[i].contains(percentPoint[0],percentPoint[1]) 
        && buttonList[i].interactable){
      buttonList[i].held = true;
    }
  }
}
function handleMouseUp(e,buttonList){
  for(var i = 0; i < buttonList.length; i++){
    var percentPoint = getPercentPoint(e);
    if(buttonList[i].contains(percentPoint[0],percentPoint[1])
        && buttonList[i].interactable && buttonList[i].held){
      buttonList[i].held = false;
      buttonList[i].callback();
    } else {
      buttonList[i].held = false;
    }
  }
}
function handleMouseMove(self, e, buttonList){
  for(var j = 0; j < buttonList.length; j++){
    if(buttonList[j].held)
      return; //If a button is currently being held (meaning this is a mouse drag
              //that was initiated on a valid button), bail out
  }
  for(var i = 0; i < buttonList.length; i++){
    var percentPoint = getPercentPoint(e);
    if(buttonList[i].contains(percentPoint[0],percentPoint[1])){
      self.selectedButton.selected = false;
      buttonList[i].selected = true;
      self.selectedButton = buttonList[i];
      break;    //In case of overlapping buttons, exit loop after first contains
    } 
  }
}



