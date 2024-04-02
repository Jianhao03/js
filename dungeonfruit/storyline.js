class storyline extends Phaser.Scene {
  
  constructor ()
  {
      super({ key: 'storyline' });
  }
  preload(){
    this.load.image("storyline","assets/storyline.png");
  }
  create () {
      this.add.image(0, 0, 'storyline').setOrigin(0, 0);

      console.log("storyline")

     // this.add.text(10,500, 'press space to continue', 
      //    { font: '24px Courier', fill: '#ffffff' });

      var spaceDown = this.input.keyboard.addKey('ENTER');

      spaceDown.on("down", function () {
        console.log("howtoplay");
        
        this.scene.start("howtoplay");
          },
          this
        );
       
      }

}