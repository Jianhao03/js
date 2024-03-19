class dungeon_fruit_map_1 extends Phaser.Scene {
  constructor() {
    super({ key: "dungeon_fruit_map_1" });
  }

  init(data){
    this.player = data.player
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("dungeon_fruit_map_1", "assets/dungeon_fruit_map_1.tmj");
    // Step 2 : Preload any images here
    this.load.image("buildimg", "assets/build_atlas.png");
    this.load.image("castleimg", "assets/Castle2.png");
    this.load.image("cityimg", "assets/City-01.png");
    this.load.image("forestimg", "assets/forest_tiles.png");
    this.load.image("stoneimg", "assets/smallpixel.png");
    this.load.image("smallpixelimg", "assets/smallpixel.png");
    this.load.spritesheet('knight', 'assets/knight.png',{ frameWidth:64, frameHeight:64 });
    //this.load.spritesheet("fire", "assets/fire.png", {
      //frameWidth: 40,
      //frameHeight: 70,
   // });
    //this.load.spritesheet("skelaton", "assets/skelaton.png",{ frameWidth:64, frameHeight:64 });
  } // end of preload //

  create() {
    console.log("animationScene");

    //this.anims.create({
     /// key: "slow frame",
      //frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      //frameRate: 5,
      //repeat: -1,
    //});

    this.anims.create({
        key:'knight-up',
        frames:this.anims.generateFrameNumbers('knight',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'knight-left',
        frames:this.anims.generateFrameNumbers('knight',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'knight-down',
        frames:this.anims.generateFrameNumbers('knight',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'knight-right',
        frames:this.anims.generateFrameNumbers('knight',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });
    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "dungeon_fruit_map_1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildTiles = map.addTilesetImage("build_atlas", "buildimg");
    let castleTiles = map.addTilesetImage("Castle2", "castleimg");
    let cityTiles = map.addTilesetImage("City-01", "cityimg");
    let forestTiles = map.addTilesetImage("forest_tiles", "forestimg");
    let stoneTiles = map.addTilesetImage("smallpixel", "stoneimg");
    let smallpixelTiles = map.addTilesetImage("smallpixel", "smallpixelimg");

    //Step 5  create an array of tiles
    let tilesArray = [buildTiles,castleTiles,cityTiles,forestTiles,stoneTiles,smallpixelTiles];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("ground", tilesArray, 0, 0);

    this.environment1Layer = map.createLayer("environment1", tilesArray, 0, 0);

    this.environment2Layer = map.createLayer("environment2", tilesArray, 0, 0);

    this.stoneLayer = map.createLayer("stone", tilesArray, 0, 0);

    this.smallpixelLayer = map.createLayer("smallpixel", tilesArray, 0, 0);

    console.log("This is preloadScene spacebar V3");

        var spaceDown = this.input.keyboard.addKey('SPACE');
            
            spaceDown.on('down', function(){
            console.log("Space pressed, goto dungeon_fruit_map_2");
            this.scene.start("dungeon_fruit_map_1");
            }, this );
    
            var key1Down = this.input.keyboard.addKey(49);
            var key2Down = this.input.keyboard.addKey(50);
            var key3Down = this.input.keyboard.addKey(51);
            var key4Down = this.input.keyboard.addKey(52);
            var key5Down = this.input.keyboard.addKey(53);

            key1Down.on('down', function(){
                console.log("Key 1 pressed");
                    this.scene.start("dungeon_fruit_map_1");
                }, this );
    
                key2Down.on('down', function(){
                    console.log("Key 2 pressed");
                        this.scene.start("dungeon_fruit_map_2");
                    }, this );
    
                    key3Down.on('down', function(){
                      console.log("Key 3 pressed");
                          this.scene.start("dungeon_fruit_map_3");
                      }, this );

                      key4Down.on('down', function(){
                        console.log("Key 4 pressed");
                            this.scene.start("dungeon_fruit_map_4");
                        }, this );

                        key5Down.on('down', function(){
                            console.log("Key 5 pressed");
                                this.scene.start("dungeon_fruit_map_5");
                            }, this );



    //Add main player here with physics.add.sprite

    // Add time event / movement here
// set player size
    this.player = this.physics.add.sprite(this.player.x,this.player.y,"knight");
    window.player = this.player
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.4). setOffset(18,34)
// set player with obstacle
    this.cursors = this.input.keyboard.createCursorKeys();

    this.environment1Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.environment1Layer);

    this.environment2Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.environment2Layer);

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
  } // end of create //

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
//entance of dungeon portal//
    if (
      this.player.x > 784 &&
      this.player.y < 540 &&
      this.player.y > 386
    ) {
      console.log("Door1");
      this.dungeon_fruit_map_2();
    }
  } // end of update //
  dungeon_fruit_map_2(player, tile) {
    console.log("dungeon_fruit_map_2 function");
    let playerPos = {};
    playerPos.x = 467;
    playerPos.y = 383;
    this.scene.start("dungeon_fruit_map_2",{player : playerPos});
  }
}