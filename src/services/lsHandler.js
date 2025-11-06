import fs from 'node:fs/promises';
import { join } from 'node:path';
import { printFailedMsg } from "./utils.js";

async function getDirItemInfo(name, currentDir) {
  const stats = await fs.stat(join(currentDir, name));
  const itemInfo = {
    Name: name,
    Type: stats.isDirectory() ? 'directory' : 'file'
  };

  return itemInfo;
}

export async function lsHandler() {
  try {
    const currentDir = process.cwd();
    const names = await fs.readdir(currentDir);
    const itemsList = [];

    for (const name of names) {
      try {
        const itemInfo = await getDirItemInfo(name, currentDir);
        itemsList.push(itemInfo);
      } catch {}
    }

    const sortedItemsList = itemsList.sort((a, b) => a.Name.localeCompare(b.Name));
    console.table(sortedItemsList);
  } catch {
    printFailedMsg();
  }
}
