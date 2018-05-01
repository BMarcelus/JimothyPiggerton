addBlock({
  id: BLOCKS.length,
  name: "Pig",
  hide: true,   
  ignoreCollisions: true,
  redraws: true,
  drawer: new PigBeginning(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.pig = new PigBeginning(x + width/2,y + height);
    game.addEntity(game.pig);
  },
});
