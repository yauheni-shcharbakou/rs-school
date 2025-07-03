import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { getPath } from '../helpers/get-path.js';

export const compress = async (args, currentPath) => {
  const [srcPath, destPath] = args;

  if (!srcPath || !destPath) {
    console.error('Invalid input');
    return;
  }

  await pipeline(
    createReadStream(getPath(currentPath, srcPath), { encoding: 'utf-8' }),
    createBrotliCompress(),
    createWriteStream(getPath(currentPath, destPath)),
  );
};

export const decompress = async (args, currentPath) => {
  const [srcPath, destPath] = args;

  if (!srcPath || !destPath) {
    console.error('Invalid input');
    return;
  }

  await pipeline(
    createReadStream(getPath(currentPath, srcPath)),
    createBrotliDecompress(),
    createWriteStream(getPath(currentPath, destPath), { encoding: 'utf-8' }),
  );
};
