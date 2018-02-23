addBlock({
  //Start Block
  id: 4,
  name: "Start",
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    canvas.fillStyle = 'rgba(0,100,0,.5)';
    canvas.fillRect(x,y,width,height);
  },
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.player.x = x + width/2;
    game.player.y = y + height;
  },
});