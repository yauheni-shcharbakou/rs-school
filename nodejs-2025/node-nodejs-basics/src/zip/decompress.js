import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

const decompress = async () => {
  try {
    const filePath = join(import.meta.dirname, 'files', 'fileToCompress.txt');
    const zipPath = join(import.meta.dirname, 'files', 'archive.gz');

    await pipeline(
      createReadStream(zipPath),
      createGunzip(),
      createWriteStream(filePath, { encoding: 'utf-8' }),
    );
  } catch (error) {
    throw new Error('Zip operation failed');
  }
};

await decompress();
