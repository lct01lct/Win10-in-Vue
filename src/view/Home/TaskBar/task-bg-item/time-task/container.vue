<script lang="ts" setup>
  import Today from './today.vue';
  import Calendar from './calendar/calendar.vue';
  import { todayStr } from '@/share/time';

  const CalendarRef = ref<any>(null);

  const onTodayInMonthBtnClick = () => {
    CalendarRef.value.onTodayInMonthBtnClick();
  };

  const selecedDay = ref<string>(todayStr);

  watch(selecedDay, (val) => {
    console.log(val);
  });
</script>

<template>
  <div class="time-task-container">
    <Today @onTodayInMonthBtnClick="onTodayInMonthBtnClick"></Today>
    <Calendar v-model="selecedDay" ref="CalendarRef"></Calendar>
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
