import path from 'node:path';
import { printFailedMsg } from './utils.js';

export function up() {
  try {
    const currentDir = process.cwd();
    const rootDir = path.parse(currentDir).root;

    if (currentDir !== rootDir) {
      const parentDir = path.dirname(currentDir);
      process.chdir(parentDir);
    }
  } catch {
    printFailedMsg();
  }
}
