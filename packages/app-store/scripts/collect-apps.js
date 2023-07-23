const fs = require('fs');
const path = require('path');

const directories = fs
  .readdirSync(path.join(__dirname, '../src/'), { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name);

const exportsContent = directories
  .map((name) => `export { default as ${name}AppOrigin } from './${name}/${name}';`)
  .join('\n');

const outputContent = `import 'win/dist/style.css';\n${exportsContent}\n`;
const outputFilePath = path.join(__dirname, './../src/index.ts');
fs.writeFileSync(outputFilePath, outputContent);

// write json
fs.writeFileSync(
  path.join(__dirname, '../../../../backend/src/dev-data/app.json'),
  JSON.stringify(directories.map((name) => ({ name })))
);
