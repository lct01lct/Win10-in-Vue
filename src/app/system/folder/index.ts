import { WinApp } from '@/app';
import { deskTopData } from '@/config/bin-data';

export const initDeskTopFolder = (app: WinApp) => {
  deskTopData.children.forEach((item) => {
    app.createShortcut('/src/assets/images/appPage/system-app/folder-app/file-full.png', item.name);
  });
};
