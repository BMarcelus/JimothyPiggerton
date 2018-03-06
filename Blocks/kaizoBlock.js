addBlock({
  name: "Kaizo",
  solid: false,
  id: BLOCKS.length,
  draw: function(canvas, x,y,w,h, world,i,j) {
  },
  entityCollision: function(entity, pos, dx, dy, cellPos) {
    if(dy<0) {
      entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = 1;
      entity.game.world.forceRedraw();
    }
  },
});
