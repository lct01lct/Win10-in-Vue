import { WinApp } from '../../';
import { deskTopData } from 'win10/src/config/bin-data';
import fileFullIcon from '../../assets/images/appPage/system-app/folder-app/file-full.png';

export const initDeskTopFolder = (app: WinApp) => {
  deskTopData.children.forEach((item: { name: string }) => {
    app.createShortcut(fileFullIcon, item.name);
  });
};
