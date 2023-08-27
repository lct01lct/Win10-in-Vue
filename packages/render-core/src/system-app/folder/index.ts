import { ShortCutOption, WinApp } from '@/app';
import { Folder, deskTopData } from 'model-core';
import fileFullIcon from './img/file-full.png';
import FolderIcon from './img/logo.png';
import FolderVue from './folder.vue';

export class FolderApp extends WinApp {
  init?: () => void;
}
export const folderAppName = '文件夹';

export const folderApp = new FolderApp({
  name: folderAppName,
  comp: FolderVue,
  icon: FolderIcon,
  isFromSystem: true,
});

export { fileFullIcon };

(function init() {
  deskTopData.children.forEach((item: { name: string }) => {
    folderApp.createShortcut(fileFullIcon, item.name);
  });
})();

export const addFolderInDeskTop = (folder: Folder, options?: ShortCutOption) => {
  return folderApp.createShortcut(fileFullIcon, folder.name, options);
};
