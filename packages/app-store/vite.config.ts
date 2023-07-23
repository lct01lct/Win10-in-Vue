import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import fs from 'fs';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), AutoImport({ imports: ['vue'] })],
  build: {
    lib: {
      entry: fs
        .readdirSync(path.join(__dirname, './src'), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map(({ name }) => `./src/${name}/${name}.ts`),
      fileName: (format, entryName) => {
        return `${entryName}.js`;
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
});
