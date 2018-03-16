addBlock({
      //Spike floor
      id: BLOCKS.length,
      name: "Ground Spike",
      solid: true,
      redraws: false,
      groundBlock: true,
      draw: function(canvas, x,y,width,height, world,ii,jj) {
        var w= width;
        var h=height;
        var dd = width*.1;
        CELLMAP[2].draw(canvas,x+dd,y+dd,width-dd*2,height-dd*2,world,ii.jj)
        var dh = h * .4;
        CELLMAP[1].draw(canvas,x,y+dh, width, height-dh, world, ii,jj);
      },
      entityCollision: function(entity, pos, dx, dy) {
        if(entity.player && dy>0) entity.die();
        return true;
      }
});
