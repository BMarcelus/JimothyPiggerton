var BLOCKS = [{name:"Air", id: 0, ignoreCollisions: true},];


function addBlock(b) {
  b.id = BLOCKS.length;
  BLOCKS.push(b);
}

function createBlocks() {
  return BLOCKS;
}