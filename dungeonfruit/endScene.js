class endScene extends Phaser.Scene {

    constructor ()
    {
        super('endScene');
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffcc33, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(300, 100, 100, 100);

        this.add.text(120, 130, 'Press 1 to outside_dungeon', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 170, 'Press 2 to portalroom', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 210, 'Press 3 to bridge', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 250, 'Press 4 to maze', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 290, 'Press 5 to final_place', { font: '24px Courier', fill: '#000000' });

        console.log("This is preloadScene spacebar V3");

        var spaceDown = this.input.keyboard.addKey('SPACE');
            
            spaceDown.on('down', function(){
            console.log("Space pressed, goto outside_dungeon");
            this.scene.start("outside_dungeon");
            }, this );
    
            var key1Down = this.input.keyboard.addKey(49);
            var key2Down = this.input.keyboard.addKey(50);
            var key3Down = this.input.keyboard.addKey(51);
            var key4Down = this.input.keyboard.addKey(52);
            var key5Down = this.input.keyboard.addKey(53);

            key1Down.on('down', function(){
                console.log("Key 1 pressed");
                    this.scene.start("outside_dungeon");
                }, this );
    
                key2Down.on('down', function(){
                    console.log("Key 2 pressed");
                        this.scene.start("portalroom");
                    }, this );
    
                    key3Down.on('down', function(){
                      console.log("Key 3 pressed");
                          this.scene.start("bridge");
                      }, this );

                      key4Down.on('down', function(){
                        console.log("Key 4 pressed");
                            this.scene.start("maze");
                        }, this );

                        key5Down.on('down', function(){
                            console.log("Key 5 pressed");
                                this.scene.start("final_place");
                            }, this );
        //this.add.text(320, 110, 'C', { font: '96px Courier', fill: '#000000' });
       // this.add.text(120, 310, 'Press A to go main page', { font: '24px Courier', fill: '#000000' });
        //this.add.text(120, 350, 'Press R to restart game', { font: '24px Courier', fill: '#000000' });

       // var aDown = this.input.keyboard.addKey('A');
       // var rDown = this.input.keyboard.addKey('R');

       // var key1Down = this.input.keyboard.addKey(49);
       // var key2Down = this.input.keyboard.addKey(50);
        
       // key1Down.on('down', function(){
          //  console.log("Key 1 pressed");
           //     this.scene.start("level1");
           // }, this );

         //   key2Down.on('down', function(){
        //        console.log("Key 2 pressed");
        //            this.scene.start("level2");
         //       }, this );

       // rDown.on('down', function(){
       // console.log("R pressed (reload game)");
      //      this.scene.start("gameScene");
       // }, this );

      //  aDown.on('down', function(){
       //     console.log("A pressed (main menu)");
       //     this.scene.start("preloadScene");
       //     }, this );

    }
}
