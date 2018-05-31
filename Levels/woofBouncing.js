addLevel( function(nameSpace) {
  with(nameSpace) {

    return {
      name: "Woof-bouncing",
      worldType: 1,
      grid: [
        [01,01,00,00,00,00,00,00,00,00,00,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,],
        [01,01,00,00,00,00,00,00,00,00,00,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,],
        [01,01,01,00,00,00,00,00,05,00,00,18,18,18,18,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,09,09,09,09,09,09,09,09,23,23,23,23,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,01,01,],
        [01,01,01,00,00,00,00,00,00,00,00,18,18,18,18,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,01,01,01,],
        [01,01,01,00,00,14,00,00,00,00,14,18,18,18,18,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,00,00,00,00,00,00,00,00,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,09,09,09,01,01,01,00,00,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,00,00,00,00,00,00,00,00,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,00,00,00,00,00,00,00,00,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,00,00,01,01,01,01,01,],
        [01,01,01,00,00,00,00,00,00,00,00,18,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,15,00,00,00,01,00,00,00,00,01,01,01,01,],
        [01,01,01,01,01,00,00,00,18,18,18,01,01,01,23,23,23,23,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,09,09,09,09,09,09,00,00,00,00,00,00,01,01,01,],
        [01,01,01,01,01,00,16,00,01,01,01,01,01,01,01,01,01,02,23,23,23,23,00,00,00,00,00,00,00,00,16,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,],
        [01,01,01,01,01,09,09,09,01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,01,01,01,01,01,00,00,00,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,],
        [01,01,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,09,09,09,01,01,14,00,00,00,00,00,00,00,00,00,00,00,14,01,01,],
        [01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,09,09,01,01,01,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,],
        [04,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,],
        [01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,00,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,16,01,01,00,00,00,00,00,00,00,00,00,00,01,01,01,00,00,00,16,00,00,00,00,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,01,01,01,00,00,00,00,00,00,00,00,00,00,01,01,01,03,03,03,03,03,00,00,00,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,03,03,03,03,01,01,01,03,00,00,00,00,00,00,16,00,00,01,01,01,01,01,01,01,01,03,03,03,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,03,03,03,03,03,03,03,03,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        ]
    };

  }
});
