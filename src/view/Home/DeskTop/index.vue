<script lang="ts" setup>
  import { resetFocusIcon } from '@/app';
  const reset = () => {
    resetFocusIcon();
  };
</script>

<template>
  <div class="deskTop-wrapper" @click="reset"></div>
</template>

<style scoped>
  .deskTop-wrapper {
    position: relative;
    z-index: auto;
    width: 1536px;
    height: 704px;
    background: url('@/assets/images/homePage/wallpaper/win-default.jpg') no-repeat;
    background-size: 100vw calc(100vh - 50px);
  }
</style>
