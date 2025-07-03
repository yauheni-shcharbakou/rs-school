import { createReadStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';

const read = async () => {
  try {
    const filePath = join(import.meta.dirname, 'files', 'fileToRead.txt');
    const readStream = createReadStream(filePath, { encoding: 'utf-8' });
    await pipeline(readStream, process.stdout);
  } catch (error) {
    throw new Error('Stream operation failed');
  }
};

await read();
