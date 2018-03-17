addBlock({
  //Woof Block
  id: BLOCKS.length,
  name: "Woof",
  hide: true,   
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    canvas.fillStyle = 'rgba(20,20,20,.5)';
    canvas.fillRect(x,y,width,height);
  },
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Woof(x + width/2,y + height));
  },
});
