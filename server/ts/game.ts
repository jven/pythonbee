import { KeystrokeToCodeConverter } from './keystroketocodeconverter';
import { KeystrokeValidator } from './keystrokevalidator';
import { Player } from './player';

export class Game {
  private keystrokeToCodeConverter_: KeystrokeToCodeConverter;
  private keystrokeValidator_: KeystrokeValidator;
  private keystrokes_: string[];
  private players_: Player[];
  private nextPlayerIndex_: number;
  private turnPlayerIndex_: number;
  private gameStarted_: boolean;

  constructor() {
    this.keystrokeValidator_ = new KeystrokeValidator();
    this.keystrokeToCodeConverter_ = new KeystrokeToCodeConverter();
    this.keystrokes_ = [];
    this.players_ = [];
    this.nextPlayerIndex_ = 0;
    this.turnPlayerIndex_ = 0;
    this.gameStarted_ = false;
  }

  addPlayerSocket(socket) {
    if (this.gameStarted_) {
      console.error('Game already started!');
      return;
    }

    const myPlayerNumber = this.nextPlayerIndex_;
    console.log('New player: ' + myPlayerNumber);
    const playerName = 'Player ' + myPlayerNumber;
    socket.on('keystroke', msg => this.handleKeystrokeMessage_(
        msg, myPlayerNumber));
    this.players_.push(new Player(socket, playerName));
    this.nextPlayerIndex_++;

    if (this.players_.length == 2) {
      this.startGame();
    }
  }

  startGame() {
    this.gameStarted_ = true;

    const playerNames = this.players_.map(p => p.name());
    this.players_.forEach(p => p.sendStartGame(
        'Write a function f that returns True.',
        playerNames));

    this.sendUpdate_();
  }

  sendUpdate_() {
    this.players_.forEach(p => p.sendUpdate(
        this.players_[this.turnPlayerIndex_].name(),
        this.keystrokes_.length
            ? this.keystrokes_[this.keystrokes_.length - 1]
            : null));
  }

  handleKeystrokeMessage_(msg, playerIndex: number) {
    if (playerIndex !== this.turnPlayerIndex_) {
      console.log('Not your turn!');
      return;
    }
    if (!msg.keystroke) {
      // No keystroke given.
      console.log('No keystroke given.');
      return;
    }
    if (!this.keystrokeValidator_.isValidKeystroke(msg.keystroke)) {
      // No keystroke or invalid keystroke given.
      console.log('Invalid keystroke value: ' + msg.keystroke);
      return;
    }

    this.keystrokes_.push(msg.keystroke);
    console.log(this.keystrokes_);

    this.turnPlayerIndex_ = (this.turnPlayerIndex_ + 1) % this.players_.length;
    this.sendUpdate_();
  }

  getCode(): string {
    return this.keystrokeToCodeConverter_.convert(this.keystrokes_);
  }
}

exports.Game = Game;