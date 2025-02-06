//Name: Leo Medellin
//Title: Sir Runs-A-Lot 
//Approximate Time: 25 Hours

/*
Creative Tilt (Technical): Many endless runner games gradually increase difficulty
by increasing the tick speed of obstacles. What makes mine different is that it is 
designed to increase at random intervals of time and by random amounts, using 
randomness to slowly but surely increase the difficulty in a way that prevents any
exact pattern, as each gameplay session will have slightly different magnitudes of 
speed increase and at slightly different times, so while some pattern recognition
may be possible, the player cannot predict the exact timing or magnitude of a tick
speed increase while playing. To a lesser extent, there is also a creative tilt in 
the scoring system. Instead of increasing the score by 1 every second, the player
gains 10 seconds at a checkpoint every 10 seconds. This makes beating one's high 
score more difficult, as a player needs to last long enough to reach the time
checkpoint or their progress since the previous one won't count. 

Creative Tilt (Artistic): I composed the background music myself using software. I 
decided to use trumpets as the primary instrument as I felt it would fit the medieval 
setting of the game, and composed the song with the intent of creating a sort of 
parade sound that might accompany the arrival of a feudal lord or monarch to honor
them, or perhaps call to mind the sound of a horn blown to signify the start of a 
battle. By composing an original song that would fit with my game's setting, I hoped
to add an extra layer of immersion into the Middle Ages-themed aesthetic evoked by
the main character sprite, which itself is another piece of art I'm rather proud of. 
Whilst the rest of the art I made is rather simplistic, I really took the time and 
care to make the knight sprite look as perfect as possible, carefully placing each
pixel in just the right position to create a shape that would bring to mind the Middle
Ages. I felt that it would help the game to feel more unique, as the endless runner
genre seems to have few games with a medieval style/setting and I felt that it could
be an interesting twist on this type of game.
*/

//Sources:
//https://www.thepolyglotdeveloper.com/2020/09/add-music-sounds-other-audio-phaser-game/ 
//https://phaser.discourse.group/t/how-work-method-iterate-for-group/4422 
//https://www.youtube.com/watch?v=WVsBI6nvtJ0 
//https://phaser.io/examples/v3.85.0/tweens/eases/view/ease-equations 
//https://phaser.io/tutorials/making-your-first-phaser-3-game/part8 (children.iterate command)


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
            debug: false,
        }
    },
    scene: [ Menu, Play, Credits ]
}
let game = new Phaser.Game(config)

let cursors

// reserve keyboard bindings
let keyStart, keyUp, keyRestart

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let score = 0
