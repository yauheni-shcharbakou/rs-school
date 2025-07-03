import { createWriteStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';

const write = async () => {
  try {
    const filePath = join(import.meta.dirname, 'files', 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    throw new Error('Stream operation failed');
  }
};

await write();
