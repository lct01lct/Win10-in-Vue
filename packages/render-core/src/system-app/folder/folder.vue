<script lang="ts" setup>
  import { Base, WinApp } from '@/app';
  import FolderHeader from './folder-header.vue';
  import FolderBody from './folder-body/index.vue';
  import { Pointer } from './types';
  import { Folder } from 'model-core';
  import { FolderApp } from '.';

  const folderApp = inject<FolderApp>('appInstance')!;
  const currPointer = ref<Pointer>();
  const visitedList = reactive([]) as Pointer[];
  const currIdxInVisitList = ref<number>(-1);
  let isRecordVisitByOpt = true;

  const backward = () => {
    if (currIdxInVisitList.value > 0) {
      isRecordVisitByOpt = false;
      currPointer.value = visitedList[--currIdxInVisitList.value];
    }
  };

  const forward = () => {
    if (currIdxInVisitList.value < visitedList.length - 1) {
      isRecordVisitByOpt = false;
      currPointer.value = visitedList[++currIdxInVisitList.value];
    }
  };

  const step = (index: number) => {
    isRecordVisitByOpt = false;
    currIdxInVisitList.value = index;
    currPointer.value = visitedList[index];
  };

  const setCurrPointer = (currentPointer: Pointer) => {
    isRecordVisitByOpt = true;

    if (currIdxInVisitList.value > -1) {
      visitedList.length = currIdxInVisitList.value + 1;
    }
    currPointer.value = currentPointer;
  };

  const recordHistory = (currPointer: Pointer) => {
    visitedList.push(currPointer);
    currIdxInVisitList.value++;
  };

  const currPath = computed(() => {
    const _currPointer = currPointer.value;

    if (_currPointer && isRecordVisitByOpt) {
      recordHistory(_currPointer);
    }

    return _currPointer?.path;
  });

  provide('backward', backward);
  provide('forward', forward);
  provide('step', step);
  provide('currPath', currPath);
  provide('visitedList', visitedList);
  provide('currPointer', currPointer);
  provide('setCurrPointer', setCurrPointer);
  provide('currIdxInVisitList', currIdxInVisitList);

  const init = () => {
    if (folderApp.infoByOpened) {
      const folderName = folderApp.infoByOpened.folderName;
      const folderPointer = folderApp.infoByOpened.folderPointer;
      const res =
        folderPointer ||
        Folder.findByPath(`C:\\DeskTop${folderName === '此电脑' || '' ? '' : '\\' + folderName}`);

      if (res) {
        setCurrPointer(res);
      }
    }
  };

  folderApp.init = init;

  init();
</script>

<template>
  <Base>
    <template #header>
      <FolderHeader></FolderHeader>
    </template>
    <template #body>
      <FolderBody></FolderBody>
    </template>
  </Base>
</template>

<style scoped></style>
