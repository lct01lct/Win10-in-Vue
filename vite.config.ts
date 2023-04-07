import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
import ViteCompression from 'vite-plugin-compression';
import { cdn, Transformed } from 'vite-plugin-cdn2';

const config = loadEnv('development', './');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  server: {
    port: Number(config.VITE_PORT),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },

    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },

  plugins: [
    vue(),
    AutoImport({ imports: ['vue'] }),
    ViteCompression(),
    cdn({
      isProduction: true,
      modules: [
        {
          name: 'vue',
          global: 'Vue',
        },
        {
          name: 'lodash',
          global: 'fect',
          spare: ['https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js'],
        },
      ],
      preset: false,
      transform(result: Transformed & { tag: string; defer: boolean }) {
        if (result.tag === 'script') result.defer = true;
      },
    }),
  ],

  build: {
    outDir: './docs',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => (id.includes('node_modules') ? 'vendor' : undefined),
      },
    },
  },
});
