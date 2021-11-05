import socket from 'socket.io-client';
import TestScene from '../scenes/TestScene';

export const clientSocket = socket(window.location.origin);

console.log(window.location.origin)
console.log("Made it to client socket file!", clientSocket)
clientSocket.on('connect', () => {
    console.log('Connected to server');
});

const player = {};

clientSocket.on("anotheranim", (data) => {
    const socketId = data.id;
    if (!player[socketId]) {
        player[socketId] = TestScene.createBiker(socketId)
    }
    

    let playerGrounded = player[socketId].body.touching.down

    if(data.anim === 'left'){
        player[socketId].setVelocityX(-400)
        player[socketId].anims.play('left', true)
        player[socketId].flipX = true

    }else if(data.anim === 'right'){

        if(playerGrounded)player[socketId].anims.play('right', true)
        this.biker.flipX = false
    }
})
