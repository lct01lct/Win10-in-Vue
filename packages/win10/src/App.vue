<script lang="ts" setup>
  const preventDefault = (e: Event) => e.preventDefault();

  onMounted(() => {
    document.addEventListener('selectstart', preventDefault);
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.altKey && e.keyCode === 37) e.preventDefault();
      if (e.altKey && e.keyCode === 38) e.preventDefault();
      if (e.altKey && e.keyCode === 39) e.preventDefault();
      if (e.altKey && e.keyCode === 40) e.preventDefault();
    });
  });
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
