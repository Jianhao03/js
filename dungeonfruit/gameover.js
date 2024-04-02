class gameover extends Phaser.Scene {
  constructor() {
      super({ key: "gameover" });
  }

  preload() {
    // Load game over image
    this.load.image("gameover", "assets/gameover.png");
}

create() {
    this.add.image(0, 0, 'gameover').setOrigin(0);


  // Listen for the Enter key
  this.input.keyboard.on('keydown-ENTER', this.restartGame, this);
}

restartGame() {
  // Restart level 1 scene
  this.scene.start('dungeon_fruit_map_1');
}
}