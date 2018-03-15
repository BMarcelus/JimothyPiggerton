addBlock({
  //Enemy Block
  id: BLOCKS.length,
  name: "Enemy",
  hide: true,   
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    canvas.fillStyle = 'rgba(50,0,50,.5)';
    canvas.fillRect(x,y,width,height);
  },
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Enemy(x + width/2,y + height));
  },
});
