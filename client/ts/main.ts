var socket = io();

function main() {
  document.onkeydown = onKeyDown;
}

function onKeyDown(e) {
	const lastKeystrokeEl = document.getElementById('lastKeystroke');
  lastKeystrokeEl.innerHTML = e.keyCode;
  socket.emit('keystroke', {
  	keystroke: e.keyCode
  });
}

window.onload = main;