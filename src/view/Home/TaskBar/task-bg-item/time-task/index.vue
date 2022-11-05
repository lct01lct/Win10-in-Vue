<script lang="ts" setup>
  import Popover from '@/components/Popover/index.vue';
  import { hour, minute, year, month, date } from '@/share/time';
  import Container from './container.vue';
  import { resetCalendar } from './calendar/calendar';
</script>

<script lang="ts">
  export default {
    name: 'TimeTask',
  };
</script>

<template>
  <Popover :left-margin="-218" animation-dir="top" @closed="resetCalendar">
    <Container></Container>
    <template #reference>
      <div class="task-bg-detail time-task">
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
</style>
