class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload() {
        //load images and sprites
        this.load.image('platform', './assets/platform.png')
        this.load.image('background', './assets/background.png')
        //load spritesheet
        this.load.spritesheet('hero', './assets/hero.png', {
            frameWidth: 30,
            frameHeight: 30,
            startFrame: 0,
            endFrame: 1
        })
    }

}