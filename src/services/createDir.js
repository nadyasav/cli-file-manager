import fs from 'node:fs/promises';
import { printFailedMsg } from "./utils.js";

export async function createDir(dirName) {
  try {
    await fs.mkdir(dirName, { errorOnExist: true });
  } catch {
    printFailedMsg();
  }
}
