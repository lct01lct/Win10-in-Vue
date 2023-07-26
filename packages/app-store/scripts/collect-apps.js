// @ts-check
const fs = require('fs');
const path = require('path');

const directories = fs
  .readdirSync(path.join(__dirname, '../src/'), { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name);

const exportsContent = directories
  .map((name) => `export { default as ${name}AppOrigin } from './${name}';`)
  .join('\n');

const outputFilePath = path.join(__dirname, './../src/index.ts');
fs.writeFileSync(outputFilePath, exportsContent);
