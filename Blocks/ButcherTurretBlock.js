addBlock(function() { return {
  //Enemy Block
  id: BLOCKS.length,
  name: "ButcherTurret",
  hide: true,   
  ignoreCollisions: true,
  drawer: new Enemy(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new ButcherTurret(x + width/2,y + height/2));
  },
}});
