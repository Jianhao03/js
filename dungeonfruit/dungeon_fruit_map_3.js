class dungeon_fruit_map_3 extends Phaser.Scene {
  constructor() {
    super({ key: "dungeon_fruit_map_3" });
    this.hearts = [];
    this.maxHearts = 3; // Set the maximum number of hearts
    this.playerHearts = 3; // Initialize player's heart count
    window.fruit = 0; // Initialize the fruit count
  }

    // Initialize method to set the player data
    init(data) {
      this.player = data.player;
    }
    
  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON(
      "dungeon_fruit_map_3",
      "assets/dungeon_fruit_map_3.tmj"
    );
    // Step 2 : Preload any images here
    this.load.image("buildimg", "assets/build_atlas.png");
    this.load.image("castleimg", "assets/Castle2.png");
    this.load.image("heartimg", "assets/Heart.png");
    this.load.image("forestimg", "assets/forest_tiles.png");
    this.load.image("fruitimg", "assets/smallpixel.png");
    this.load.spritesheet("knight", "assets/knight.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("zombie", "assets/zombie.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("mango", "assets/mangopixel.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("applepay", "assets/applepay.mp3");
    this.load.audio("mchurt", "assets/mchurt.mp3");
    //this.load.spritesheet("fire", "assets/fire.png", {
    //frameWidth: 40,
    //frameHeight: 70,
    // });
    //this.load.spritesheet("skelaton", "assets/skelaton.png",{ frameWidth:64, frameHeight:64 });
  } // end of preload //

  create() {
    console.log("animationScene");

    this.applepaySnd = this.sound.add("applepay");
    this.mchurtSnd = this.sound.add("mchurt");

    // Add hearts with adjusted offset
    this.hearts = [];
    for (let i = 0; i < this.maxHearts; i++) {
      let heart = this.add
        .image(50 + i * 60, 50, "heartimg")
        .setScrollFactor(0)
        .setScale(0.08)
        .setDepth(1)
        .setVisible(true);

      this.hearts.push(heart);
    }

    //this.anims.create({
    /// key: "slow frame",
    //frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
    //frameRate: 5,
    //repeat: -1,
    //});

    //knight animation//
    this.anims.create({
      key: "knight-up",
      frames: this.anims.generateFrameNumbers("knight", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "knight-left",
      frames: this.anims.generateFrameNumbers("knight", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "knight-down",
      frames: this.anims.generateFrameNumbers("knight", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "knight-right",
      frames: this.anims.generateFrameNumbers("knight", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //end of player knight//

    //zombie//
    this.anims.create({
      key: "zombie-up",
      frames: this.anims.generateFrameNumbers("zombie", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie-left",
      frames: this.anims.generateFrameNumbers("zombie", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie-down",
      frames: this.anims.generateFrameNumbers("zombie", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "zombie-right",
      frames: this.anims.generateFrameNumbers("zombie", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //zombie end//

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "dungeon_fruit_map_3" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildTiles = map.addTilesetImage("build_atlas", "buildimg");
    let castleTiles = map.addTilesetImage("Castle2", "castleimg");
    let forestTiles = map.addTilesetImage("forest_tiles", "forestimg");
    let fruitTiles = map.addTilesetImage("smallpixel", "fruitimg");

    //Step 5  create an array of tiles
    let tilesArray = [buildTiles, castleTiles, forestTiles, fruitTiles];

    // Step 6  Load in layers by layers
    this.holeLayer = map.createLayer("hole", tilesArray, 0, 0);

    this.roadLayer = map.createLayer("road", tilesArray, 0, 0);

    this.bridgeLayer = map.createLayer("bridge", tilesArray, 0, 0);

    this.tips_stuffLayer = map.createLayer("tips_stuff", tilesArray, 0, 0);

    //object layer
    // let fruit =map.findObject("Object1Layer", (obj) => obj.name === "fruit")

    //Add main player here with physics.add.sprite

    // Add time event / movement here

    this.player = this.physics.add.sprite(41, 233, "knight");
    window.player = this.player;
    this.player.body
      .setSize(this.player.width * 0.5, this.player.height * 0.4)
      .setOffset(18, 34);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.holeLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.holeLayer);

    this.tips_stuffLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.tips_stuffLayer);

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
        //end of player//
    //     this.fruitCollectedText = this.add.text(20, 100, "Fruits Collected: 0", { fontSize: "20px", fill: "#ffffff" }).setScrollFactor(0);
    
    //     console.log("showInventory");
    
    // // start another scene in parallel
    // this.scene.launch("showInventory");

    //enemy//
    let zombie1 = map.findObject("enemyLayer", (obj) => obj.name === "enemy01");
    let zombie2 = map.findObject("enemyLayer", (obj) => obj.name === "enemy02");
    let zombie3 = map.findObject("enemyLayer", (obj) => obj.name === "enemy03");
    let zombie4 = map.findObject("enemyLayer", (obj) => obj.name === "enemy04");
    let zombie5 = map.findObject("enemyLayer", (obj) => obj.name === "enemy05");

    if (zombie1 && zombie2 && zombie3 && zombie4 && zombie5) {
      this.zombie1 = this.physics.add.sprite(zombie1.x, zombie1.y, "zombie").play("zombie-up");
      this.zombie2 = this.physics.add.sprite(zombie2.x, zombie2.y, "zombie").play("zombie-down");
      this.zombie3 = this.physics.add.sprite(zombie3.x, zombie3.y, "zombie").play("zombie-up");
      this.zombie4 = this.physics.add.sprite(zombie4.x, zombie4.y, "zombie").play("zombie-down");
      this.zombie5 = this.physics.add.sprite(zombie5.x, zombie5.y, "zombie").play("zombie-up");
    
      // Add physics bodies
      this.physics.add.existing(this.zombie1);
      this.physics.add.existing(this.zombie2);
      this.physics.add.existing(this.zombie3);
      this.physics.add.existing(this.zombie4);
      this.physics.add.existing(this.zombie5);
    
      // Set offset for each zombie body
      this.zombie1.body.setSize(this.zombie1.width * 0.5, this.zombie1.height * 0.4).setOffset(18, 34);
      this.zombie2.body.setSize(this.zombie2.width * 0.5, this.zombie2.height * 0.4).setOffset(18, 34);
      this.zombie3.body.setSize(this.zombie3.width * 0.5, this.zombie3.height * 0.4).setOffset(18, 34);
      this.zombie4.body.setSize(this.zombie4.width * 0.5, this.zombie4.height * 0.4).setOffset(18, 34);
      this.zombie5.body.setSize(this.zombie5.width * 0.5, this.zombie5.height * 0.4).setOffset(18, 34);
    } else {
      console.error("One or more zombie objects not found in the Tiled map.");
    }

    this.physics.add.overlap(
      this.player,
      [
        this.zombie1,
        this.zombie2,
        this.zombie3,
        this.zombie4,
        this.zombie5,
      ],
      this.hitZombie,
      null,
      this
    );

    // in create, add tweens

    //zombie1//
    this.tweens.add({
      targets: this.zombie1,
      y: 170,
      flipY: false,
      yoyo: true,
      duration: 2000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie1.play("zombie-down");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie1.play("zombie-up");
      },
    });
    //end of zombie1//

    //zombie2//
    this.tweens.add({
      targets: this.zombie2,
      y: 278,
      flipY: false,
      yoyo: true,
      duration: 5000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie2.play("zombie-up");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie2.play("zombie-down");
      },
    });
    //end of zombie2//

    //zombie3//
    this.tweens.add({
      targets: this.zombie3,
      y: 170,
      flipY: false,
      yoyo: true,
      duration: 5000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie3.play("zombie-down");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie3.play("zombie-up");
      },
    });
    //end of zombie3//

    //zombie4//
    this.tweens.add({
      targets: this.zombie4,
      y: 280,
      flipY: false,
      yoyo: true,
      duration: 6000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie4.play("zombie-up");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie4.play("zombie-down");
      },
    });
    //end of zombie4//

    //zombie5//
    this.tweens.add({
      targets: this.zombie5,
      y: 170,
      flipY: false,
      yoyo: true,
      duration: 4000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie5.play("zombie-down");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie5.play("zombie-up");
      },
    });
    //end of zombie5//

    //mango object//
    let mango = map.findObject("objectLayer", (obj) => obj.name === "mango");

    this.mango = this.physics.add.sprite(mango.x, mango.y, "mango");

    this.physics.add.overlap(
      this.player,
      this.mango,
      this.hitFruit,
      null,
      this
    );
    //end of mango object//

    // Initialize player health
    this.playerHealth = 3; // Assuming the player starts with 3 health points

  } // end of create //

  updateHearts() {
    // Show or hide hearts based on player's health
    for (let i = 0; i < this.maxHearts; i++) {
        if (i < this.playerHearts) {
            this.hearts[i].setVisible(true);
        } else {
            this.hearts[i].setVisible(false);
        }
    }

    // Check for game over condition
    if (this.playerHearts <= 0) {
        this.scene.start("gameover"); // Transition to game over scene
    }
}

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("knight-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("knight-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("knight-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("knight-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }
    //exit from yellow portal//
    if (this.player.x < 16 && this.player.y > 159 && this.player.y < 295) {
      console.log("Door3");
      this.dungeon_fruit_map_2();
    }
//       // Check if the victory condition is met (3 fruits collected across all maps)
//   if (window.fruit === 3) {
//     // Transition to victory scene
//     this.scene.start("victoryScene");
// }
  } // end of update //

  //call this function when overlap\\

  //enemy//
  hitZombie(player, item) {
    console.log("hitZombie");
    this.mchurtSnd.play();
    this.cameras.main.shake(500); // 500ms
    //(player knockback) player.x = player.x - 50
    item.disableBody(true, true);

    // Reduce player hearts
    this.playerHearts--;

    // Update hearts display
    this.updateHearts();

    return false;
  }

//fruit//
hitFruit(player, item) {
  console.log("hitFruit")
  this.applepaySnd.play();
  // window.fruit++; // Increment the fruit count
  item.disableBody(true, true);
  // this.fruitCollectedText.setText("Fruits Collected: " + window.fruit); // Update the text
  // if (window.fruit === 3) {
  //     // Transition to victory scene or display victory message
  //     this.scene.start("victoryScene");
  // }
  return false;
}

  dungeon_fruit_map_2(player, tile) {
    console.log("dungeon_fruit_map_2 function");
    let playerPos = {};
    playerPos.x = 225;
    playerPos.y = 221;
    this.scene.start("dungeon_fruit_map_2", { player: playerPos });
  }

  gameOver() {
    // Game over logic
    console.log("gameover");
    // You can show a game over screen or reset the level here
}
}
