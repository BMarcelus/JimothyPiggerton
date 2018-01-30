loadScript('Scenes/', 'Scene.js').onload = function() {
  [
    "GameScene.js",
    "MenuScene.js",
    "PauseScene.js",
    "WinScene.js",
  ].forEach(function(e) {
    loadScript('Scenes/', e);
  })
}