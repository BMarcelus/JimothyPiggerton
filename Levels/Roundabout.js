addLevel( function(nameSpace) {
  with(nameSpace) {

    return {
      name: "Roundabout",
      worldType: 1,
      grid: [
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,01,09,09,09,09,09,09,01,00,00,00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,09,09,09,09,09,09,09,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,15,00,00,00,00,01,00,00,02,00,15,00,02,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,09,09,09,09,09,01,01,22,00,00,09,09,09,01,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,02,01,09,09,09,09,09,09,09,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,02,00,00,00,00,00,00,00,00,02,02,00,00,00,00,00,00,00,00,00,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,02,00,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,02,02,00,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,15,00,02,02,00,00,02,02,00,00,00,00,00,09,09,09,09,01,00,00,00,15,00,00,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,09,09,09,09,01,02,00,00,02,00,00,00,00,00,00,00,00,00,01,09,09,09,09,09,09,01,01,01,01,01,00,00,00,],
        [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,00,00,02,00,00,00,00,00,00,00,00,02,01,00,00,00,00,00,00,01,01,01,01,01,01,01,00,],
        [00,00,00,00,00,00,00,00,01,01,00,00,00,00,00,00,00,00,02,01,00,00,02,00,01,09,09,09,01,00,00,00,02,01,00,00,00,00,00,00,01,01,01,01,01,01,01,00,],
        [00,00,00,00,00,00,00,01,01,01,00,00,00,00,00,00,00,00,01,01,00,00,02,00,01,00,00,00,01,00,15,00,02,01,00,00,00,00,00,00,01,01,01,01,01,01,01,00,],
        [00,04,00,00,00,01,01,01,01,01,00,00,00,00,00,15,00,02,01,01,02,00,02,00,01,00,00,00,01,09,09,09,09,01,00,00,00,00,00,00,01,01,01,01,01,01,01,00,],
        [01,01,01,01,01,01,01,01,01,01,00,00,09,09,09,01,01,01,01,01,02,00,00,00,01,00,00,00,01,00,00,00,00,01,00,00,00,00,00,00,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,01,01,01,01,01,00,00,00,02,01,00,00,00,01,00,00,00,00,01,00,00,00,00,00,00,00,00,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,02,00,01,01,00,00,01,00,00,01,01,01,00,00,00,00,00,00,00,00,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,02,00,01,00,01,01,00,01,01,00,00,01,01,01,01,00,00,00,00,00,00,00,00,00,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,01,01,00,00,00,00,00,00,00,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,01,01,01,01,01,00,00,00,00,00,00,00,00,00,01,01,01,01,01,00,00,00,00,00,00,00,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,01,01,00,00,00,00,00,00,00,01,01,01,01,01,01,01,01,00,00,00,05,00,00,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,00,00,00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        ]
    };

  }
});
