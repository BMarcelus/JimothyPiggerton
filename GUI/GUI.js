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

function handleMouseDown(e,guiList){
  for(var i = 0; i < guiList.length; i++){
    var percentPoint = getPercentPoint(e);
    if(guiList[i].contains(percentPoint[0],percentPoint[1]) 
        && guiList[i].interactable){
      guiList[i].callback();
    }
  }
}
function handleMouseUp(e,guiList){

}


