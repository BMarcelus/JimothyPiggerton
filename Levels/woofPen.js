addLevel( function(nameSpace) {
  with(nameSpace) {

    return {
      name: "Woof Pen",
      worldType: 1,
      grid: [
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,19,19,19,19,19,00,00,00,00,00,00,00,00,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,19,19,19,19,19,00,00,00,00,00,00,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,00,00,00,00,00,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19,00,00,00,00,00,00,00,00,],
        [00,00,00,19,19,19,19,00,00,00,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,18,19,19,19,19,18,18,19,19,19,18,18,19,00,00,00,00,00,00,00,00,],
        [00,00,19,19,19,19,19,19,19,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,18,19,18,18,19,19,19,18,18,19,18,18,19,19,00,00,00,00,00,00,00,00,],
        [00,19,19,19,19,19,19,19,19,19,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,19,18,19,19,19,18,19,19,19,18,18,18,18,19,00,00,00,00,00,00,00,00,00,],
        [19,19,19,19,19,19,19,19,19,19,00,00,00,00,00,00,19,19,19,19,19,19,18,19,19,19,19,18,18,18,19,18,19,19,18,18,19,19,19,00,00,00,00,00,00,00,00,00,],
        [19,19,18,18,19,19,18,19,19,19,00,00,00,00,00,00,19,19,19,19,18,18,19,19,19,19,19,19,18,18,18,18,19,18,18,18,19,19,00,00,00,00,00,00,00,00,00,00,],
        [19,19,19,18,18,19,18,18,18,19,00,00,00,00,00,00,19,19,19,19,19,18,19,19,18,19,19,19,18,18,18,19,19,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,],
        [19,19,19,19,18,18,18,18,19,19,00,00,00,00,00,00,19,19,18,18,18,18,19,18,19,19,19,18,18,18,19,19,00,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,],
        [00,19,18,19,18,18,18,19,19,00,00,00,00,00,00,00,00,19,19,19,18,18,18,19,19,19,19,19,18,18,18,00,00,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,],
        [00,19,19,18,18,18,19,19,00,00,00,00,00,00,00,00,00,00,19,19,18,18,19,19,18,19,18,18,27,18,18,00,00,18,18,18,18,00,00,01,00,00,00,00,00,00,00,00,],
        [00,00,00,19,18,18,19,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,19,18,19,19,19,27,18,18,00,18,18,18,18,18,16,00,01,01,00,00,00,00,00,00,00,],
        [00,00,00,00,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,18,19,19,00,19,27,23,23,09,01,01,01,01,01,01,01,01,01,01,00,00,05,00,00,00,],
        [00,00,00,00,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,19,00,00,00,18,18,18,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [00,00,00,00,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,19,00,00,18,18,18,18,18,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [04,00,00,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,09,23,23,18,18,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,09,09,09,00,00,00,00,00,00,00,00,00,00,00,00,18,18,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,18,18,18,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,00,00,16,00,00,00,00,00,00,18,18,18,18,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        ]
    };

  }
});
