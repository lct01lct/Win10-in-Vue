<script lang="ts" setup>
  import Trigger from './taskBar-cur-trigger.vue';
  import { taskBarTriggerList } from '@/app/base/taskBar';
  import { WinApp } from '@/app';
</script>

<template>
  <div class="current-task-wrapper">
    <Trigger
      v-for="item in taskBarTriggerList"
      :key="item.name"
      :icon-path="item.iconPath"
      :name="item.name"
      :win-app="(item.winApp as WinApp)"
    ></Trigger>
  </div>
</template>

<style scoped lang="scss">
  .current-task-wrapper {
    width: 100%;
    display: flex;
  }
</style>
