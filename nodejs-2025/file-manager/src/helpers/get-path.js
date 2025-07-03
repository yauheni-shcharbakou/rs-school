import { isAbsolute, join } from 'path';

export const getPath = (currentPath, path) => {
  return isAbsolute(path) ? path : join(currentPath, path);
};
