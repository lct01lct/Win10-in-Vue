import { WinApp } from '@/app';
import { deskTopData } from 'model-core';
import fileFullIcon from './img/file-full.png';
import FolderIcon from './img/logo.png';
import Folder from './folder.vue';

export class FolderApp extends WinApp {
  init?: () => void;
}
export const folderAppName = '文件夹';

export const folderApp = new FolderApp({
  name: folderAppName,
  comp: Folder,
  icon: FolderIcon,
  isFromSystem: true,
});

export const initDeskTopFolder = (app: FolderApp) => {
  deskTopData.children.forEach((item: { name: string }) => {
    app.createShortcut(fileFullIcon, item.name);
  });
};

initDeskTopFolder(folderApp);
