class VgdcSplashScreen extends SplashScreenScene {
  constructor(playsIntro) {
    super(playsIntro, "vgdc.png", MenuScene);
    this.endingTime = 400;
    // this.showTime = 700;
    this.iconScale = 0.6;
  }
}