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
  .use(express.static(path.join(__dirname, '../../client')))
  .get('/code', (req, res) => res.send(game.getCode()))
  .get('/test', (req, res) => {
    const code = 'def f(a,b):\n  return a+b';
    const lang = 'python';
    const timeoutMs = 2000;
    const testCases = [
      {
        params: [
          {type: "int", value: "3"},
          {type: "int", value: "2"}
        ],
        expected: {
          type: "int",
          value: "5"
        }
      },
      {
        params: [
          {type: "int", value: "3"},
          {type: "int", value: "6"}
        ],
        expected: {
          type: "int",
          value: "9"
        }
      },
      {
        params: [
          {type: "int", value: "12"},
          {type: "int", value: "14"}
        ],
        expected: {
          type: "int",
          value: "26"
        }
      }
    ];
    codeExecutor.runCode(code, lang, timeoutMs, testCases)
        .then(results => {
          res.send(results);
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