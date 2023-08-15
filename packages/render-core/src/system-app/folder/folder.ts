import { Pointer } from './types';
import { Files, Folder } from 'model-core';

export const currPointer = ref<Pointer>();

export const selectedFoldersAndFiles = reactive<(Folder | Files)[]>([]);

const desktop = Folder.getDeskTop();
currPointer.value = desktop;
