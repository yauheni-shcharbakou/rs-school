import { cp, access, constants } from 'fs/promises';
import { join } from 'path';

const copy = async () => {
  const srcPath = join(import.meta.dirname, 'files');
  const destPath = join(import.meta.dirname, 'files_copy');

  let isDestFolderExists = false;

  try {
    await access(destPath, constants.R_OK | constants.W_OK);
    isDestFolderExists = true;
  } catch (error) {}

  try {
    if (isDestFolderExists) {
      throw new Error();
    }

    await cp(srcPath, destPath, { recursive: true });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await copy();
