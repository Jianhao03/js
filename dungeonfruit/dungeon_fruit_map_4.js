class dungeon_fruit_map_4 extends Phaser.Scene {
  constructor() {
    super({ key: "dungeon_fruit_map_4" });
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
      "dungeon_fruit_map_4",
      "assets/dungeon_fruit_map_4.tmj"
    );
    // Step 2 : Preload any images here
    this.load.image("buildimg", "assets/build_atlas.png");
    this.load.image("castleimg", "assets/Castle2.png");
    this.load.image("heartimg", "assets/Heart.png");
    this.load.spritesheet("knight", "assets/knight.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("strawberry", "assets/strawberry.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("zombie", "assets/zombie.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio("applepay", "assets/applepay.mp3");
    this.load.audio("mchurt", "assets/mchurt.mp3");
  }// end of preload //

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
    //player knight//
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
    let map = this.make.tilemap({ key: "dungeon_fruit_map_4" });
    let buildTiles = map.addTilesetImage("build_atlas", "buildimg");
    let castleTiles = map.addTilesetImage("Castle2", "castleimg");
    let tilesArray = [buildTiles, castleTiles];

    this.roadLayer = map.createLayer("road", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.stuffLayer = map.createLayer("stuff", tilesArray, 0, 0);
    this.fruit_placeLayer = map.createLayer("fruit_place", tilesArray, 0, 0);

    //object enemy layer
    //let enemy01 =map.findObject("enemyLayer", (obj) => obj.name === "enemy01");

    // First, initialize this.enemy01 with the sprite creation
    //this.enemy01 = this.physics.add.sprite(xCoordinate, yCoordinate, "zombie");

    // For example, if you want to set its position to the current x coordinate and y coordinate:
    //this.enemy01.setPosition(this.enemy01.1200, this.enemy01.155);

    // When object overlap with player, call the this.collectFire function
    //this.physics.add.overlap(this.player, this.enemy01, this.hitEnemy, null, this);
    //(multiple same object) this.physics.add.overlap(this.player, [this.enemy01, this.enemy02, this.enemy03], this.hitEnemy, null, this);
    //Add main player here with physics.add.sprite

    // Add time event / movement here

    // Add player and configure physics
    this.player = this.physics.add.sprite(101, 788, "knight");
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.4).setOffset(18, 34);


    this.cursors = this.input.keyboard.createCursorKeys();

   // Set collisions
   this.wallLayer.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.wallLayer);
   this.stuffLayer.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.stuffLayer);

    // Camera settings
    this.cameras.main.startFollow(this.player);

    //end of player//

    //enemy//
    let zombie1 = map.findObject("enemyLayer", (obj) => obj.name === "enemy01");
    let zombie2 = map.findObject("enemyLayer", (obj) => obj.name === "enemy02");
    let zombie3 = map.findObject("enemyLayer", (obj) => obj.name === "enemy03");
    let zombie4 = map.findObject("enemyLayer", (obj) => obj.name === "enemy04");
    let zombie5 = map.findObject("enemyLayer", (obj) => obj.name === "enemy05");
    let zombie6 = map.findObject("enemyLayer", (obj) => obj.name === "enemy06");

    //let zombie1 = map.findObject("enemyLayer", (obj) => obj.name === "enemy01, enemy04");
    // let zombie2 = map.findObject("enemyLayer", (obj) => obj.name === "enemy02, enemy03, enemy06");
    // let zombie3 = map.findObject("enemyLayer", (obj) => obj.name === "enemy05");
  
    if (zombie1 && zombie2 && zombie3 && zombie4 && zombie5 && zombie6) {
      this.zombie1 = this.physics.add.sprite(zombie1.x, zombie1.y, "zombie").play("zombie-down");
      this.zombie2 = this.physics.add.sprite(zombie2.x, zombie2.y, "zombie").play("zombie-right");
      this.zombie3 = this.physics.add.sprite(zombie3.x, zombie3.y, "zombie").play("zombie-right");
      this.zombie4 = this.physics.add.sprite(zombie4.x, zombie4.y, "zombie").play("zombie-down");
      this.zombie5 = this.physics.add.sprite(zombie5.x, zombie5.y, "zombie").play("zombie-right");
      this.zombie6 = this.physics.add.sprite(zombie6.x, zombie6.y, "zombie").play("zombie-right");
    
      // Add physics bodies
      this.physics.add.existing(this.zombie1);
      this.physics.add.existing(this.zombie2);
      this.physics.add.existing(this.zombie3);
      this.physics.add.existing(this.zombie4);
      this.physics.add.existing(this.zombie5);
      this.physics.add.existing(this.zombie6);
    
      // Set offset for each zombie body
      this.zombie1.body.setSize(this.zombie1.width * 0.5, this.zombie1.height * 0.4).setOffset(18, 34);
      this.zombie2.body.setSize(this.zombie2.width * 0.5, this.zombie2.height * 0.4).setOffset(18, 34);
      this.zombie3.body.setSize(this.zombie3.width * 0.5, this.zombie3.height * 0.4).setOffset(18, 34);
      this.zombie4.body.setSize(this.zombie4.width * 0.5, this.zombie4.height * 0.4).setOffset(18, 34);
      this.zombie5.body.setSize(this.zombie5.width * 0.5, this.zombie5.height * 0.4).setOffset(18, 34);
      this.zombie6.body.setSize(this.zombie6.width * 0.5, this.zombie6.height * 0.4).setOffset(18, 34);
    } else {
      console.error("One or more zombie objects not found in the Tiled map.");
    }
    // this.zombie1 = this.physics.add.sprite(zombie1.x, zombie1.y, "enemy01, enemy04")
    //this.zombie2 = this.physics.add.sprite(zombie2.x, zombie2.y, "enemy02, enemy03, enemy06")
    //this.zombie3 = this.physics.add.sprite(zombie3.x, zombie3.y, "enemy05")

    this.physics.add.overlap(
      this.player,
      [this.zombie1, this.zombie2, this.zombie3, this.zombie4, this.zombie5,  this.zombie6],
      this.hitZombie,
      null,
      this
    );
    //this.physics.add.overlap(this.player, this.zombie, this.hitEnemy, null, this);
    // in create, add tweens

    //zombie1//
    this.tweens.add({
      targets: this.zombie1,
      y: 313,
      flipY: false,
      yoyo: true,
      duration: 2000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie1.play("zombie-up");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie1.play("zombie-down");
      },
    });
    //end of zombie1//

    //zombie2//
    this.tweens.add({
      targets: this.zombie2,
      x: 1374,
      flipX: false,
      yoyo: true,
      duration: 5000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie2.play("zombie-left");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie2.play("zombie-right");
      },
    });
    //end of zombie2//

     //zombie3//
     this.tweens.add({
      targets: this.zombie3,
      x: 1374,
      flipX: false,
      yoyo: true,
      duration: 5000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie3.play("zombie-left");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie3.play("zombie-right");
      },
    });
    //end of zombie3//

    //zombie4//
    this.tweens.add({
      targets: this.zombie4,
      y: 732,
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
      x: 761,
      flipX: false,
      yoyo: true,
      duration: 4000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie5.play("zombie-left");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie5.play("zombie-right");
      },
    });
    //end of zombie5//

     //zombie6//
     this.tweens.add({
      targets: this.zombie6,
      x: 931,
      flipX: false,
      yoyo: true,
      duration: 5000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo");
        this.zombie6.play("zombie-left");
      },
      onRepeat: () => {
        console.log("onRepeat");
        this.zombie6.play("zombie-right");
      },
    });
    //end of zombie6//

    //fruit//
    let strawberry = map.findObject(
      "objectLayer",
      (obj) => obj.name === "strawberry"
    );

    this.strawberry = this.physics.add.sprite(
      strawberry.x,
      strawberry.y,
      "strawberry"
    );

