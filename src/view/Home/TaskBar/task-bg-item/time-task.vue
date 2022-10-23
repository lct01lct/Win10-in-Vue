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
  <Popover :left-margin="-358" animation-dir="top">
    <div class="test-container"></div>
    <template #reference>
      <div class="time-task task-bg-item">
        <span>{{ hour }}:{{ minute }}</span>
        <span>{{ year }}-{{ month }}-{{ date }}</span>
      </div>
    </template>
  </Popover>
</template>

<style scoped></style>
