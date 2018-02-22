addBlock({
  //End Block
  id: 7,
  name: "WallJump",
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    var w= width;
    var h=height;
    canvas.fillStyle = 'rgba(50,0,50,.5)';
    canvas.fillRect(x,y,width,height);
  },
  entityCollision: function(entity, pos) {
    if(entity.player){
      PLAYER_ABILITIES[1](entity);
    }
    return false;
  }
});
