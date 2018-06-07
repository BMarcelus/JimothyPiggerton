addLevel( function(nameSpace) {
  with(nameSpace) {

    return {
      name: "The Acorn",
      worldType: 1,
      grid: [
        [00,19,19,19,19,19,19,19,19,19,19,19,00,00,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,],
        [00,19,19,19,19,19,19,19,19,19,27,19,19,00,00,00,00,00,00,00,00,00,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19,18,],
        [19,19,18,19,19,19,19,18,19,19,27,19,19,19,00,00,00,00,00,00,00,00,00,19,19,18,18,18,19,19,18,18,19,19,19,19,19,18,27,19,19,18,19,18,19,19,18,18,],
        [04,18,19,19,18,19,19,18,19,19,27,19,19,19,00,00,00,00,00,00,00,00,00,00,19,19,19,18,18,19,18,19,19,19,19,18,18,18,27,18,19,19,18,18,18,18,27,23,],
        [23,23,18,19,18,19,19,18,19,18,27,19,19,00,00,00,00,00,00,00,00,00,00,00,00,19,18,18,18,18,18,19,19,19,18,19,19,19,27,18,18,18,19,18,18,19,27,18,],
        [00,18,18,18,18,19,18,18,19,18,27,19,19,00,00,00,00,00,00,00,00,00,00,00,09,09,23,23,23,23,27,18,19,19,18,23,23,23,27,18,18,18,27,18,19,19,27,19,],
        [00,00,18,18,18,18,18,18,18,18,18,19,00,00,00,00,00,00,00,00,00,00,00,00,00,00,19,18,18,18,27,18,19,18,19,19,19,19,27,18,18,18,27,18,18,18,27,19,],
        [00,00,00,19,23,23,27,18,18,18,19,19,00,00,00,00,00,19,19,19,19,19,19,19,00,00,19,19,18,18,02,18,18,19,19,19,19,19,19,19,18,18,27,18,18,19,27,00,],
        [00,19,19,19,19,18,27,18,18,18,19,19,00,00,00,19,19,19,19,19,19,19,19,19,19,19,00,19,22,18,02,18,18,19,19,19,19,19,19,19,19,18,27,18,18,00,27,00,],
        [00,19,19,19,19,18,27,18,18,19,19,19,00,00,00,19,19,19,19,19,19,19,19,19,19,19,00,00,00,18,27,18,18,19,19,19,00,00,00,00,19,18,27,18,18,27,18,00,],
        [00,19,19,18,19,18,27,18,19,18,19,19,00,00,00,19,19,19,19,18,18,19,19,19,18,19,19,00,00,18,27,18,18,19,19,23,23,23,23,09,19,18,27,18,18,27,18,00,],
        [00,19,19,18,19,18,18,18,18,18,19,00,00,00,00,19,18,19,18,19,18,18,18,19,18,19,19,00,00,18,27,18,18,18,18,18,18,19,19,00,19,18,27,18,18,27,00,00,],
        [00,00,19,18,18,18,19,19,19,19,19,00,00,00,00,19,18,18,18,19,18,18,18,18,18,18,00,00,00,18,27,18,18,18,02,19,19,19,00,00,00,18,27,18,18,27,00,00,],
        [00,00,19,19,19,18,19,18,19,19,00,00,00,00,19,19,19,19,18,18,18,18,19,19,18,19,19,00,00,18,02,18,18,19,27,19,19,00,00,00,00,18,27,18,18,27,00,00,],
        [00,00,00,00,19,18,18,18,19,19,00,00,00,00,00,00,00,19,19,18,18,18,19,19,19,19,19,00,00,18,02,18,19,19,27,00,00,00,00,00,23,23,27,18,18,27,00,00,],
        [00,00,00,00,00,18,18,18,19,00,00,00,00,00,00,00,00,09,23,23,27,18,18,18,19,19,19,00,18,18,27,18,00,00,27,00,00,00,00,00,00,18,27,18,18,27,00,00,],
        [00,00,00,00,00,18,18,18,00,00,00,00,00,00,00,00,00,00,00,18,27,18,18,19,19,19,19,00,18,18,27,18,00,00,27,18,18,00,00,00,00,18,27,18,18,27,00,00,],
        [00,00,00,00,00,18,18,18,00,00,00,00,00,00,00,00,00,00,00,00,27,18,19,19,00,00,19,00,18,18,27,18,00,00,02,18,18,00,00,00,00,18,27,18,18,27,00,00,],
        [01,01,01,01,01,01,01,18,00,00,00,00,00,00,00,00,00,00,00,02,27,18,00,00,00,00,19,00,18,18,27,18,00,00,02,18,18,00,00,00,00,18,27,18,18,18,00,00,],
        [01,01,01,01,01,01,01,18,18,00,15,00,00,00,00,00,00,00,00,18,27,18,00,00,00,00,07,00,18,18,18,18,00,00,27,18,18,00,00,00,00,02,27,18,18,18,00,00,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,02,18,27,18,18,00,00,00,00,00,18,18,18,18,00,00,27,18,18,18,00,00,00,18,27,18,18,18,05,00,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,00,00,00,00,00,02,18,27,18,18,18,00,00,00,18,18,18,18,18,00,00,27,18,18,18,00,00,02,18,27,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,03,03,03,03,03,18,18,27,18,18,18,18,00,18,18,18,18,18,18,18,00,02,18,18,18,18,00,18,18,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        [01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,],
        ],
      init(gameScene){
        var acornTutorial = new WorldText(1030,820,620,'ACORNS allow Jimothy to WALL JUMP','30px Noteworthy',[255,255,255,0],[255,255,255,1],25,false,'center');
        var acornTrigger = new TriggerZone(830,720,420,200,gameScene.player,acornTutorial.appear.bind(acornTutorial),undefined,acornTutorial.disappear.bind(acornTutorial),false)
        gameScene.entities.push(acornTutorial);
        gameScene.entities.push(acornTrigger);
      }
    };

  }
});
