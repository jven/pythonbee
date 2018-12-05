var socket = io();

function main() {
  document.onkeydown = onKeyDown;
  document.onkeypress = onKeyPress;
}

function onKeyDown(e) {
  if (e.key != "Tab"
      && e.key != "Backspace") {
    return;
  }
  const lastKeystrokeEl = document.getElementById('lastKeystroke');
  lastKeystrokeEl.innerHTML = e.key;
  socket.emit('keystroke', {
    keystroke: e.key
  });
}

function onKeyPress(e) {
	const lastKeystrokeEl = document.getElementById('lastKeystroke');
  lastKeystrokeEl.innerHTML = e.key;
  socket.emit('keystroke', {
  	keystroke: e.key
  });
}

window.onload = main;