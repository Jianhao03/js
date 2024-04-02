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
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    //// Add all scenes below in the arracy
    scene: [ preloadScene, storyline, howtoplay, beware, dungeon_fruit_map_1 , dungeon_fruit_map_2 , dungeon_fruit_map_3 , dungeon_fruit_map_4 , dungeon_fruit_map_5 , victory , gameover ]
};

// // Define the global fruit count variable
// let globalFruitCount = 0;

// // Handle collecting fruit
// function collectFruit() {
//     // Increment the global fruit count
//     globalFruitCount++;
// }

// // Pass the global fruit count to the next scene
// function transitionToNextScene(nextSceneKey) {
//     this.scene.start(nextSceneKey, { fruitCount: globalFruitCount });
// }

// // Initialize the scene with the player data and global fruit count
// function initializeScene(data) {
//     // Retrieve the player data
//     const player = data.player;
    
//     // Retrieve the global fruit count from the scene data or initialize it if not provided
//     globalFruitCount = data.fruitCount || 0;
    
//     // Initialize the scene with the player data
//     // (You can add additional initialization logic here if needed)
// }


var game = new Phaser.Game(config);



