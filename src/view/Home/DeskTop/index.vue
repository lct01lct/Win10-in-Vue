<script lang="ts" setup>
  import { testApp } from '@/app';

  const click = () => {
    testApp.open();
  };
</script>

<template>
  <div class="deskTop-wrapper">
    <div style="position: absolute">
      <button @click="click">btn</button>
    </div>
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
