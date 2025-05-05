function start() {
  const username = parseUsernameArg();
  const startMsg = username ? `Welcome to the File Manager, ${username}!` : 'Welcome to the File Manager!';

  console.log(startMsg);
}

function parseUsernameArg() {
  const args = process.argv.slice(2);
  const argUsername = args.find(arg => arg.startsWith('--username'));

  if (!argUsername) {
    return null;
  }

  const [_, username] = argUsername.split('=');
  return username?.trim() || null;
}

start();
