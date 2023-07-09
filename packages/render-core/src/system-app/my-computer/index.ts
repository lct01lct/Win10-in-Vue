import { WinApp } from '@/app';
import Folder from '../folder/folder.vue';
import ComputerIcon from '../folder/img/logo.png';
import ComputerLogo from './img/computer.png';

export const userApp = new WinApp({
  name: '此电脑',
  comp: Folder,
  icon: ComputerIcon,
}).createShortcut(ComputerLogo, '此电脑');
