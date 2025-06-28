const { readdir, lstat } = require('fs/promises');
const { basename, extname, join, resolve } = require('path');

const main = async () => {
  const names = await readdir(resolve(__dirname, 'secret-folder'));

  names.map(async name => {
    const stats = await lstat(join(__dirname, 'secret-folder', name));

    if (!stats.isDirectory()) {
      const ext = extname(name).replace(/\./, '');
      const base = basename(name, extname(name));
      const size = `${ stats.size } b`;

      console.log(`${ base } - ${ ext } - ${ size }`);
    }
  });
};

main().then();
