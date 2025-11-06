import fs from 'node:fs/promises';
import { printFailedMsg } from "./utils.js";

export async function removeFile (fileName) {
    try{
      await fs.rm(fileName);
    } catch {
      printFailedMsg();
    }
}
