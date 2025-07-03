import { rename as fsRename, access, constants } from 'fs/promises';
import { join } from 'path';

const rename = async () => {
  const filesDirPath = join(import.meta.dirname, 'files');
  const baseFilePath = join(filesDirPath, 'wrongFilename.txt');
  const resultFilePath = join(filesDirPath, 'properFilename.md');

  let isResultFileExists = false;

  try {
    await access(resultFilePath, constants.R_OK | constants.W_OK);
    isResultFileExists = true;
  } catch (error) {}

  try {
    if (isResultFileExists) {
      throw new Error();
    }

    await fsRename(baseFilePath, resultFilePath);
  } catch (e) {
    throw new Error('FS operation failed');
  }
};

await rename();
