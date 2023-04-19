import { WinApp } from '../../';
import { deskTopData } from 'win10/src/config/bin-data';
import fileFullIcon from '../../assets/images/appPage/system-app/folder-app/file-full.png';
import FolderIcon from '../../assets/images/appPage/system-app/folder-app/logo.png';
import Folder from './folder.vue';

export const folderApp = new WinApp({
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
