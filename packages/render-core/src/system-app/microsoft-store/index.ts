import { WinApp } from '@/app';
import MicrosoftStore from './microsoft-store.vue';
import MicrosoftStoreIcon from './img/logo.png';

export const microsoftStoreName = 'Microsoft store';
export const microsoftStoreApp = new WinApp({
  name: microsoftStoreName,
  comp: MicrosoftStore,
  icon: MicrosoftStoreIcon,
  defaultHeight: 600,
  isFromSystem: true,
}).createShortcut(MicrosoftStoreIcon, microsoftStoreName);

export { MicrosoftStoreIcon };
