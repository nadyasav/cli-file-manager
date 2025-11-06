import readline from 'node:readline/promises';
import { INVALID_INPUT, COMMANDS } from './constants.js';
import { parseUsernameArg } from './services/parseUsernameArg.js';
import { printCurrentDir } from './services/utils.js';
import { up } from './services/up.js';
import { cdHandler } from './services/cdHandler.js';
import { lsHandler } from './services/lsHandler.js';
import { createFile } from './services/createFile.js';
import { createDir } from './services/createDir.js';
import { removeFile } from './services/removeFile.js';
import { renameFile } from './services/renameFile.js';
import { readFile } from './services/readFile.js';
import { copyFile } from './services/copyFile.js';
import { moveFile } from './services/moveFile.js';
import { compressFile, decompressFile } from './services/compress.js';
import { calculateHash } from './services/hash.js';

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
      case COMMANDS.ADD:
        if (arg1) {
          await createFile(arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.CAT:
        if (arg1) {
          await readFile(arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.CP:
        if (arg1 && arg2) {
          await copyFile(arg1, arg2);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.MV:
        if (arg1 && arg2) {
          await moveFile(arg1, arg2);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.MKDIR:
        if (arg1) {
          await createDir(arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.RM:
        if (arg1) {
          await removeFile(arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.RN:
        if (arg1 && arg2) {
          await renameFile(arg1, arg2);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.COMPRESS:
        if (arg1 && arg2) {
          await compressFile(arg1, arg2);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.DECOMPRESS:
        if (arg1 && arg2) {
          await decompressFile(arg1, arg2);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.HASH:
        if (arg1) {
          await calculateHash(arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      default:
        console.log(INVALID_INPUT);
        break;
    }

    printCurrentDir();
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
