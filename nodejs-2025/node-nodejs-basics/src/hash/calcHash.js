import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';
import { pipeline } from 'stream/promises';

const calculateHash = async () => {
  try {
    const filePath = join(
      import.meta.dirname,
      'files/fileToCalculateHashFor.txt',
    );
    const readStream = createReadStream(filePath, { encoding: 'utf-8' });
    const cheaper = createHash('sha256');

    await pipeline(readStream, cheaper.setEncoding('hex'), process.stdout);
  } catch (error) {
    throw Error('FS operation failed');
  }
};

await calculateHash();
