const fs = require('fs');
const path = require('path');

const directories = fs
  .readdirSync(path.join(__dirname, '../src/'), { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name);

const exportsContent = directories
  .map((file) => `export { default as ${file} } from './${file}';`)
  .join('\n');

const outputContent = `${exportsContent}\n`;

const outputFilePath = path.join(__dirname, './../src/index.ts');
fs.writeFileSync(outputFilePath, outputContent);