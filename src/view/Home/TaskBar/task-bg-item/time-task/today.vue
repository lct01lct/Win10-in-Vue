<script lang="ts" setup>
  import { second, minute, hour, year, month, date, lunar } from '@/share/time';
  import Btn from '@/components/Btn/index.vue';
  import { resetCalendar } from './calendar/calendar';

  const emits = defineEmits(['onTodayInMonthBtnClick']);

  const onTodayBtnClick = () => {
    resetCalendar();
    nextTick(() => {
      emits('onTodayInMonthBtnClick');
    });
  };
</script>

<template>
  <div class="today-wrapper">
    <div class="hour-minute-second">{{ hour }}:{{ minute }}:{{ second }}</div>
    <div class="today-btn-wrapper">
      <Btn @click="onTodayBtnClick">
        <span class="year-month-date">{{ year }}-{{ month }}-{{ date }} {{ lunar }}</span>
      </Btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .today-wrapper {
    height: 120px;
    border-bottom: 1px solid #636363;
    display: flex;
    padding-left: 20px;
    flex-direction: column;
    justify-content: center;

    .hour-minute-second {
      color: #fff;
      font-size: 44px;
      font-weight: 100;
    }

    .year-month-date {
      margin-top: 5px;
      color: #a6d8ff;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #a8a8a8;
      }
    }
  }
</style>
