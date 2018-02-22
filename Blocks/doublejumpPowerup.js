addBlock({
  //End Block
  id: 8,
  name: "DoubleJump",
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    var w= width;
    var h=height;
    canvas.fillStyle = 'rgba(50,50,0,.5)';
    canvas.fillRect(x,y,width,height);
  },
  entityCollision: function(entity, pos) {
    if(entity.player){
      PLAYER_ABILITIES[2](entity);
    }
    return false;
  }
});
