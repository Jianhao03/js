class howtoplay extends Phaser.Scene {
  
  constructor ()
  {
      super({ key: 'howtoplay' });
  }
  preload(){
    this.load.image("howtoplay","assets/howtoplay.png");
  }
  create () {
      this.add.image(0, 0, 'howtoplay').setOrigin(0, 0);

      console.log("howtoplay")

     // this.add.text(10,500, 'press space to continue', 
      //    { font: '24px Courier', fill: '#ffffff' });

      var spaceDown = this.input.keyboard.addKey('ENTER');

      spaceDown.on("down", function () {
        console.log("beware");

        
        this.scene.start("beware");
          },
          this
        );
       
      }

}