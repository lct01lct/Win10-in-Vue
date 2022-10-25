<script lang="ts" setup>
  import Popover from '@/components/Popover/index.vue';
  import { hour, minute, year, month, date } from '@/share/time';
</script>

<script lang="ts">
  export default {
    name: 'TimeTask',
  };
</script>

<template>
  <Popover :left-margin="-218" animation-dir="top">
    <div class="time-task-container"></div>
    <template #reference>
      <div class="task-bg-item time-task">
        <span>{{ hour }}:{{ minute }}</span>
        <span>{{ year }}-{{ month }}-{{ date }}</span>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss">
  .time-task {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px !important;
    color: #fff;
    font-size: 13px;
    > span {
      &:nth-child(2) {
        margin-top: 5px;
      }
    }
  }

  .time-task-container {
    width: 360px;
    height: 690px;
    background-color: #1e1e1e;
    opacity: 0.9;
  }
</style>
