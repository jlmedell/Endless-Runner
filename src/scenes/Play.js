class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
   
    preload() {
        this.load.spritesheet('hero', './assets/hero.png',{
            frameWidth: 300,
            frameHeight: 300,
            startFrame: 0,
            endFrame: 1
        })
    }

    create() {
        //place scrolling tile sprite
        //this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0)

            this.player = this.physics.add.sprite(60, 220, 'hero', 1).setScale(0.3)
            this.player.body.setCollideWorldBounds(true)
            this.player.body.setSize(300, 300).setOffset(0, 0)
    
            this.anims.create({
                key: 'walk',
                frameRate: 2,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hero', {
                    start: 0,
                    end: 1
                })
            })
            
            cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
            this.player.play('walk', true)
    }
}