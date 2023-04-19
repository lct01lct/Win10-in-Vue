import { WinApp } from '../../';
import Folder from '../../system/folder/folder.vue';
import ComputerIcon from '../../assets/images/appPage/system-app/folder-app/logo.png';
import ComputerLogo from '../../assets/images/appPage/system-app/my-computer/computer.png';

export const userApp = new WinApp({
  name: '此电脑',
  comp: Folder,
  icon: ComputerIcon,
}).createShortcut(ComputerLogo, '此电脑');
