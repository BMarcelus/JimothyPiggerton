addLevel( function(nameSpace) {
  with(nameSpace) {
    
    return {
      name: "birdJump",
      grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,17,0,14,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,1,1,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,17,0,0,17,0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,1,1,1,1,1,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,17,0,14,17,0,0,0,0,0,0,0,0,14,0,17,0,0,0,0,0,0,0,0,0,0,0,2,2,1,1,1,1,1,1,1,1,1,0,0,0,0,],
        [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,1,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,14,0,14,0,0,14,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,14,14,0,0,0,0,14,2,0,0,0,2,0,14,0,0,0,0,0,0,0,0,0,0,14,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,14,14,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,3,0,5,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,14,0,0,0,0,0,0,17,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,14,0,0,0,0,0,0,0,17,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,14,0,14,0,0,0,0,0,0,0,0,17,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,],
        [0,4,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,17,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        ]
  };
    
  }
});