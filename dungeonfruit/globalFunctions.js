function updateInventory() {
    console.log("updateInventory")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.heart = window.heart
    this.inventory.fruit = window.fruit
     
    console.log('updateInventory Emit event', this.inventory)
    this.invEvent = (event, data) =>  { this.scene.get('showInventory').events.emit(event, data); }
    this.invEvent("inventory", this.inventory);
}
function hitZombie(player,item) {
    try {
        console.log("hitZombie");
       
        // Shake screen
       this.cameras.main.shake(100);
    
       this.mchurtSnd.play();
       
        window.heart--;
        item.disableBody(true, true);
        //this.updateInventory()
        updateInventory.call(this)
    
      if (window.heart == 0){
        this.scene.start("gameover");
      }
    } catch (error) {
        console.error("Error in hitZombie:", error);
    }
}

// function health(player,plant) {
//     console.log("*** enemy overlap main");
//     this.collectSnd.play();
//     window.heart++;
//     plant.disableBody(true, true);
//     //this.updateInventory()
//     updateInventory.call(this)
// }

function winFunction(player,victim) {
  console.log("*** victim overlap main");
  this.scene.start("victory");

}