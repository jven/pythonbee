export class KeystrokeToCodeConverter {
  constructor() {}

  convert(keystrokes: string[]): string {
    var lines : string[] = [""];
    keystrokes.forEach(keystroke => {
      if (keystroke == "Enter") {
        lines.push("");
      } else if (keystroke == "Backspace") {
        if (!lines[lines.length - 1].length) {
          if (lines.length > 1) {
            lines.pop();
          }
        } else {
          lines[lines.length - 1] = lines[lines.length - 1].slice(
              0, lines[lines.length - 1].length - 1);
        }
      } else if (keystroke == "ClearLine") {
        lines[lines.length - 1] = "";
      } else {
        if (keystroke == "Tab") {
          keystroke = "\t";
        }
        lines[lines.length - 1] += keystroke;
      }
    });
    return lines.join("\n");
  }
}