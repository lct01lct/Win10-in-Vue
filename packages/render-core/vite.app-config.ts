import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },

    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },

  plugins: [vue(), AutoImport({ imports: ['vue'] })],

  build: {
    lib: {
      entry: './src/app/index.ts',
      fileName: 'render-core',
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [
        AutoImport({
          imports: ['vue'], // 同样在输出中静态导入模块
        }),
      ],
    },
    outDir: './dist',
  },
});
