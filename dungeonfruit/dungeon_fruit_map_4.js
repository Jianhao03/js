class dungeon_fruit_map_4 extends Phaser.Scene {
  constructor() {
    super({ key: "dungeon_fruit_map_4" });
  }

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
    //this.load.spritesheet("fire", "assets/fire.png", {
    //frameWidth: 40,
    //frameHeight: 70,
    // });
  } // end of preload //

  create() {
    console.log("animationScene");

    this.applepaySnd = this.sound.add("applepay");
    this.mchurtSnd = this.sound.add("mchurt");

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

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildTiles = map.addTilesetImage("build_atlas", "buildimg");
    let castleTiles = map.addTilesetImage("Castle2", "castleimg");

    //Step 5  create an array of tiles
    let tilesArray = [buildTiles, castleTiles];

    // Step 6  Load in layers by layers

    this.roadLayer = map.createLayer("road", tilesArray, 0, 0);

    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);

    this.stuffLayer = map.createLayer("stuff", tilesArray, 0, 0);

    this.fruit_placeLayer = map.createLayer("fruit_place", tilesArray, 0, 0);

    console.log("This is preloadScene spacebar V3");

    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Space pressed, goto dungeon_fruit_map_5");
        this.scene.start("dungeon_fruit_map_4");
      },
      this
    );

    var key1Down = this.input.keyboard.addKey(49);
    var key2Down = this.input.keyboard.addKey(50);
    var key3Down = this.input.keyboard.addKey(51);
    var key4Down = this.input.keyboard.addKey(52);
    var key5Down = this.input.keyboard.addKey(53);

    key1Down.on(
      "down",
      function () {
        console.log("Key 1 pressed");
        this.scene.start("dungeon_fruit_map_1");
      },
      this
    );

    key2Down.on(
      "down",
      function () {
        console.log("Key 2 pressed");
        this.scene.start("dungeon_fruit_map_2");
      },
      this
    );

    key3Down.on(
      "down",
      function () {
        console.log("Key 3 pressed");
        this.scene.start("dungeon_fruit_map_3");
      },
      this
    );

    key4Down.on(
      "down",
      function () {
        console.log("Key 4 pressed");
        this.scene.start("dungeon_fruit_map_4");
      },
      this
    );

    key5Down.on(
      "down",
      function () {
        console.log("Key 5 pressed");
        this.scene.start("dungeon_fruit_map_5");
      },
      this
    );

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

    this.player = this.physics.add.sprite(101, 788, "knight");
    window.player = this.player;
    this.player.body
      .setSize(this.player.width * 0.5, this.player.height * 0.4)
      .setOffset(18, 34);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.wallLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wallLayer);

    this.stuffLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.stuffLayer);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    //enemy//
    let zombie1 = map.findObject("enemyLayer", (obj) => obj.name === "enemy01");
    //let zombie1 = map.findObject("enemyLayer", (obj) => obj.name === "enemy01, enemy04");
    // let zombie2 = map.findObject("enemyLayer", (obj) => obj.name === "enemy02, enemy03, enemy06");
    // let zombie3 = map.findObject("enemyLayer", (obj) => obj.name === "enemy05");

    this.zombie1 = this.physics.add
      .sprite(zombie1.x, zombie1.y, "enemy01")
      .play("zombie-down");
    // this.zombie1 = this.physics.add.sprite(zombie1.x, zombie1.y, "enemy01, enemy04")
    //this.zombie2 = this.physics.add.sprite(zombie2.x, zombie2.y, "enemy02, enemy03, enemy06")
    //this.zombie3 = this.physics.add.sprite(zombie3.x, zombie3.y, "enemy05")

    this.physics.add.overlap(
      this.player,
      [this.zombie1, this.zombie2, this.zombie3],
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
    // this.tweens.add({
    //   targets: this.zombie2,
    //   x: 100,
    //  //flipX: true,
    //   yoyo: true,
    //   duration: 2000,
    //   repeat: -1
    // })
    //end of zombie2//

    //zombie3//
    // this.tweens.add({
    //   targets: this.zombie3,
    //   x: 500,
    //  //flipX: true,
    //   yoyo: true,
    //   duration: 2000,
    //   repeat: -1
    // })
    //end of zombie3//

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

    this.physics.add.overlap(
      this.player,
      this.strawberry,
      this.hitFruit,
      null,
      this
    );

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
  } // end of create //

  update() {
    this.spotlight.x = this.player.x + 8;
    this.spotlight.y = this.player.y - 5;

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
    //exit from purple portal//
    if (this.player.x < 63 && this.player.y > 764 && this.player.y < 838) {
      console.log("Door4");
      this.dungeon_fruit_map_2();
    }
  } // end of update //

  //call this function when overlap\

  //enemy//
  hitZombie(player, item) {
    console.log("hitZombie");
    this.mchurtSnd.play();
    this.cameras.main.shake(500); // 500ms
    //(player knockback) player.x = player.x - 50
    item.disableBody(true, true);

    return false;
  }

  //fruit//
  hitFruit(player, item) {
    console.log("hitFruit");
    this.applepaySnd.play();
    //this.camera.main.shake(500)// 500ms
    //(player knockback) player.x = player.x - 50
    item.disableBody(true, true);

    return false;
  }

  dungeon_fruit_map_2(player, tile) {
    console.log("dungeon_fruit_map_2 function");
    let playerPos = {};
    playerPos.x = 446;
    playerPos.y = 213;
    this.scene.start("dungeon_fruit_map_2", { player: playerPos });
  }
}
