import { printCurrentDir, printFailedMsg } from "./utils.js";

export function cdHandler(path) {
  try {
    process.chdir(path);
    printCurrentDir();
  } catch {
    printFailedMsg();
  }
}
