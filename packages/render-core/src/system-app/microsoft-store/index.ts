import { WinApp } from '@/app';
import MicrosoftStore from './microsoft-store.vue';
import MicrosoftStoreIcon from './img/logo.png';
// import { gameAppOrigin } from 'app-store';

// new WinApp(gameAppOrigin).createShortcut(MicrosoftStoreIcon, 'you');
export const microsoftStoreName = 'Microsoft store';
export const microsoftStoreApp = new WinApp({
  name: microsoftStoreName,
  comp: MicrosoftStore,
  icon: MicrosoftStoreIcon,
  defaultHeight: 600,
  isFromSystem: true,
}).createShortcut(MicrosoftStoreIcon, microsoftStoreName);

export { MicrosoftStoreIcon };
