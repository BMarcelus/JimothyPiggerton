addBlock({
  //Byrd Block
  id: BLOCKS.length,
  name: "Byrd",
  hide: true,   
  ignoreCollisions: true,
  drawer: new Byrd(),
  redraws: true,
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Byrd(x + width/2,y + height));
  },
});
