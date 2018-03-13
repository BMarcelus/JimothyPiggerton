addBlock({
  //End Block
  id: BLOCKS.length,
  name: "DoubleJump",
  hide: true,
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    var w= width;
    var h=height;
    canvas.fillStyle = 'rgba(50,50,0,.5)';
    canvas.fillRect(x,y,width,height);
  },
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new doubleJump(x + width/2,y + height));
  },
});
