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
        this.jumps = 0
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

        score = 0
        this.background = this.add.tileSprite(0, 0, 640, 640, 'background').setOrigin(0, 0);

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
            let x = 200 + (4300) + (i * 2000) //last number = gap between arrows
            let y = 400
            let arrow = this.arrows.create(x, y, 'arrow').setScale(0.2).refreshBody()
            arrow.body.setVelocityX(-300)
            arrow.setOrigin(0,0)

            arrow.body.setSize(2, arrow.body.height) 
            arrow.body.setOffset(0, 0)
        } 

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

        //player collides with arrow
        this.physics.add.overlap(
            this.player,
            this.arrows,
            this.arrowCollision,
            null,
            this
        );

        //increase tick speed every minute or so
        this.speed = -230
        this.interval = Phaser.Math.Between(60000,12000)
        this.timeEvent = this.time.addEvent({
            delay: this.interval, 
            callback: this.faster,
            callbackScope: this,
            loop: true
        })

        //score increases every 10 seconds
        this.timeEvent = this.time.addEvent({
            delay: 10000, 
            callback: this.point,
            callbackScope: this,
            loop: true
        })
    }

    arrowCollision(player, arrow) {
        //this.scene.restart()
        this.scene.start('creditsScene')
    }

    //increase tick speed by random amount
    faster() {
        if (this.speed > -350) {
            this.speed -= Phaser.Math.Between(1,5)
            this.arrows.children.iterate((arrow) => {
                arrow.body.setVelocityX(this.speed)
            })
            this.platforms.children.iterate((platform) => {
                platform.body.setVelocityX(this.speed / 3)
            })
            this.interval = Phaser.Math.Between(60000,12000)
        }
    }

    //increase score by 10
    point() {
        score = score + 10
    }

    update() {
        if (this.player.y >= 400) {
            //this.scene.restart() //restart upon hitting bottom of screen
            this.scene.start('creditsScene')
        }
            this.player.play('walk', true)
            this.background.tilePositionX += 4

            if (Phaser.Input.Keyboard.JustDown(keyUp) && this.jumps < 1) {
                this.player.setVelocityY(-375) //player jump
                this.jumps = this.jumps + 1
            }

            if (this.player.body.touching.down) {
                this.jumps = 0
            }
            //this.cursors.up.isDown && this.player.body.touching.down

            this.platforms.children.iterate((platform) => {
                if (platform.x < -platform.width) {
                    platform.x = 360 + this.gap //800
                    platform.y = 600
                }
            })
            this.arrows.children.iterate((arrow) => {
                if (arrow.x < -arrow.width) {
                    arrow.x = 2800
                    arrow.y = 400
                }
            })
    }
}