const Sandbox = require('docker-python-sandbox-mac');

export class CodeExecutor {
  private pythonSandbox_: any;
  private initialized_: boolean;

  constructor() {
    const sandboxConfig = {poolSize: 1, timeoutMs: 5000, memoryLimitMb: 500};
    this.pythonSandbox_ = new Sandbox(sandboxConfig);

    this.initialized_ = false;
  }

  initialize() {
    if (this.initialized_) {
      const reason = 'Already initialized.';
      console.error(reason);
      return Promise.reject(reason);
    }

    return new Promise((resolve, reject) => {
      this.pythonSandbox_.initialize(err => {
        if (err) {
          console.error('Error initializing sandbox:');
          console.error(err);
          reject(err);
          return;
        }
        this.initialized_ = true;
        resolve();
      });
    });
  }

  runCode(code) {
    if (!this.initialized_) {
      const reason = 'Code executor not ready yet.';
      console.error(reason);
      return Promise.reject(reason);
    }

    console.log('Running code:');
    console.log(code);
    return new Promise((resolve, reject) => {
      this.pythonSandbox_.run(
          {code},
          (err, result) => {
            if (err) {
              console.error('Failed to run code.');
              reject(err);
            } else {
              console.log('Finished running code. Result:');
              console.log('stdout = ' + result.stdout);
              console.log('stderr = ' + result.stderr);
              console.log('combined = ' + result.combined);
              console.log('isError = ' + result.isError);
              console.log('timedOut = ' + result.timedOut);
              console.log('killedByContainer = ' + result.killedByContainer);
              resolve(result);
            }
          });
    });
  }
}