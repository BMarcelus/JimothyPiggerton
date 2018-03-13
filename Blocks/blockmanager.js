var BLOCKS = [{name:"Air", id: 0},];


function addBlock(b) {
  b.id = BLOCKS.length;
  BLOCKS.push(b);
}

function createBlocks() {
  return BLOCKS;
}