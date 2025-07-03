const { constants } = require('fs');
const { copyFile, mkdir, lstat, readdir, rm } = require('fs/promises');
const { join, resolve } = require('path');

const src = 'files';
const dist = 'files-copy';

const copyFiles = async (input, output) => {
  const names = await readdir(input);

  names.map(async name => {
    const stats = await lstat(join(input, name));

    if (stats) {
      if (stats.isDirectory()) {
        await mkdir(resolve(output, name), { recursive: true });
        await copyFiles(resolve(input, name), resolve(output, name));
      } else {
        await copyFile(join(input, name), join(output, name), constants.COPYFILE_FICLONE);
      }
    }
  });
};

const main = async () => {
  await rm(resolve(__dirname, dist), { force: true, recursive: true });
  await mkdir(resolve(__dirname, dist), { recursive: true });
  await copyFiles(resolve(__dirname, src), resolve(__dirname, dist));
};

main().then(() => console.log('Copy operation completed.'));
