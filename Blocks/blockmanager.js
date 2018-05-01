var BLOCKS = [{name:"Air", id: 0, ignoreCollisions: true},];

function drawEntity(canvas, x,y,width,height, world,ii,jj) {
  canvas.fillStyle = 'rgba(50,0,50,.5)';
  canvas.fillRect(x,y,width,height);
  this.drawer.x=x+width/2;
  this.drawer.y=y+height;
  this.drawer.draw(canvas);
}

function addBlock(b) {
  b.id = BLOCKS.length;
  BLOCKS.push(b);
}

function createBlocks() {
  return BLOCKS;
}