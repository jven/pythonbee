const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const webSocket = require('socket.io')(server);

import { CodeExecutor } from './codeexecutor';
import { Game } from './game';

const game : Game = new Game();
const codeExecutor = new CodeExecutor();

app
  .use(express.static(path.join(__dirname, '../client')))
  .get('/code', (req, res) => res.send(game.getCode()))
  .get('/test', (req, res) => {
    const code = 'print (3+3)';
    codeExecutor.runCode(code)
        .then(result => {
          res.send(result['combined']);
        })
        .catch(err => res.send('Error: ' + err));
  })

webSocket.on('connection', socket => game.addPlayerSocket(socket));

console.log('Initializing code executor...');
codeExecutor.initialize()
    .then(() => {
      console.log('Finished.');
      server.listen(5000, () => {
        console.log('Listening on port 5000...');
      });
    })
    .catch(err => {
      console.error(err);
    });