<script lang="ts" setup>
  import Menu from './menu.vue';
  import FolderContent from './folder-content.vue';
</script>

<template>
  <div class="folder-container-wrapper">
    <Menu></Menu>
    <FolderContent></FolderContent>
  </div>
</template>

<style scoped>
  .folder-container-wrapper {
    display: flex;
    overflow: hidden;
  }
</style>
