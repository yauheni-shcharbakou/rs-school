import { writeFile, access, constants } from 'fs/promises';
import { join } from 'path';

const create = async () => {
  const filePath = join(import.meta.dirname, 'files', 'fresh.txt');

  try {
    await access(filePath, constants.R_OK | constants.W_OK);
  } catch (error) {
    await writeFile(filePath, 'I am fresh and young', { encoding: 'utf-8' });
    return;
  }

  throw new Error('FS operation failed');
};

await create();
