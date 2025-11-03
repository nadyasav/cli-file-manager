import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { printFailedMsg } from "./utils.js";

export async function copyFile(filePath, dirPath) {
  try {
    const filePathAbs = path.resolve(process.cwd(), filePath);
    let dirPathAbs = path.resolve(process.cwd(), dirPath);

    const fileStats = await fs.promises.stat(filePathAbs);
    const dirStats = await fs.promises.stat(dirPathAbs);

    if (fileStats.isFile() && dirStats.isDirectory()) {
      dirPathAbs = path.join(dirPathAbs, path.basename(filePathAbs));
    } else {
      throw new Error();
    }

    await pipeline(
      fs.createReadStream(filePathAbs),
      fs.createWriteStream(dirPathAbs, { flags: 'wx' })
    );
  } catch {
    printFailedMsg();
  }
}
