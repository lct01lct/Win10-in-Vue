import { WinApp } from '../../';
import { deskTopData } from 'win10/src/config/bin-data';
import fileFullIcon from './img/file-full.png';
import FolderIcon from './img/logo.png';
import Folder from './folder.vue';

type FolderApp = WinApp & { init?: () => void };

export const isFolderApp = (winApp: WinApp): winApp is FolderApp => winApp === folderApp;

export const folderApp: FolderApp = new WinApp({
  name: '文件夹',
  comp: Folder,
  icon: FolderIcon,
});

export const initDeskTopFolder = (app: WinApp) => {
  deskTopData.children.forEach((item: { name: string }) => {
    app.createShortcut(fileFullIcon, item.name);
  });
};

initDeskTopFolder(folderApp);
