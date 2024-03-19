class dungeon_fruit_map_2 extends Phaser.Scene {
  constructor() {
    super({ key: "dungeon_fruit_map_2" });
  }

  init(data){
    this.playerPos=data.player
}
  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("dungeon_fruit_map_2", "assets/dungeon_fruit_map_2.tmj");
    // Step 2 : Preload any images here
    this.load.image("buildimg", "assets/build_atlas.png");
    this.load.image("castleimg", "assets/Castle2.png");
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
    let map = this.make.tilemap({ key: "dungeon_fruit_map_2" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildTiles = map.addTilesetImage("build_atlas", "buildimg");
    let castleTiles = map.addTilesetImage("Castle2", "castleimg");
    let smallpixelTiles = map.addTilesetImage("smallpixel", "smallpixelimg");

    //Step 5  create an array of tiles
    let tilesArray = [buildTiles,castleTiles,smallpixelTiles];

    // Step 6  Load in layers by layers
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);

    this.roadLayer = map.createLayer("road", tilesArray, 0, 0);

    this.stuffLayer = map.createLayer("stuff", tilesArray, 0, 0);

    this.blue_portalLayer = map.createLayer("blue_portal", tilesArray, 0, 0);

    this.purple_portalLayer = map.createLayer("purple_portal", tilesArray, 0, 0);

    this.yellow_portalLayer = map.createLayer("yellow_portal", tilesArray, 0, 0);

    console.log("This is preloadScene spacebar V3");

        var spaceDown = this.input.keyboard.addKey('SPACE');
            
            spaceDown.on('down', function(){
            console.log("Space pressed, goto dungeon_fruit_map_3");
            this.scene.start("dungeon_fruit_map_2");
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
    this.player = this.physics.add.sprite(this.playerPos.x,this.playerPos.y,"knight");
    window.player = this.player
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.4). setOffset(18,34)
// set player with obstacle

    this.stuffLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.stuffLayer);

    this.wallLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wallLayer);

    this.cursors = this.input.keyboard.createCursorKeys();

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
   
    //exit to outside dungeon//
 if (
  this.player.x > 333 &&
        this.player.x < 495 &&
        this.player.y > 451
) {
  console.log("outside_dungeon");
  this.dungeon_fruit_map_1();
}//end of exit to outside dungeon//

    //potral yellow//
    if (
      this.player.x > 155 &&
      this.player.x < 235 &&
      this.player.y < 195
    ) {
      console.log("yellow_patrol");
      this.dungeon_fruit_map_3();
    }//end of yellow patrol//
    
    //potral purple//
    if (
      this.player.x > 373 &&
      this.player.x < 456 &&
      this.player.y < 192
    ) {
      console.log("purple_portal");
      this.dungeon_fruit_map_4();
    }//end of purple patrol//

    //potral blue//
    if (
      this.player.x > 633 &&
      this.player.x < 717 &&
      this.player.y < 192
    ) {
      console.log("blue_portal");
      this.dungeon_fruit_map_5();
    }//end of blue patrol//

  } // end of update //

  //outside dungeon//
  dungeon_fruit_map_1(player, tile) {
    console.log("dungeon_fruit_map_1 function");
    let playerPos = {};
    playerPos.x = 705;
    playerPos.y = 490;
    this.scene.start("dungeon_fruit_map_1",{player : playerPos});
  }
  //end of outside dungeon//

  //yellow patrol//
  dungeon_fruit_map_3(player, tile) {
    console.log("dungeon_fruit_map_3 function");
    let playerPos = {};
    playerPos.x = 192;
    playerPos.y = 209;
    this.scene.start("dungeon_fruit_map_3",{player : playerPos});
  }
  //end of potral yellow//

  //purple patrol//
  dungeon_fruit_map_4(player, tile) {
    console.log("dungeon_fruit_map_4 function");
    let playerPos = {};
    playerPos.x = 785;
    playerPos.y = 120;
    this.scene.start("dungeon_fruit_map_4",{player : playerPos});
}
//end of potral purple//

 //blue patrol//
 dungeon_fruit_map_5(player, tile) {
  console.log("dungeon_fruit_map_5 function");
  let playerPos = {};
    playerPos.x = 675;
    playerPos.y = 214;
  this.scene.start("dungeon_fruit_map_5",{player : player});
}
//end of potral blue//

  } // end of update //