var socket = io();

function main() {
  document.onkeydown = onKeyDown;
  document.onkeypress = onKeyPress;
  document.getElementById('clearLine').onclick = onClearLine;

  socket.on('code', code => showCode_(code));
  socket.on('keystroke', code => showKeystroke_(code));
}

function onKeyDown(e) {
  if (e.key != "Tab"
      && e.key != "Backspace") {
    return;
  }
  socket.emit('keystroke', {
    keystroke: e.key
  });
}

function onKeyPress(e) {
  socket.emit('keystroke', {
  	keystroke: e.key
  });
}

function onClearLine() {
  socket.emit('keystroke', {
    keystroke: 'ClearLine'
  });
}

function showKeystroke_(keystroke) {
  const lastKeystrokeEl = document.getElementById('lastKeystroke');
  if (keystroke == ' ') {
    keystroke = 'Space';
  }
  lastKeystrokeEl.innerText = keystroke;
}

function showCode_(code) {
  const codeEl = document.getElementById('code');
  codeEl.innerText = code;
}

window.onload = main;