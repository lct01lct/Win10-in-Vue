import { WinApp } from './';
import Folder from './system/folder/folder.vue';
import { initDeskTopFolder } from './system/folder';

export const userApp = new WinApp({
  name: '此电脑',
  comp: Folder,
  icon: '/src/assets/images/appPage/system-app/folder-app/logo.png',
}).createShortcut('/src/app/system/folder/img/computer.png', '此电脑');

export const folderApp = new WinApp({
  name: '文件夹',
  comp: Folder,
  icon: '/src/assets/images/appPage/system-app/folder-app/logo.png',
});

initDeskTopFolder(folderApp);
