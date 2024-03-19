class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }
    create () {
        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 50;
            playerPos.y = 408; // Changed from x to y, assuming it was a typo
            this.scene.start("dungeon_fruit_map_1", { player: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }

}
