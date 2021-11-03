import Phaser from "phaser";

import TestScene from './scenes/TestScene'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000}
        }
    },
    scene: [TestScene]
}


export default new Phaser.Game(config)