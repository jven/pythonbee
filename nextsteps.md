## Game flow
* Client shows 'Waiting for game' until receives 'start'
* Server sends 'start': prompt/problem, who is in game
* On each turn, server sends 'update' to everyone:
   * whose turn it is
   * last keystroke
* When its player X's turn, server sends 'turn' to X:
   * [no info]
* Clients send 'keystroke' events to server:
   * keystroke

* Server's 'Player' object: socket, player name

## TODO
* Finished game
* Lobby, waiting for game
* Spectator view? See the whole code base
* Deploy to heroku
* Design a way to have a set of problems and test cases
* Linting and testing the code
* Allow for rejoining
* Associate with each keystroke who made it and how long it took
* Timer (on the server)!
* Add TS linter
* Modify docker-python-sandbox-mac library to expose ports on 127.0.0.1 instead of 0.0.0.0.
* Choose host port safely