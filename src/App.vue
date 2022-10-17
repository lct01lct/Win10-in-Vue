<script lang="ts" setup>
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