// Inside create method or wherever you set up collisions
this.physics.add.overlap(this.player, this.strawberry, this.hitFruit, null, this);
    //end of fruit//

    //fog of wall
    this.wallLayer.setPipeline("Light2D").setAlpha(0.3);
    this.roadLayer.setPipeline("Light2D").setAlpha(0.1);
    this.stuffLayer.setPipeline("Light2D").setAlpha(0.5);
    this.fruit_placeLayer.setPipeline("Light2D").setAlpha(0.1);

    this.lights.enable();
    this.lights.setAmbientColor(0x080808);
    this.spotlight = this.lights
      .addLight(this.player.x, this.player.y)
      .setRadius(200, 200)
      .setIntensity(10);
//end fog of wall//

// Initialize player health
    this.playerHealth = 3; // Assuming the player starts with 3 health points
        
//exit//
        this.exitPortal = this.physics.add.sprite(442, 223, "exitPortalSprite");
        this.physics.add.overlap(this.player, this.exitPortal, this.exitToMap2, null, this);

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
  // Update logic for the scene
  this.spotlight.x = this.player.x + 8;
  this.spotlight.y = this.player.y - 5;

  // Handle player movement
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

    //exit to outside dungeon//
    if (this.player.x > 46 && this.player.x < 80 && this.player.y > 760 && this.player.y < 840) {
      // Call the method to transition to dungeon_fruit_map_2
      this.dungeon_fruit_map_2();
  }//end of exit to outside dungeon//

}//end of update//

  //call this function when overlap\

  //enemy//
  hitZombie(player, item) {
    console.log("hitZombie function called");
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
 // Inside the hitFruit method
 hitFruit(player, item) {
  console.log("hitFruit function called");
  this.applepaySnd.play();

  // Disable the collected fruit
  item.disableBody(true, true);

  return false;
}

// Method to handle transitioning between scenes
 // Method to handle transitioning between scenes
 transitionToNextScene(data) {
  // Transition to the next scene and pass the data object
  this.scene.start("dungeon_fruit_map_4", data);
}

// Initialize method to set the player data and global fruit count in each scene
init(data) {
  this.player = data.player;
  // Retrieve the global fruit count from the scene data or initialize it if not provided
  window.fruit = data.fruitCount || 0;
}

// dungeon_fruit_map_2(playerPos) {
//   console.log("dungeon_fruit_map_2 function");
//   console.log("Player position:", playerPos);
//   this.scene.start("dungeon_fruit_map_2", { player: playerPos });
// }
    // Method to handle exiting to map 2
  //outside dungeon//
  dungeon_fruit_map_2(player, tile) {
    console.log("dungeon_fruit_map_2 function");
    let playerPos = {};
    playerPos.x = 442;
    playerPos.y = 212;
    this.scene.start("dungeon_fruit_map_2",{player : playerPos});
  }
  //end of outside dungeon//
    // //exit from purple portal
    // dungeon_fruit_map_2(player, tile) {
    //   console.log("Transitioning to dungeon_fruit_map_2");
    
    //   // Define the player's position in the next scene
    //   const playerPos = { x: 704, y: 205 };
    
    //   // Transition to the next scene with the player's position data
    //   this.scene.start("dungeon_fruit_map_2", { player: playerPos });
    // }
  gameOver() {
    // Game over logic
    console.log("gameover");
    // You can show a game over screen or reset the level here
  }
}