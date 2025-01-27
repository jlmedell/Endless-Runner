//Name: Leo Medellin
//Title: 
//Approximate Time: 

//Creative Tilt:

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)

let cursors

// reserve keyboard bindings
let keyStart

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
