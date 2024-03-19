var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size 
    //640//
    width: 32 * 20,
    height: 32 * 20,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#000000',
    pixelArt: true,
    //// Add all scenes below in the arracy
    scene: [ preloadScene, dungeon_fruit_map_1 , dungeon_fruit_map_2 , dungeon_fruit_map_3 , dungeon_fruit_map_4 , dungeon_fruit_map_5 ]
};

var game = new Phaser.Game(config);



