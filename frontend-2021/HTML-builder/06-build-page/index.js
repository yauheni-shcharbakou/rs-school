const { constants } = require('fs');
const { mkdir, readdir, rm, readFile, writeFile, lstat, copyFile, appendFile } = require('fs/promises');
const { extname, join, resolve } = require('path');

const assets = 'assets';
const css = 'styles';
const html = 'components';
const dist = 'project-dist';

// TODO: ASSETS

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

// TODO: STYLES

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

// TODO: HTML

const loadTemplate = async () => {
  const data = await readFile(join(__dirname, 'template.html'));
  return data.toString();
};

const loadComponents = async () => {
  const res = {};
  let fileNames = await readdir(resolve(__dirname, html));

  fileNames = fileNames.filter(fileName => extname(fileName) === '.html');

  for (const fileName of fileNames) {
    const data = await readFile(join(__dirname, html, fileName));
    const name = fileName.replace(extname(fileName), '');

    res[name.toLowerCase()] = data.toString();
  }

  return res;
};

const compileHtml = async () => {
  let template = await loadTemplate();
  const components = await loadComponents();

  Object.keys(components).map(component => {
    template = template.replace(
      new RegExp(`{{( ?| +)${ component }( ?| +)}}`, 'g'), components[component]
    );
  });

  await writeFile(join(__dirname, dist, 'index.html'), template);
};

// TODO: MAIN

const gulp = async () => {
  const files = await readdir(resolve(__dirname));

  if (files.filter(fileName => fileName === dist).length) {
    await rm(resolve(__dirname, dist), { force: true, recursive: true, maxRetries: 5 });
  }

  await mkdir(resolve(__dirname, dist), { recursive: true });

  await copyFiles(resolve(__dirname, assets), resolve(__dirname, dist, assets));
  await compileStyles(resolve(__dirname, css), resolve(__dirname, dist), 'style.css');
  await compileHtml();
};

gulp().then(() => console.log('All compiled.'));
