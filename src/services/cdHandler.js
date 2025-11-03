import { printFailedMsg } from "./utils.js";

export function cdHandler(path) {
  try {
    process.chdir(path);
  } catch {
    printFailedMsg();
  }
}
