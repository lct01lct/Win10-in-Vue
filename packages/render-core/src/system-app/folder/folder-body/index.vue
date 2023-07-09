<script lang="ts" setup>
  import FolderBodyMenu from './folder-body-menu/index.vue';
  import FolderBodyNavigation from './folder-body-navigation/index.vue';
  import FolderBodyContent from './folder-body-content/index.vue';
  import FolderBodyGuide from './folder-body-guide.vue';
</script>

<template>
  <div class="folder-body-wrapper">
    <FolderBodyMenu></FolderBodyMenu>
    <FolderBodyNavigation></FolderBodyNavigation>
    <FolderBodyContent></FolderBodyContent>
    <FolderBodyGuide></FolderBodyGuide>
  </div>
</template>

<style scoped></style>
