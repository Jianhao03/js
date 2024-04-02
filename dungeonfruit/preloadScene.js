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

        var spaceDown = this.input.keyboard.addKey('ENTER');

        spaceDown.on("down", function () {
            console.log("storyline");
            
            this.scene.start("storyline");
              },
              this
            );

 
         
        }

}
