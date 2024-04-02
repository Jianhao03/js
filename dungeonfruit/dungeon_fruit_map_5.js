class dungeon_fruit_map_5 extends Phaser.Scene {
  constructor() {
    super({ key: "dungeon_fruit_map_5" });
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
      "dungeon_fruit_map_5",
      "assets/dungeon_fruit_map_5.tmj"
    );
    // Step 2 : Preload any images here
    this.load.image("buildimg", "assets/build_atlas.png");
    this.load.image("castleimg", "assets/Castle2.png");
    this.load.image("smallpixelimg", "assets/smallpixel.png");
    this.load.image("heartimg", "assets/Heart.png");
    this.load.spritesheet("knight", "assets/knight.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("zombie", "assets/zombie.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("pineapple", "assets/pineapplepixel.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("applepay", "assets/applepay.mp3");
    this.load.audio("mchurt", "assets/mchurt.mp3");
  }

  create() {
    console.log("animationScene");

    this.applepaySnd = this.sound.add("applepay");
    this.mchurtSnd = this.sound.add("mchurt");
  
      // Initialize the global fruit count if not provided in scene data
      window.fruit = window.fruit || 0;
    // Add hearts with adjusted offset
    this.hearts = [];
    for (let i = 0; i < this.maxHearts; i++) {
      let heart = this.add
        .image(50 + i * 60, 50, "heartimg")
        .setScrollFactor(0)
        .setScale(0.08)
        .setDepth(1)
        .setVisible(true);

      // Adjust the heart's offset to match the player

      this.hearts.push(heart);
    }
  
    //this.anims.create({
    /// key: "slow frame",
    //frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
    //frameRate: 5,
    //repeat: -1,
    //});

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
    let map = this.make.tilemap({ key: "dungeon_fruit_map_5" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildTiles = map.addTilesetImage("build_atlas", "buildimg");
    let castleTiles = map.addTilesetImage("Castle2", "castleimg");
    let smallpixelTiles = map.addTilesetImage("smallpixel", "smallpixelimg");

    //Step 5  create an array of tiles
    let tilesArray = [buildTiles, castleTiles, smallpixelTiles];

    // Step 6  Load in layers by layers

    this.road2Layer = map.createLayer("road2", tilesArray, 0, 0);

    this.roadLayer = map.createLayer("road", tilesArray, 0, 0);

    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);

    this.wall2Layer = map.createLayer("wall2", tilesArray, 0, 0);

    this.stuffLayer = map.createLayer("stuff", tilesArray, 0, 0);


    //Add main player here with physics.add.sprite

    // Add time event / movement here
//player//
    this.player = this.physics.add.sprite(403, 99, "knight");
    window.player = this.player;
    this.player.body
      .setSize(this.player.width * 0.5, this.player.height * 0.4)
      .setOffset(18, 34);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.wallLayer.setCollisionByExclusion(-1, true);
      this.physics.add.collider(this.player, this.wallLayer);
  
      this.wall2Layer.setCollisionByExclusion(-1, true);
      this.physics.add.collider(this.player, this.wall2Layer);
  
      this.stuffLayer.setCollisionByExclusion(-1, true);
      this.physics.add.collider(this.player, this.stuffLayer);

          // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    //end of player//

    //enemy//
    // Set the offset of the body

 // Create zombies
 let zombie1Object = map.findObject("enemyLayer", (obj) => obj.name === "enemy01");
 let zombie2Object = map.findObject("enemyLayer", (obj) => obj.name === "enemy02");
 let zombie3Object = map.findObject("enemyLayer", (obj) => obj.name === "enemy03");
 let zombie4Object = map.findObject("enemyLayer", (obj) => obj.name === "enemy04");

 if (zombie1Object && zombie2Object && zombie3Object && zombie4Object) {
     this.zombie1 = this.physics.add.sprite(zombie1Object.x, zombie1Object.y, "zombie").play("zombie-left");
     this.zombie2 = this.physics.add.sprite(zombie2Object.x, zombie2Object.y, "zombie").play("zombie-up");
     this.zombie3 = this.physics.add.sprite(zombie3Object.x, zombie3Object.y, "zombie").play("zombie-up");
     this.zombie4 = this.physics.add.sprite(zombie4Object.x, zombie4Object.y, "zombie").play("zombie-down");

     // Add physics bodies
     this.physics.add.existing(this.zombie1);
     this.physics.add.existing(this.zombie2);
     this.physics.add.existing(this.zombie3);
     this.physics.add.existing(this.zombie4);

     // Set offset for each zombie body
     this.zombie1.body.setSize(this.zombie1.width * 0.5, this.zombie1.height * 0.4).setOffset(18, 34);
     this.zombie2.body.setSize(this.zombie2.width * 0.5, this.zombie2.height * 0.4).setOffset(18, 34);
     this.zombie3.body.setSize(this.zombie3.width * 0.5, this.zombie3.height * 0.4).setOffset(18, 34);
     this.zombie4.body.setSize(this.zombie4.width * 0.5, this.zombie4.height * 0.4).setOffset(18, 34);
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
      ],
      this.hitZombie,
      null,
      this
    );

    // in create, add tweens

    //zombie1//
    this.tweens.add({
      targets: this.zombie1,
      x: 337,
      flipX: false,
      yoyo: true,
      duration: 2000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie1.play("zombie-right");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie1.play("zombie-left");
      },
    });
    //end of zombie1//

    //zombie2//
    this.tweens.add({
      targets: this.zombie2,
      y: 327,
      flipY: false,
      yoyo: true,
      duration: 5000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie2.play("zombie-down");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie2.play("zombie-up");
      },
    });
    //end of zombie2//

    //zombie3//
    this.tweens.add({
      targets: this.zombie3,
      y: 424,
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
      y: 383,
      flipY: false,
      yoyo: true,
      duration: 5000,
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
    // let zombie = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "zombie"
    // );

    // this.zombie = this.physics.add.sprite(
    //   zombie.x,
    //   zombie.y,
    //   "zombie"
    // );

    // this.physics.add.overlap(
    //   this.player,
    //   this.zombie,
    //   this.hitZombie,
    //   null,
    //   this
    // );
//fruit//
    let pineapple = map.findObject(
      "objectLayer",
      (obj) => obj.name === "pineapple"
    );

    this.pineapple = this.physics.add.sprite(
      pineapple.x,
      pineapple.y,
      "pineapple"
    );

    this.physics.add.overlap(
      this.player,
      this.pineapple,
      this.hitFruit,
      null,
      this
    );
    //end of fruit//

         // Initialize player health
    this.playerHealth = 3; // Assuming the player starts with 3 health points

        // Initialize fruit count for this map
        this.mapFruitCount = 0;

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
    //exit from blue portal//
    if (this.player.x > 400 && this.player.x < 470 && this.player.y < 95) {
      console.log("Door5");
      this.dungeon_fruit_map_2();
    }
  } // end of update //

  //call this function when overlap

  //enemy//
  hitZombie(player, item) {
    console.log("hitZombie");
    this.mchurtSnd.play();
    this.cameras.main.shake(500); // 500ms
    item.disableBody(true, true);
    
    // Reduce player hearts
    this.playerHearts--;

    // Update hearts display
    this.updateHearts();

    return false;
}
//enemyend//

  //fruit//
 // Inside the hitFruit method
 hitFruit(player, item) {
  console.log("hitFruit function called");
  this.applepaySnd.play();

  // Disable the collected fruit
  item.disableBody(true, true);
  return false;
}

  dungeon_fruit_map_2(player, tile) {
    console.log("dungeon_fruit_map_2 function");
    let playerPos = {};
    playerPos.x = 704;
    playerPos.y = 205;
    this.scene.start("dungeon_fruit_map_2", { player: playerPos });
  }

  gameOver() {
    // Game over logic
    console.log("gameover");
    // You can show a game over screen or reset the level here
}
  }
