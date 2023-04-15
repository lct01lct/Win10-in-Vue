<script lang="ts" setup>
  import { Base, WinApp } from './../../';
  import FolderHeader from './folder-header.vue';
  import FolderBody from './folder-body/index.vue';
  import { Folder, Desc } from 'win10/src/share/file';

  const winApp = inject<WinApp>('appInstance')!;
  const currPointer = ref<Folder | Desc>();
  const visitedList = reactive<(Folder | Desc)[]>([]);
  const currIdxInVisitList = ref<number>(-1);
  let isRecordVisitByOpt = true;

  const backward = () => {
    if (currIdxInVisitList.value > 0) {
      isRecordVisitByOpt = false;
      currPointer.value = visitedList[--currIdxInVisitList.value] as Folder | Desc;
    }
  };

  const forward = () => {
    if (currIdxInVisitList.value < visitedList.length - 1) {
      isRecordVisitByOpt = false;
      currPointer.value = visitedList[++currIdxInVisitList.value] as Folder | Desc;
    }
  };

  const setCurrPointer = (currentPointer: Desc | Folder) => {
    isRecordVisitByOpt = true;

    if (currIdxInVisitList.value > -1) {
      visitedList.length = currIdxInVisitList.value + 1;
    }
    currPointer.value = currentPointer;
  };

  const recordHistory = (currPointer: Desc | Folder) => {
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
  provide('currPath', currPath);
  provide('visitedList', visitedList);
  provide('currPointer', currPointer);
  provide('setCurrPointer', setCurrPointer);
  provide('currIdxInVisitList', currIdxInVisitList);

  // init
  (() => {
    if (winApp.infoByOpened) {
      const folderName = winApp.infoByOpened.folderName;
      const folderPointer = winApp.infoByOpened.folderPointer;
      const res =
        folderPointer ||
        Folder.findByPath(`C:\\DeskTop${folderName === '此电脑' || '' ? '' : '\\' + folderName}`);

      if (res) {
        setCurrPointer(res);
      }
    }
  })();
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
