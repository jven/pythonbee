const Sandbox = require('docker-python-sandbox-mac');

import { TestCase, TypedValue } from './types';

export class CodeExecutor {
  private pythonSandbox_: any;
  private initialized_: boolean;

  constructor() {
    const sandboxConfig = {poolSize: 1, timeoutMs: 5000, memoryLimitMb: 50};
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

  runCode(
      code: string,
      lang: string,
      timeoutMs: number,
      testCases: TestCase[]) {
    if (!this.initialized_) {
      const reason = 'Code executor not ready yet.';
      console.error(reason);
      return Promise.reject(reason);
    }

    console.log('Running code: ' + code);
    return new Promise((resolve, reject) => {
      this.pythonSandbox_.run(
          {code, lang, timeoutMs, testCases},
          (err, results) => {
            console.log('Results:');
            console.log(results);
            if (err) {
              console.error('Failed to run code.');
              reject(err);
            } else {
              resolve(results);
            }
          });
    });
  }
}