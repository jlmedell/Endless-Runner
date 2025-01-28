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
        this.load.image('platform', './assets/platform.png')
        this.load.image('arrow', './assets/Arrow.png')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        this.player = this.physics.add.sprite(60, 315, 'hero', 1).setScale(0.3);
        this.player.body.setCollideWorldBounds(true); 
        this.player.body.setSize(300, 300).setOffset(0, 0); 
        this.player.body.setGravityY(500); 

        this.platforms = this.physics.add.group({
            allowGravity: false, 
            immovable: true 
        });

        this.gap = 430
        
        for (let i = 0; i < 5; i++) {
            let x = 200 + i * this.gap //last number = gap between platforms (keep between 430 and 500)
            let y = 600
            let platform = this.platforms.create(x, y, 'platform').setScale(0.5).refreshBody()
            platform.body.setVelocityX(-100)
        }

        this.physics.add.collider(this.player, this.platforms)

        this.arrows = this.physics.add.group({
            allowGravity: false, 
            immovable: true 
        });

        
        for (let i = 0; i < 5; i++) {
            let x = 200 + (430 * 10) + (i * 2000) //last number = gap between arrows
            let y = 360
            let arrow = this.arrows.create(x, y, 'arrow').setScale(0.2).refreshBody()
            arrow.body.setVelocityX(-200)
        }

        //this.platform = this.physics.add.staticGroup();
        //this.platform.create(320, 360, 'platform').setOrigin(0.5, 0).setScale(2).refreshBody(); 

        this.anims.create({
            key: 'walk',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', {
                start: 0,
                end: 1
            })
        });

        this.cursors = this.input.keyboard.createCursorKeys()

        //increase difficulty every 30 seconds
        this.time.addEvent({
            delay: 30000, 
            callback: () => {
                if (this.gap < 490) {
                    this.gap += 5 
                }
            },
            loop: true 
        })

        
    }

    update() {
        //if (this.player.y + this.player.body.height >= this.scale.height) {
            //this.scene.restart(); //restart upon hitting bottom of screen
        //}
            this.player.play('walk', true)
            this.background.tilePositionX += 4

            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-400) //player jump
            }

            this.platforms.children.iterate((platform) => {
                if (platform.x < -platform.width) {
                    platform.x = 800 //800
                    platform.y = 600
                }
            })
            this.arrows.children.iterate((arrow) => {
                if (arrow.x < -arrow.width) {
                    arrow.x = 3000
                    arrow.y = 360
                }
            })
    }
}