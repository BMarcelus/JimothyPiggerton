class LevelTesterScene extends GameScene {
  constructor(level, prevScene) {
    super(level);
    this.prevScene = prevScene;
    this.keyMap[27] = {down: this.back.bind(this)};
  }
  back() {
    this.driver.setScene(this.prevScene);
  }
  win() {
    this.back();
  }
}