import { WinApp } from '.';
import Folder from './system/folder/folder.vue';
import { initDeskTopFolder } from './system/folder';
import ComputerLogo from './assets/images/appPage/system-app/my-computer/computer.png';
import ComputerIcon from './assets/images/appPage/system-app/folder-app/logo.png';
import FolderIcon from './assets/images/appPage/system-app/folder-app/logo.png';

export const userApp = new WinApp({
  name: '此电脑',
  comp: Folder,
  icon: ComputerIcon,
}).createShortcut(ComputerLogo, '此电脑');

export const folderApp = new WinApp({
  name: '文件夹',
  comp: Folder,
  icon: FolderIcon,
});

initDeskTopFolder(folderApp);
