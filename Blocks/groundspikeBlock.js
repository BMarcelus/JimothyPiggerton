addBlock({
      //Spike floor
      id: 3,
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
      entityCollision: function(entity, pos) {
        if(entity.player && entity.grounded) entity.die();
        return true;
      }
});
