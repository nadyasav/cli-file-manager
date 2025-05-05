import fs from 'node:fs/promises';
import { printFailedMsg } from "./utils.js";

export async function createFile (fileName) {
    try{
      await fs.writeFile(fileName, '', { flag: 'wx' });
    } catch {
      printFailedMsg();
    }
}
