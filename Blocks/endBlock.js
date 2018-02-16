addBlock({
  //End Block
  id: 5,
  name: "End",
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    var w= width;
    var h=height;
    canvas.fillStyle = 'rgba(100,0,0,.5)';
    canvas.fillRect(x,y,width,height);
  },
  entityCollision: function(entity, pos) {
    if(entity.player && entity.grounded){
      entity.game.levelComplete();
    }
    return false;
  }
});
