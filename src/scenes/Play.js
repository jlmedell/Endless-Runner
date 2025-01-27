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
        this.load.image('platform', './assets/platform.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // Add the player sprite
        this.player = this.physics.add.sprite(60, 315, 'hero', 1).setScale(0.3);
        this.player.body.setCollideWorldBounds(true); // Player stays in bounds
        this.player.body.setSize(300, 300).setOffset(0, 0); // Adjust hitbox
        this.player.body.setGravityY(500); // Apply gravity to the player

        // Create a static platform group
        this.platform = this.physics.add.staticGroup();
        this.platform.create(320, 360, 'platform').setOrigin(0.5, 0).setScale(2).refreshBody(); // Scale and refresh hitbox

        // Add collision between the player and the platform
        this.physics.add.collider(this.player, this.platform);

        // Create the walk animation
        this.anims.create({
            key: 'walk',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', {
                start: 0,
                end: 1
            })
        });

        // Add keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
            this.player.play('walk', true)
            this.background.tilePositionX += 4
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-400) 
            }
    }
}