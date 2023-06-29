<script lang="ts" setup>
  import ApplicationBar from './application-bar.vue';
  import EfficientWorkBar from './efficient-work-bar.vue';
  import WinSettingBar from './win-setting-bar.vue';
</script>

<template>
  <div class="system-task-detail win-task-wrapper">
    <WinSettingBar></WinSettingBar>
    <ApplicationBar></ApplicationBar>
    <EfficientWorkBar></EfficientWorkBar>
  </div>
</template>

<style scoped lang="scss">
  .win-task-wrapper {
    display: flex;
    width: 650px;
    height: 600px;
    background-color: #000;
  }
</style>
