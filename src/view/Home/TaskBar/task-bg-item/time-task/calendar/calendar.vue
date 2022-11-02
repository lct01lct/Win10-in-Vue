<script lang="ts" setup>
  import Btn from '@/components/Btn/index.vue';
  import { year, month, date, getDiffDays, todayStr } from '@/share/time';
  import dayjs from 'dayjs';
  import { getNearestInt } from '@/utils/number';
  import throttle from 'lodash/throttle';
  import CalendarDate from './calendar-date.vue';
  import {
    domSommthlyScroll,
    currentYear,
    currentMonth,
    scroPx,
    fsm,
    selectType,
  } from './calendar';

  const props = defineProps({
    modelValue: {
      type: String,
      default: todayStr,
    },
  });
  const emits = defineEmits(['update:modelValue']);

  const goTodayInMonth = () => {
    domSommthlyScroll(calendarDateRef.value!.calendarRef!, -scroPx);
    emits('update:modelValue', `${year.value}-${month.value}-${date.value}`);
  };

  const goPrevMonth = () => {
    const scroDay = calendarDateRef.value!.rowDay.add(getNearestInt(scroPx / 50), 'week');
    const currMonth = dayjs(`${currentYear.value}-${currentMonth.value}-01`);
    const prevMonth = dayjs(currMonth).add(-1, 'month');
    const diffDays = getDiffDays(scroDay, prevMonth);
    const tarNum = Math.floor(diffDays / 7) + (diffDays % 7 === 0 ? 0 : 1);

    domSommthlyScroll(calendarDateRef.value!.calendarRef!, -tarNum * 50);

    let scroPx1 = scroPx;
    setTimeout(() => {
      let scroNum = Math.abs(scroPx - scroPx1) / 50;
      scroNum = getNearestInt(scroNum);
      if (scroNum !== tarNum) {
        domSommthlyScroll(calendarDateRef.value!.calendarRef!, -(tarNum - scroNum) * 50);
      }
    }, 300);
  };

  const goNextMonth = () => {
    const scroDay = calendarDateRef.value!.rowDay.add(getNearestInt(scroPx / 50), 'week'); // 滚动条的 Day
    const currMonth = dayjs(`${currentYear.value}-${currentMonth.value}-01`);
    const nextMonth = dayjs(currMonth).add(1, 'month');
    const tarNum = Math.floor(getDiffDays(nextMonth, scroDay) / 7);

    domSommthlyScroll(calendarDateRef.value!.calendarRef!, tarNum * 50);

    let scroPx1 = scroPx;
    setTimeout(() => {
      let scroNum = (scroPx - scroPx1) / 50;
      scroNum = getNearestInt(scroNum);

      if (tarNum !== scroNum) {
        domSommthlyScroll(calendarDateRef.value!.calendarRef!, (tarNum - scroNum) * 50);
      }
    }, 300);
  };

  const onTodayInMonthBtnClick = throttle(goTodayInMonth, 600);
  const onPrevMonthClick = throttle(goPrevMonth, 600);
  const onNextMonthClick = throttle(goNextMonth, 600);

  const selectedDay = ref<string>(props.modelValue);

  watch(selectedDay, (val) => {
    emits('update:modelValue', val);
  });

  const calendarDateRef = ref<InstanceType<typeof CalendarDate> | null>();

  const setType = () => {
    fsm.step();
  };

  defineExpose({
    onTodayInMonthBtnClick,
    reset: fsm.reset,
  });
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-title">
      <Btn color="#dfdfdff3" hover-color="#fff" @click="setType">
        <span class="current">{{ currentYear }} 年 {{ currentMonth }} 月</span>
      </Btn>
      <span class="btn-group">
        <Btn color="#dfdfdff3" hover-color="#fff" @click="onPrevMonthClick">
          <span class="iconfont icon-xiangshang"></span>
        </Btn>
        <Btn color="#dfdfdff3" hover-color="#fff" @click="onNextMonthClick">
          <span class="iconfont icon-xiangxia"></span>
        </Btn>
      </span>
    </div>
    <div class="calendar-table">
      <CalendarDate
        ref="calendarDateRef"
        v-model="selectedDay"
        v-if="selectType === 'date'"
      ></CalendarDate>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .calendar-wrapper {
    padding: 1.25rem;
    font-size: 0.875rem;
    font-weight: 400;

    .calendar-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 1.25rem;
      }
    }

    .calendar-table {
      margin-top: 1.25rem;
      color: #fff;
      font-size: 0.875rem;
    }
  }
</style>
