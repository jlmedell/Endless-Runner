class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
   
    create() {
        //place scrolling tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0)
    }
}