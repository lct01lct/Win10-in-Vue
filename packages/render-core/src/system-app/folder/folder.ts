import { Pointer } from './types';
import { Folder } from 'model-core';

export const currPointer = ref<Pointer>();

const desktop = Folder.getDeskTop();
currPointer.value = desktop;
