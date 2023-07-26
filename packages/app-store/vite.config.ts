import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import fs from 'fs';

const appNames = fs
  .readdirSync(path.join(__dirname, './src'), { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map(({ name }) => name);
const appInputs = appNames.map((name) => path.join(__dirname, `./src/${name}`));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), AutoImport({ imports: ['vue'] })],
  build: {
    minify: false,

    rollupOptions: {
      external: ['vue'],
      input: appInputs,
      output: {
        format: 'es',
        entryFileNames: (chunkInfo) => {
          const appName = path.basename(path.dirname(chunkInfo.facadeModuleId));

          return `${appName}/index.js`;
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name !== 'logo.png') return `assets/[name]-[hash].[ext]`;

          let folderName = '';
          const originBuffer = chunkInfo.source as Buffer;

          const isFind = appNames.some((name) => {
            const res = fs
              .readFileSync(path.join(__dirname, `./src/${name}/public/logo.png`))
              .equals(originBuffer);
            if (res) {
              folderName = name;
            }
            return res;
          });

          if (isFind) {
            return `${folderName}/logo.[ext]`;
          } else {
            return `${folderName}/assets/[name]-[hash].[ext]`;
          }
        },
      },

      preserveEntrySignatures: 'strict',
    },
  },
});
