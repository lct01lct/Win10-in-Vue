<script lang="ts" setup>
  import { Base, WinApp } from './../../';
  import FolderHeader from './folder-header.vue';
  import FolderBody from './folder-body/index.vue';
  import { Folder, BinType } from 'win10/src/share/file';

  const currPath = ref<string>('');
  const winApp = inject<WinApp>('appInstance')!;
  const showFoldersAndFiles = ref<BinType>();
  provide('showFoldersAndFiles', showFoldersAndFiles);

  const getPointer = () => {
    if (currPath.value) {
      const pointer = Folder.findByPath(currPath.value);
      if (pointer) {
        showFoldersAndFiles.value = pointer;
      }
    }
  };

  watch(currPath, getPointer);

  setTimeout(() => {
    if (winApp.infoByOpened) {
      const folderName = (winApp.infoByOpened as { folderName: string }).folderName;

      currPath.value = `C:\\DeskTop${folderName === '此电脑' || '' ? '' : '\\' + folderName}`;
    }
  }, 200);

  provide('currPath', currPath);
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
