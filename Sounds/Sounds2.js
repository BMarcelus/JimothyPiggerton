SOUNDMAP.crouch = new SoundSource("jumpSound1-1.m4a", 3);
SOUNDMAP.land = new SoundSource("jumpSound1-2.m4a", 0.75);
SOUNDMAP.jump = new SoundSource("crouch1-1.m4a", 3, 4);
SOUNDMAP.wallJump = new SoundSource("crouch1-1.m4a", 2);
SOUNDMAP.doubleJump = new SoundSource("jumpSound1-1.m4a", 5);
SOUNDMAP.powerup = new SoundSource("jumpSound1-2.m4a", 2);

SOUNDMAP.uncrouch = new SoundSource("crouch1-1.m4a", 4);
// SOUNDMAP.playerDeath = new SoundSource("rip.m4a");
SOUNDMAP.playerDeath = new SoundSource("Death.wav");
SOUNDMAP.levelComplete = new SoundSource("Level_Complete.wav", 1, 0.5);
SOUNDMAP.pigrip = 
// new MixAudio([
  // new SoundSource("guitarlick2.m4a", 1),
  // new SoundSource("rip.m4a", 3);
  new SoundSource("Swipe.wav", 3);
// ]);
SOUNDMAP.bounce = new SoundSource("Bounce2.wav", 1);
SOUNDMAP.throw = new SoundSource("Throw.wav");
SOUNDMAP.uimove = new SoundSource("UI_Move2.wav");
SOUNDMAP.uiselect = new SoundSource("UI_Select3.wav");
// SOUNDMAP.songtroll = new MusicSource("Beep.wav");
SOUNDMAP.footstep = new PickAudio([
  new SoundSource("Steps1.wav"),
  new SoundSource("Steps2.wav"),
  new SoundSource("Steps3.wav"),
  new SoundSource("Steps4.wav"),
  new SoundSource("Steps5.wav"),
])

