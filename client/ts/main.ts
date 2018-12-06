var socket = io();

function main() {
  document.onkeydown = onKeyDown;
  document.onkeypress = onKeyPress;
  document.getElementById('clearLine').onclick = onClearLine;

  socket.on('start', msg => onStart_(msg));
  // socket.on('update', msg => onUpdate_(msg));
  // socket.on('turn', msg => onTurn_(msg));
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

function onStart_(msg) {
  document.getElementById('waiting').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
}

// function showKeystroke_(keystroke) {
//   const lastKeystrokeEl = document.getElementById('lastKeystroke');
//   if (keystroke == ' ') {
//     keystroke = 'Space';
//   }
//   lastKeystrokeEl.innerText = keystroke;
// }

// function showCode_(code) {
//   const codeEl = document.getElementById('code');
//   codeEl.innerText = code;
// }

window.onload = main;