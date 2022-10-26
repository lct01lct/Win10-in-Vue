<script lang="ts" setup>
  import Today from './today.vue';
  import Calendar from './calendar.vue';
</script>

<template>
  <div class="time-task-container">
    <Today></Today>
    <Calendar></Calendar>
  </div>
</template>

<style scoped lang="scss">
  .time-task-container {
    width: 360px;
    height: 690px;
    background-color: #1e1e1e;
    opacity: 0.9;
  }
</style>
