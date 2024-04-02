class victory extends Phaser.Scene {
    constructor() {
        super('victory');
    }

    preload() {
        this.load.image("victory", "assets/endgamepage.png");
    }

    create() {
        console.log("victory");

        // Check if window.music exists and has a stop method
        if (window.music && window.music.stop) {
            window.music.stop();
        } else {
            console.warn("No music found to stop.");
        }
    
        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'victory').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 50;
            playerPos.y = 408; // Changed from x to y, assuming it was a typo
            this.scene.start("dungeon_fruit_map_1", { player: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
    }
}