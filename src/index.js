import readline from 'node:readline/promises';
import { INVALID_INPUT, COMMANDS } from './constants.js';
import { parseUsernameArg } from './services/parseUsernameArg.js';
import { printCurrentDir } from './services/utils.js';
import { up } from './services/up.js';
import { cdHandler } from './services/cdHandler.js';
import { lsHandler } from './services/lsHandler.js';

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

  rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(' ');
    const [arg1, arg2] = args;

    switch (command) {
      case COMMANDS.EXIT:
        exit();
        break;
      case COMMANDS.UP:
        up();
        break;
      case COMMANDS.CD:
        if (arg1) {
          cdHandler(arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.LS:
        await lsHandler();
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
