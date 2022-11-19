<script lang="ts" setup>
  import { createApplications } from '@/app';
</script>

<template>
  <div class="deskTop-wrapper">
    <button @click="createApplications(['test'])" style="position: absolute">btn</button>
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
