addBlock(function() { return {
  //Byrd Block
  id: BLOCKS.length,
  name: "Owl",
  hide: true,   
  ignoreCollisions: true,
  drawer: new Owl(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Owl(x + width/2,y + height));
  },
}});
