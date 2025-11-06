import fs from 'node:fs/promises';
import { printFailedMsg } from "./utils.js";

export async function renameFile (oldFileName, newFileName) {
  try{
    await fs.rename(oldFileName, newFileName);
  } catch {
    printFailedMsg();
  }
}
