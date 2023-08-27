import { WinApp } from '@/app';
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
