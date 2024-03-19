class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }
    preload(){
        this.load.image("main", "assets/gamestartpage.png");
    this.load.audio("bgmusic", "assets/minimal-ambient-retro-161794.mp3");
    }
    create () {
        this.add.image(0, 0, 'main').setOrigin(0, 0);

        console.log("preloadScene")

        this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.2);
        this.music.play();

       // this.add.text(10,500, 'press space to continue', 
        //    { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 50;
            playerPos.y = 408; // Changed from x to y, assuming it was a typo
            this.scene.start("dungeon_fruit_map_1", { player: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }

}
