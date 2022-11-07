<script lang="ts" setup>
  import MessageTask from './task-bg-item/mess-task.vue';
  import TimeTask from './task-bg-item/time-task/index.vue';
  import PowerTask from './task-bg-item/power-task.vue';
  import InputMethodTask from './task-bg-item/inputMethod-task.vue';
  import ArrowTask from './task-bg-item/arrow-task.vue';
  import WifiTask from './task-bg-item/wifi-task.vue';
  import VolumeTask from './task-bg-item/volume-task.vue';

  const inputMethodType = ref<'英' | '中'>('英');
</script>

<template>
  <div class="background-task-wrapper">
    <ArrowTask></ArrowTask>

    <PowerTask></PowerTask>

    <WifiTask></WifiTask>

    <VolumeTask></VolumeTask>

    <div class="system-task task-bg-item">
      <div
        style="font-size: 17px; color: #fff"
        @click="inputMethodType = inputMethodType === '中' ? '英' : '中'"
      >
        {{ inputMethodType }}
      </div>
    </div>

    <InputMethodTask></InputMethodTask>

    <TimeTask></TimeTask>

    <MessageTask></MessageTask>

    <div class="back-deskTop-item"></div>
  </div>
</template>

<style lang="scss">
  .background-task-wrapper {
    display: flex;
    align-items: center;
    height: 50px;
    .system-task {
      box-sizing: content-box;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .back-deskTop-item {
      width: 5px;
      height: 50px;
      border-left: 1px solid #fff;
    }
    .task-bg-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 50px;
      cursor: default;

      &:hover {
        background-color: #373838;
      }
    }
  }
</style>
