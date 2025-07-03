import { resolve } from 'path';
import { stat, readdir } from 'fs/promises';
import { getPath } from '../helpers/get-path.js';

export const up = (_, currentPath) => {
  const potentialPath = resolve(currentPath, '..');

  if (potentialPath !== currentPath) {
    process.chdir(potentialPath);
  }
};

export const cd = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    console.error('Invalid input');
    return;
  }

  const potentialPath = getPath(currentPath, path);
  const pathStat = await stat(potentialPath);

  if (!pathStat.isDirectory()) {
    throw new Error('It is not directory');
  }

  process.chdir(potentialPath);
  return potentialPath;
};

export const ls = async (_, currentPath) => {
  const items = await readdir(currentPath, { withFileTypes: true });

  const data = items
    .map((item) => ({
      Name: item.name,
      Type: item.isDirectory() ? 'directory' : 'file',
    }))
    .sort((first, second) => {
      if (first.Type !== second.Type) {
        return first.Type === 'directory' ? -1 : 1;
      }

      return first.Name.localeCompare(second.Name);
    });

  console.table(data);
};
