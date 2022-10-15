import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
const config = loadEnv('development', './');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(config.VITE_PORT),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },

    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', 'vue'],
  },

  plugins: [vue(), AutoImport({ imports: ['vue'] })],
});
