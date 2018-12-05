import { KeystrokeToCodeConverter } from './keystroketocodeconverter';
import { KeystrokeValidator } from './keystrokevalidator';

export class Game {
  private keystrokeToCodeConverter_: KeystrokeToCodeConverter;
  private keystrokeValidator_: KeystrokeValidator;
  private keystrokes_: string[];

  constructor() {
    this.keystrokeValidator_ = new KeystrokeValidator();
    this.keystrokeToCodeConverter_ = new KeystrokeToCodeConverter();
    this.keystrokes_ = [];
  }

  addPlayerSocket(socket) {
    socket.on('keystroke', msg => this.handleKeystrokeMessage_(msg));
  }

  handleKeystrokeMessage_(msg) {
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
  }

  getCode(): string {
    return this.keystrokeToCodeConverter_.convert(this.keystrokes_);
  }
}

exports.Game = Game;