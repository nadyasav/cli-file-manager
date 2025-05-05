import readline from 'node:readline/promises';
import { INVALID_INPUT } from './constants.js';
import { parseUsernameArg } from './services/parseUsernameArg.js';
import { printCurrentDir } from './services/utils.js';
import { up } from './services/up.js';

function start() {
  const username = parseUsernameArg();
  const userNameValue = username || 'Guest';
  const startMsg = `Welcome to the File Manager, ${userNameValue}!`;
  const exitMsg = `Thank you for using File Manager, ${userNameValue}, goodbye!`;

  console.log(startMsg);
  printCurrentDir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    const inputValue = input.trim();

    switch (inputValue) {
      case '.exit':
        exit();
        break;
      case 'up':
        up();
        break;
      default:
        console.log(INVALID_INPUT);
        break;
    }
  });

  rl.on('SIGINT', () => {
    exit();
  });

  function exit() {
    console.log(exitMsg);
    rl.close();
    process.exit(0);
  }
}

start();
