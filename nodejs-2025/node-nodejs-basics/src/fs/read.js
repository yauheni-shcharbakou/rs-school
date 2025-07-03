import { join } from 'path';
import { readFile } from 'fs/promises';

const read = async () => {
  const filePath = join(import.meta.dirname, 'files', 'fileToRead.txt');

  try {
    const fileContent = await readFile(filePath, { encoding: 'utf-8' });
    console.log(fileContent);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await read();
