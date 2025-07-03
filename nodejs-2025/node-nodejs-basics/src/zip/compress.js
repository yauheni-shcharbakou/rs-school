import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const compress = async () => {
  try {
    const filePath = join(import.meta.dirname, 'files', 'fileToCompress.txt');
    const zipPath = join(import.meta.dirname, 'files', 'archive.gz');

    await pipeline(
      createReadStream(filePath, { encoding: 'utf-8' }),
      createGzip(),
      createWriteStream(zipPath),
    );
  } catch (error) {
    throw new Error('Zip operation failed');
  }
};

await compress();
