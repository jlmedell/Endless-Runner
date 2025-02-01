class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload() {
        //load images and sprites
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0xFF0000, 1)
            loadingBar.fillRect(game.config.width/2, game.config.height/2, (game.config.width/2) * value, 10)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.image('platform', './assets/platform.png')
        this.load.image('background', './assets/background.png')
        this.load.image('arrow', './assets/Arrow.png')

        this.load.audio('sfx-select', './assets/blipSelect.wav')
        this.load.audio('sfx-hurt', './assets/hitHurt.wav')
        this.load.audio('sfx-jump', './assets/jump.wav')
        this.load.audio('sfx-checkpoint', './assets/powerUp.wav')
        this.load.audio('trumpets', './assets/trumpets.wav')
        //load spritesheet
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 640, 640, 'background').setOrigin(0, 0)
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF00FF',
            color: '#0000FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 3, 'SIR RUNS-A-LOT', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#0000FF'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2, 'Use ^ button to jump and double jump', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding, 'Avoid gaps and the tips of arrows', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#FF0000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 5 + borderPadding, 'Press spacebar to start', menuConfig).setOrigin(0.5)

        keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyStart)) {
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}