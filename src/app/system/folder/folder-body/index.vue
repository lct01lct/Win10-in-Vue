<script lang="ts" setup>
  import FolderBodyMenu from './folder-body-menu/index.vue';
  import FolderBodyNavigation from './folder-body-navigation/index.vue';
  import FolderBodyContent from './folder-body-content/index.vue';
</script>

<template>
  <div class="folder-body-wrapper">
    <FolderBodyMenu></FolderBodyMenu>
    <FolderBodyNavigation></FolderBodyNavigation>
    <FolderBodyContent></FolderBodyContent>
  </div>
</template>

<style scoped></style>
