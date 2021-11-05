const express = require('express');
const app = express();

const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const socket = require('socket.io');
const serverSocket = socket(server);

serverSocket.on('connection', (oneSocket) => {
  console.log(`Connection from client ${oneSocket.id}`);
 
  oneSocket.on("anotheranim", (data) => {
    oneSocket.broadcast.emit("anotheranim", { id: oneSocket.id, anim: data.anim });
  });

});