<script lang="ts" setup>
  import { Base } from './../../';
  import FolderHeader from './folder-header.vue';
  import FolderBody from './folder-body/index.vue';
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
