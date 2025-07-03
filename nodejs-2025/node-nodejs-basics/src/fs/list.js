import { readdir } from 'fs/promises';
import { join } from 'path';

const list = async () => {
  const filesDirPath = join(import.meta.dirname, 'files');

  try {
    const files = await readdir(filesDirPath, { encoding: 'utf-8' });
    console.log(files);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await list();
