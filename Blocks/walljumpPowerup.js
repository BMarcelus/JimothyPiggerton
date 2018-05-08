addBlock({
  //End Block
  id: BLOCKS.length,
  name: "WallJump",
  hide: true,
  ignoreCollisions: true,
  draw: drawEntity,
  drawer: new doubleJump(),
  //entityCollision: function(entity, pos, dx, dy, cellPos) {
 //   entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = 1;
//    entity.game.world.forceRedraw();
  //},
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new wallJump(x + width/2,y + height));
  },
});
