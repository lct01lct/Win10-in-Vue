<script lang="ts" setup>
  import wifiSetting from './wifi-setting.vue';
  import wifiList from './wifi-list.vue';
  import { wifiStatus } from './wifi-task';
</script>

<template>
  <div class="task-bg-detail power-task" :style="{ height: !wifiStatus ? '400px' : '580px' }">
    <div class="wifi-closed" v-if="!wifiStatus"></div>
    <wifiList v-else></wifiList>
    <wifiSetting></wifiSetting>
  </div>
</template>

<style scoped lang="scss">
  .power-task {
    width: 360px;
  }
</style>
