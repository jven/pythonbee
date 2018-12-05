import { Keystroke }  from './keystroke';

export class KeystrokeValidator {
  private validValues_: Object;

  constructor() {
    this.validValues_ = {};
    for (var key in Keystroke) {
      this.validValues_[Keystroke[key]] = true;
    }
  }

  isValidKeystroke(value: number) {
    return !!this.validValues_[value];
  }
}
