addBlock({
  id: BLOCKS.length,
  name: "Pig",
  hide: true,   
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    canvas.fillStyle = 'rgba(20,20,20,.5)';
    canvas.fillRect(x,y,width,height);
  },
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.pig = new PigBeginning(x + width/2,y + height);
    game.addEntity(game.pig);
  },
});
