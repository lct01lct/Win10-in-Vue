<script lang="ts" setup>
  import TaskBarSystem from './taskBar-system.vue';
  import TaskBarCur from './taskBar-cur.vue';
  import TaskBarBg from './taskBar-bg.vue';
  import { taskBarContentZIndex } from 'model-core';
  import { CSSProperties } from 'vue';

  const style = computed<CSSProperties>(() => {
    return { zIndex: taskBarContentZIndex };
  });
</script>

<template>
  <div class="taskBar-wrapper" :style="style">
    <TaskBarSystem></TaskBarSystem>
    <TaskBarCur></TaskBarCur>
    <TaskBarBg></TaskBarBg>
  </div>
</template>

<style scoped lang="scss">
  .taskBar-wrapper {
    display: flex;
    position: absolute;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    background-color: #1d1f20;
  }
</style>
