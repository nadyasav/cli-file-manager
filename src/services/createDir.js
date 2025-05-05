import fs from 'node:fs/promises';
import { printFailedMsg } from "./utils.js";

export async function createDir(dirName) {
  try {
    await fs.mkdir(dirName, { recursive: true, errorOnExist: true, force: false });
  } catch {
    printFailedMsg();
  }
}
