import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import fs from 'fs';

const appInputs = fs
  .readdirSync(path.join(__dirname, './src'), { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map(({ name }) => path.join(__dirname, `./src/${name}`));

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
      plugins: [
        {
          name: 'my-plugin',
          transform(code, id) {
            // 在 transform 钩子中获取文件所在的目录并保存在闭包中
            let originalDir; // 保存文件所在的目录

            originalDir = path.dirname(id);

            // 处理代码并返回
            const transformedCode = doSomethingWithCode(code);
            return {
              code: transformedCode,
              map: null, // 如果要支持 sourcemap，请提供正确的 sourcemap
            };
          },

          generateBundle(outputOptions, bundle) {
            // 在 generateBundle 钩子中使用闭包中保存的文件所在的目录
            for (const fileName in bundle) {
              const entry = bundle[fileName];
              // console.log(entry);
              // console.log(entry.facadeModuleId);
            }
          },
        },
      ],
      external: ['vue'],
      input: appInputs,
      output: {
        format: 'es',
        entryFileNames: '{folderName}-app.js',
        assetFileNames: () => {
          return 'assets/{folderName}-[hash].[ext]';
        },
      },

      preserveEntrySignatures: 'strict',
    },
  },
});

function doSomethingWithCode(code) {
  // 在这里可以使用闭包中保存的文件所在的目录来进行处理
  // 例如，根据目录执行不同的操作
  // 这里只是一个示例，实际逻辑可能会更复杂
  return code;
}
