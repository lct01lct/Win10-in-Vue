import { checkAppIsFolderApp, deskTopIconList } from '@/app';
import { Pointer } from './types';
import { Files, Folder } from 'model-core';

export const currPointer = ref<Pointer>();

export const isCurrPointerInDeskTop = () => {
  return currPointer.value === desktop;
};

export const selectedFoldersAndFiles = computed(() =>
  currPointer.value!.children.filter((item) => item.isFocus)
);

const desktop = Folder.getDeskTop();
currPointer.value = desktop;

export const clearSelectedFoldersAndFiles = (pointer?: Pointer) => {
  pointer = pointer || currPointer.value;
  currPointer.value?.children.forEach((item) => {
    item.isEditting = false;
    item.isFocus = false;
  });
};

export const renamePointer = (item: Files | Folder, newName: string) => {
  if (item.isEditting) {
    const currItem = item;
    const originName = currItem.name;
    currItem.name = newName;
    currItem.isEditting = false;

    if (isCurrPointerInDeskTop()) {
      const folderIcon = deskTopIconList.value.find(
        (item) => checkAppIsFolderApp(item.reference) && item.displayName === originName
      );
      if (folderIcon) {
        folderIcon.displayName = newName;
      }
    }
  }
};

watch(currPointer, (_, oldPointer) => {
  clearSelectedFoldersAndFiles(oldPointer);
});
