const { appendFile } = require('fs/promises');
const { join } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const init = async () => {
  console.log('Hello! Enter text:\n');
  await appendFile(join(__dirname, 'file.txt'), '');
};

const cancel = () => console.log('\nGoodbye!');

const read = async text => {
  if (/exit/i.test(text.trim())) return rl.close();
  // supports lower/uppercase letters in exit world

  await appendFile(join(__dirname, 'file.txt'), `${ text }\n`);
};

process.on('exit', cancel);
process.on('SIGINT', cancel);
rl.on('line', read);

init().then();
