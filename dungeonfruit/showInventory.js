class showInventory extends Phaser.Scene {

  constructor() {
      super({
          key: 'showInventory',
          active: false
      });
  }

  // incoming data from other scene
  init(data) {
      this.player = data.player;
      this.inventory = data.inventory;
  }

  preload() {
    // Load spritesheets for mango, strawberry, and pineapple
    this.load.spritesheet('mango', 'assets/mangopixel.png',{ frameWidth:32, frameHeight:32 });
    this.load.spritesheet("strawberry", "assets/strawberry.png", {
        frameWidth: 32,
        frameHeight: 32,
      });
    this.load.spritesheet("pineapple", "assets/pineapplepixel.png", {
        frameWidth: 32,
        frameHeight: 32,
      });
    this.load.image('heartimg', 'assets/Heart.png');
  }

  create(){
    console.log("showInventory()")

    // Display hearts
    this.heartimg1 = this.add.image(480,50,'heartimg').setScrollFactor(0).setVisible(false).setScale(1);
    this.heartimg2 = this.add.image(530,50,'heartimg').setScrollFactor(0).setVisible(false).setScale(1);
    this.heartimg3 = this.add.image(580,50,'heartimg').setScrollFactor(0).setVisible(false).setScale(1);

    // Display fruit images
    this.mango = this.add.image(50,50,'mango').setScrollFactor(0).setVisible(false).setScale(0.5);
    this.strawberry = this.add.image(100,50,'strawberry').setScrollFactor(0).setVisible(false).setScale(0.5);
    this.pineapple = this.add.image(150,50,'pineapple').setScrollFactor(0).setVisible(false).setScale(0.5);

    // Recv an event, call the method
    this.events.on('inventory', this.updateScreen, this);
  }

  updateScreen(data) {
    console.log('Received event inventory', data);

    // Display hearts based on the received heart count
    switch (data.heart) {
        case 3:
            this.heartimg1.setVisible(true);
            this.heartimg2.setVisible(true);
            this.heartimg3.setVisible(true);
            break;
        case 2:
            this.heartimg1.setVisible(true);
            this.heartimg2.setVisible(true);
            this.heartimg3.setVisible(false);
            break;
        case 1:
            this.heartimg1.setVisible(true);
            this.heartimg2.setVisible(false);
            this.heartimg3.setVisible(false);
            break;
        case 0:
            this.heartimg1.setVisible(false);
            this.heartimg2.setVisible(false);
            this.heartimg3.setVisible(false);
            break;
        default:
            break;
    }

    // Display collected fruit images based on the received fruit count
    switch (data.fruit) {
        case 3:
            this.mango.setVisible(true);
            this.strawberry.setVisible(true);
            this.pineapple.setVisible(true);
            break;
        case 2:
            this.mango.setVisible(true);
            this.strawberry.setVisible(true);
            this.pineapple.setVisible(false);
            break;
        case 1:
            this.mango.setVisible(true);
            this.strawberry.setVisible(false);
            this.pineapple.setVisible(false);
            break;
        case 0:
            this.mango.setVisible(false);
            this.strawberry.setVisible(false);
            this.pineapple.setVisible(false);
            break;
        default:
            break;
    }
  }
}
