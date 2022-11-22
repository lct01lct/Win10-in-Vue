import { WinApp } from './';
import Folder from './system/folder/folder.vue';
import { initDeskTopFolder } from './system/folder';

export const folderApp = new WinApp({
  name: '文件夹',
  comp: Folder,
  icon: '/src/assets/images/appPage/system-app/folder-app/logo.png',
});

initDeskTopFolder(folderApp);
