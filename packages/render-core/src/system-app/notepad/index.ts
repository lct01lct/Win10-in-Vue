import { WinApp } from '@/app';
import NotepadAppIcon from './img/logo.png';
import NotepadVue from './notepad.vue';

export const notepadAppName = '记事本';
export const notepadApp = new WinApp({
  name: notepadAppName,
  icon: NotepadAppIcon,
  comp: NotepadVue,
  isFromSystem: true,
});

export { NotepadAppIcon as notepadAppIcon };
