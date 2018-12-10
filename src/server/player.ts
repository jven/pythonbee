export class Player {
  private socket_: any;
  private name_: string;

  constructor(socket: any, name: string) {
    this.socket_ = socket;
    this.name_ = name;
  }

  name(): string {
    return this.name_;
  }

  sendStartGame(problem: string, playerNames: string[]) {
    this.socket_.emit('start', {problem, playerNames});
  }

  sendUpdate(turnPlayerName: string, lastKeystroke: string) {
    this.socket_.emit('update', {turnPlayerName, lastKeystroke});
  }

  sendTurn() {
    this.socket_.emit('turn', {
      message: "Your turn!"
    });
  }
}