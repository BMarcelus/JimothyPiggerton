class BlockButton extends Button{
  constructor(x,y,w,h,groupID,callback,blockID){
    super(x,y,w,h,groupID,callback);
    this.blockID = blockID;
    this.world = 0;
    this.i = 0;
    this.j = 0;
  }
  draw(canvas){
    var dim = this.getPixelDimensions(canvas);
    if(this.blockID >= 0 && this.blockID < CELLMAP.length){
      var cell = CELLMAP[this.blockID];
      if(cell.draw){
        cell.draw(canvas,dim[0],dim[1],dim[2],dim[3],
          this.world,this.i,this.j);
      }    
    }
    canvas.strokeStyle = 'black';
    if(this.held)
      canvas.strokeStyle = 'gray';
    canvas.lineWidth = 5;
    canvas.strokeRect(dim[0],dim[1],dim[2],dim[3]);
  }
  
}