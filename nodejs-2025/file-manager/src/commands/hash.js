import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import { getPath } from '../helpers/get-path.js';

export const hash = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    console.error('Invalid input');
    return;
  }

  const filePath = getPath(currentPath, path);
  const cheaper = createHash('sha256');

  await pipeline(
    createReadStream(filePath, { encoding: 'utf-8' }),
    cheaper.setEncoding('hex'),
    process.stdout,
    { end: false },
  );
};
