<script lang="ts" setup>
  import Today from './today.vue';
  import Calendar from './calendar/calendar.vue';
  import { selectedDay } from './calendar/calendar';

  const CalendarRef = ref<any>(null);

  const onTodayInMonthBtnClick = () => {
    CalendarRef.value.onTodayInMonthBtnClick();
  };

  watch(selectedDay, (val) => {
    console.log(val, 'selected');
  });
</script>

<template>
  <div class="time-task-container">
    <Today @onTodayInMonthBtnClick="onTodayInMonthBtnClick"></Today>
    <Calendar v-model="selectedDay" ref="CalendarRef"></Calendar>
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
