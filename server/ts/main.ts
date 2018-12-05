const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const webSocket = require('socket.io')(server);

import { Game } from './game';

const game : Game = new Game();

app.use(express.static(path.join(__dirname, '../../client')))

webSocket.on('connection', socket => game.addPlayerSocket(socket));

server.listen(5000, () => {
  console.log('Listening on port 5000...');
});