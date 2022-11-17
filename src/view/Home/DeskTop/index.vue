<script lang="ts" setup>
  import binData from '@/config/bin-data';

  console.log(binData);
  console.log(binData[0].addFile('1.html'));
  console.log(binData[0].addFile('1.html'));
  // Folder.findByPath(binData[0].path);
</script>

<template>
  <div class="deskTop-wrapper"></div>
</template>

<style scoped></style>
