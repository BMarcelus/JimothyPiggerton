addBlock({
  //End Block
  id: BLOCKS.length,
  name: "WallJump",
  hide: true,
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    var w= width;
    var h=height;
    canvas.fillStyle = 'rgba(50,0,50,.5)';
    canvas.fillRect(x,y,width,height);
  },
  //entityCollision: function(entity, pos, dx, dy, cellPos) {
 //   entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = 1;
//    entity.game.world.forceRedraw();
  //},
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new wallJump(x + width/2,y + height));
  },
});
