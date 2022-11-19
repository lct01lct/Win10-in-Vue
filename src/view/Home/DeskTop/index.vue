<script lang="ts" setup>
  import { testApp } from '@/app';

  const click = () => {
    testApp.open();
  };
</script>

<template>
  <div class="deskTop-wrapper">
    <button @click="click()" style="position: absolute">btn</button>
  </div>
</template>

<style scoped>
  .deskTop-wrapper {
    position: relative;
    width: 1536px;
    height: 704px;
    background: url('@/assets/images/homePage/wallpaper/win-default.jpg') 100%;
  }
</style>
