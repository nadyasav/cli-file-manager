import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Writable } from 'node:stream';
import { printFailedMsg } from "./utils.js";

export async function readFile(filePath) {
  try {
    const filePathAbs = path.resolve(process.cwd(), filePath);

    const writeStream = new Writable({
      write(chunk, _, callback) {
        process.stdout.write(chunk);
        callback();
      },
      final(callback) {
        process.stdout.write('\n');
        callback();
      }
    });

    await pipeline(
      fs.createReadStream(filePathAbs),
      writeStream
    );
  } catch {
    printFailedMsg();
  }
}
