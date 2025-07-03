import { getPath } from '../helpers/get-path.js';
import { pipeline } from 'stream/promises';
import { createReadStream, constants, createWriteStream } from 'fs';
import {
  writeFile,
  access,
  mkdir as mkdirFs,
  rename,
  stat,
  rm as rmFs,
} from 'fs/promises';
import { dirname, join, basename } from 'path';

export const cat = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    console.error('Invalid input');
    return;
  }

  const filePath = getPath(currentPath, path);

  await pipeline(
    createReadStream(filePath, { encoding: 'utf-8' }),
    process.stdout,
    { end: false },
  );
};

export const add = async (args, currentPath) => {
  const [fileName] = args;

  if (!fileName) {
    console.error('Invalid input');
    return;
  }

  const filePath = getPath(currentPath, fileName);

  try {
    await access(filePath, constants.R_OK | constants.W_OK);
    throw new Error('File exists');
  } catch (e) {
    if (e.code === 'ENOENT') {
      await writeFile(filePath, '', { encoding: 'utf-8' });
    } else {
      throw e;
    }
  }
};

export const mkdir = async (args, currentPath) => {
  const [dirName] = args;

  if (!dirName) {
    console.error('Invalid input');
    return;
  }

  const path = getPath(currentPath, dirName);

  try {
    await access(path, constants.R_OK | constants.W_OK);
    throw new Error('Directory exists');
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdirFs(path, { recursive: true });
    } else {
      throw e;
    }
  }
};

export const rn = async (args, currentPath) => {
  const [pathToFile, newFileName] = args;

  if (!pathToFile || !newFileName) {
    console.error('Invalid input');
    return;
  }

  const path = getPath(currentPath, pathToFile);
  const newPath = join(dirname(path), newFileName);

  try {
    await access(newPath, constants.R_OK | constants.W_OK);
    throw new Error('File already exists');
  } catch (e) {
    if (e.code === 'ENOENT') {
      await rename(path, newPath);
    } else {
      throw e;
    }
  }
};

export const cp = async (args, currentPath) => {
  const [srcPath, destPath] = args;

  if (!srcPath || !destPath) {
    console.error('Invalid input');
    return;
  }

  const filePath = getPath(currentPath, srcPath);
  await access(filePath, constants.R_OK | constants.W_OK);

  let destFilePath = getPath(currentPath, destPath);

  try {
    const destStat = await stat(destFilePath);

    if (destStat.isDirectory()) {
      destFilePath = join(destFilePath, basename(filePath));
    }
  } catch (e) {}

  await pipeline(
    createReadStream(filePath, { encoding: 'utf-8' }),
    createWriteStream(destFilePath, { encoding: 'utf-8' }),
  );
};

export const mv = async (args, currentPath) => {
  const [srcPath, destPath] = args;

  if (!srcPath || !destPath) {
    console.error('Invalid input');
    return;
  }

  const filePath = getPath(currentPath, srcPath);
  await access(filePath, constants.R_OK | constants.W_OK);

  let destFilePath = getPath(currentPath, destPath);

  try {
    const destStat = await stat(destFilePath);

    if (destStat.isDirectory()) {
      destFilePath = join(destFilePath, basename(filePath));
    }
  } catch (e) {}

  const readStream = createReadStream(filePath, {
    encoding: 'utf-8',
  });

  const writeStream = createWriteStream(destFilePath, {
    encoding: 'utf-8',
  });

  readStream.on('error', () => console.error('Operation failed'));
  writeStream.on('error', () => console.error('Operation failed'));

  readStream.pipe(writeStream).on('close', async () => rmFs(filePath));
};

export const rm = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    console.error('Invalid input');
    return;
  }

  await rmFs(getPath(currentPath, path), { recursive: true });
};
