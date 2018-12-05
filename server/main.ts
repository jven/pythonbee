const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var code = [];

app.use(express.static(path.join(__dirname, '../client')))

io.on('connection', socket => socket.on('keystroke', msg => {
  code.push(msg.keystroke);
  console.log(code);
}));

server.listen(5000, () => {
  console.log('Listening on port 5000...');
});