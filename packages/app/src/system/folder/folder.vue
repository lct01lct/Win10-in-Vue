<script lang="ts" setup>
  import { Base, WinApp } from './../../';
  import FolderHeader from './folder-header.vue';
  import FolderBody from './folder-body/index.vue';

  const currPath = ref<string>();
  const winApp = inject<WinApp>('appInstance')!;

  currPath.value = `D:\\Desktop\\${winApp.name}`;

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
