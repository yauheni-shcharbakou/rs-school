const { appendFile, mkdir, readdir, readFile, writeFile } = require('fs/promises');
const { extname, join, resolve } = require('path');

const src = 'styles';
const dist = 'project-dist';

const find = async input => {
  const fileNames = await readdir(input);
  return fileNames.filter(fileName => extname(fileName) === '.css');
};

const injectStyles = async (input, output, name, bundleName) => {
  const data = await readFile(join(input, name));
  await appendFile(join(output, bundleName), data);
};

const compileStyles = async (input, output, bundleName) => {
  const names = await find(input);

  for (const name of names) {
    await injectStyles(input, output, name, bundleName);
  }
};

const main = async () => {
  await mkdir(resolve(__dirname, dist), { recursive: true });
  await writeFile(join(__dirname, dist, 'bundle.css'), '');
  await compileStyles(resolve(__dirname, src), resolve(__dirname, dist), 'bundle.css');
};

main().then(() => console.log('Styles compiled.'));
