<script lang="ts" setup>
  import Menu from './menu.vue';
  import FolderContent from './folder-content.vue';
</script>

<template>
  <div class="folder-content-wrapper">
    <Menu></Menu>
    <FolderContent></FolderContent>
  </div>
</template>

<style scoped>
  .folder-content-wrapper {
    display: flex;
  }
</style>
