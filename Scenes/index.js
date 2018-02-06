loadScript('Scenes/', 'Scene.js').onload = function() {
  [
    "GameScene.js",
    "MenuScene.js",
    "PauseScene.js",
    "WinScene.js",
    "LevelEditorScene.js",
  ].forEach(function(e) {
    loadScript('Scenes/', e);
  })
}