var socket = io();

function main() {
  document.onkeydown = onKeyDown;
  document.onkeypress = onKeyPress;
  document.getElementById('clearLine').onclick = onClearLine;

  socket.on('code', code => showCode_(code));
}

function onKeyDown(e) {
  if (e.key != "Tab"
      && e.key != "Backspace") {
    return;
  }
  showKeystroke_(e.key);
  socket.emit('keystroke', {
    keystroke: e.key
  });
}

function onKeyPress(e) {
	showKeystroke_(e.key);
  socket.emit('keystroke', {
  	keystroke: e.key
  });
}

function onClearLine() {
  showKeystroke_('ClearLine');
  socket.emit('keystroke', {
    keystroke: 'ClearLine'
  });
}

function showKeystroke_(keystroke) {
  const lastKeystrokeEl = document.getElementById('lastKeystroke');
  lastKeystrokeEl.innerText = keystroke;
}

function showCode_(code) {
  const codeEl = document.getElementById('code');
  codeEl.innerText = code;
}

window.onload = main;