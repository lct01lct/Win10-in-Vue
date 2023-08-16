import { Pointer } from './types';
import { Folder } from 'model-core';

export const currPointer = ref<Pointer>();

export const selectedFoldersAndFiles = computed(() =>
  currPointer.value?.children.filter((item) => item.isFocus)
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

watch(currPointer, (_, oldPointer) => {
  clearSelectedFoldersAndFiles(oldPointer);
});
