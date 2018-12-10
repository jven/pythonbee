import { Keystroke }  from './keystroke';

export class KeystrokeValidator {
  private validValues_: Object;

  constructor() {
    this.validValues_ = {};
    Keystroke.forEach(k => {
      this.validValues_[k] = true;
    });
  }

  isValidKeystroke(value: string) {
    return !!this.validValues_[value];
  }
}
