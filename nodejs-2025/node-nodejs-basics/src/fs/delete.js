import { rm } from 'fs/promises';
import { join } from 'path';

const remove = async () => {
  const fileToRemovePath = join(
    import.meta.dirname,
    'files',
    'fileToRemove.txt',
  );

  try {
    await rm(fileToRemovePath, { force: false });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await remove();
