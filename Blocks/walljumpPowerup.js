addBlock({
  //End Block
  id: 7,
  name: "WallJump",
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
    world.world[jj][ii] = 0;
    world.forceRedraw();
    world.world[jj][ii] = this.id;
    game.addEntity(new wallJump(x + width/2,y + height));
  },
});
