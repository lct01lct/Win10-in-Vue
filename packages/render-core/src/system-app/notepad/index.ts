import { DeskTopIcon, WinApp } from '@/app';
import NotepadAppIcon from './img/logo.png';
import NotepadVue from './notepad.vue';
import { InitFileOpt, createFile, deskTopData } from 'model-core';

export const notepadAppName = '记事本';
export const notepadApp = new WinApp({
  name: notepadAppName,
  icon: NotepadAppIcon,
  comp: NotepadVue,
  isFromSystem: true,
});

export { NotepadAppIcon as notepadAppIcon };

export const createNewFileIconInDeskTop = (fileOption: InitFileOpt, e: MouseEvent) => {
  const newFile = createFile(fileOption, deskTopData);
  const newFileIcon = notepadApp.createShortcut(newFile.defaultIcon, newFile.fullName, {
    posIdx: DeskTopIcon.computePosIdx(e),
  });
  newFileIcon.isEditting = true;
  newFileIcon.isFocus = true;
  return newFileIcon;
};
