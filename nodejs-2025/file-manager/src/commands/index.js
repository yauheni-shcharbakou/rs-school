import { up, cd, ls } from './nav.js';
import { os } from './os.js';
import { hash } from './hash.js';
import { compress, decompress } from './zip.js';
import { cat, add, mv, rm, rn, cp, mkdir } from './fs.js';

const commandByName = {
  up,
  cd,
  ls,
  os,
  hash,
  compress,
  decompress,
  cat,
  add,
  mv,
  rm,
  rn,
  cp,
  mkdir,
};

export const handleCommand = async (data, currentPath) => {
  const [command, ...args] = data.split(' ');
  const handler = commandByName[command];

  if (!handler) {
    console.log('Invalid input');
    return currentPath;
  }

  const changedPath = await handler(args, currentPath);
  return changedPath ?? currentPath;
};
