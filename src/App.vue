<script lang="ts" setup>
  const preventDefault = (e: Event) => e.preventDefault();

  document.addEventListener('selectstart', preventDefault);
  document.addEventListener('contextmenu', preventDefault);
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
