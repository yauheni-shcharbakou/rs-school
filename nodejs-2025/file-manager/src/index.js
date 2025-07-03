import { getUsername } from './helpers/get-username.js';
import { homedir } from 'os';
import { createInterface } from 'readline/promises';
import { exit } from './helpers/exit.js';
import { handleCommand } from './commands/index.js';

const username = getUsername();
let currentPath = homedir();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentPath}`);

const terminal = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

terminal.prompt();

terminal.on('line', async (data) => {
  if (data.trim() === '.exit') {
    return exit(username);
  }

  try {
    currentPath = await handleCommand(data, currentPath);
  } catch (e) {
    console.log('Operation failed');
  }

  console.log(`You are currently in ${currentPath}`);
  terminal.prompt();
});

terminal.on('SIGINT', () => exit(username));
process.on('SIGINT', () => exit(username));
