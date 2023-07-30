<script lang="ts" setup>
  const preventDefault = (e: Event) => e.preventDefault();

  onMounted(() => {
    document.addEventListener('selectstart', preventDefault);
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('contextmenu', preventDefault, true);
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.altKey && e.keyCode === 37) preventDefault(e);
      if (e.altKey && e.keyCode === 38) preventDefault(e);
      if (e.altKey && e.keyCode === 39) preventDefault(e);
      if (e.altKey && e.keyCode === 40) preventDefault(e);
    });
  });
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
