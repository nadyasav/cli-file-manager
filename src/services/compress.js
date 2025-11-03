import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';
import { printFailedMsg } from "./utils.js";

export async function compressFile(filePath, archivePath) {
  try {
    const filePathAbs = path.resolve(process.cwd(), filePath);
    const archivePathAbs = path.resolve(process.cwd(), archivePath);

    const fileStats = await fs.promises.stat(filePathAbs);

    if (!fileStats.isFile()) {
      throw new Error();
    }

    await pipeline(
      fs.createReadStream(filePathAbs),
      zlib.createBrotliCompress(),
      fs.createWriteStream(archivePathAbs, { flags: 'wx' })
    );
  } catch {
    printFailedMsg();
  }
}

export async function decompressFile(archivePath, filePath) {
  try {
    const archivePathAbs = path.resolve(process.cwd(), archivePath);
    const filePathAbs = path.resolve(process.cwd(), filePath);

    const archiveStats = await fs.promises.stat(archivePathAbs);

    if (!archiveStats.isFile()) {
      throw new Error();
    }

    await pipeline(
      fs.createReadStream(archivePathAbs),
      zlib.createBrotliDecompress(),
      fs.createWriteStream(filePathAbs, { flags: 'wx' })
    );
  } catch {
    printFailedMsg();
  }
}
