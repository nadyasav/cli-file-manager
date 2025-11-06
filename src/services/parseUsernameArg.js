export function parseUsernameArg() {
  const args = process.argv.slice(2);
  const argUsername = args.find(arg => arg.startsWith('--username'));

  if (!argUsername) {
    return null;
  }

  const [_, username] = argUsername.split('=');
  return username?.trim() || null;
}
