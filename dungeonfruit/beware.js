class beware extends Phaser.Scene {
  
  constructor ()
  {
      super({ key: 'beware' });
  }
  preload(){
    this.load.image("beware","assets/beware.png");
  }
  create () {
      this.add.image(0, 0, 'beware').setOrigin(0, 0);

      console.log("beware")

     // this.add.text(10,500, 'press space to continue', 
      //    { font: '24px Courier', fill: '#ffffff' });

      var spaceDown = this.input.keyboard.addKey('ENTER');

      spaceDown.on('down', function(){
        let playerPos = {};
        playerPos.x = 142;
        playerPos.y = 407; // Changed from x to y, assuming it was a typo
        this.scene.start("dungeon_fruit_map_1", { player: playerPos });
    }, this); // Passing 'this' as the context to refer to the scene
       
      }

}