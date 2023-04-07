import { WinApp } from '@/app';
import { deskTopData } from '@/config/bin-data';
import fileFullIcon from '@/assets/images/appPage/system-app/folder-app/file-full.png';

export const initDeskTopFolder = (app: WinApp) => {
  deskTopData.children.forEach((item) => {
    app.createShortcut(fileFullIcon, item.name);
  });
};
