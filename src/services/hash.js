import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { printFailedMsg } from "./utils.js";

export async function calculateHash(filePath) {
  try {
    const filePathAbs = path.resolve(process.cwd(), filePath);

    const fileStats = await fs.promises.stat(filePathAbs);
    if (!fileStats.isFile()) {
      throw new Error();
    }

    const hash = crypto.createHash('sha256');

    await pipeline(
      fs.createReadStream(filePathAbs),
      hash
    );

    console.log(hash.digest('hex'));
  } catch {
    printFailedMsg();
  }
}
