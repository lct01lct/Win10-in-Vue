<script lang="ts" setup>
  import { Base } from '@/app';
  import FolderHeader from './folder-header.vue';
</script>

<template>
  <Base>
    <template #header>
      <FolderHeader></FolderHeader>
    </template>
    <template #body></template>
  </Base>
</template>

<style scoped></style>
