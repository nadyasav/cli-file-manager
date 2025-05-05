import { OPERATION_FAILED } from '../constants.js';

export function printCurrentDir() {
  console.log(`You are currently in ${process.cwd()}`);
}

export function printFailedMsg() {
  console.log(OPERATION_FAILED);
}
