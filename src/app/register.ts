import { WinApp } from './';
import Test from './test.vue';

export const testApp = new WinApp({
  name: '文件夹',
  comp: Test,
  icon: '/src/assets/images/appPage/system-app/folder-app/logo.png',
}).createShortcut('/src/assets/images/appPage/system-app/folder-app/file-empty.png', '前端');
