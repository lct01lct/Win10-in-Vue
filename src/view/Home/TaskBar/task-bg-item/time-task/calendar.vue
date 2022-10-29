<script lang="ts" setup>
  import Btn from '@/components/Btn/index.vue';
  import {
    year,
    month,
    date,
    paddingZero,
    getDiffDays,
    getFormatFullTime,
    isToday,
  } from '@/share/time';
  import dayjs, { Dayjs } from 'dayjs';
  import {
    getNowDay,
    getDayLunar,
    domSommthlyScroll,
    calendarProps,
    calendarEmits,
  } from './calendar';
  import { getNearestInt } from '@/utils/number';
  import throttle from 'lodash/throttle';

  defineProps(calendarProps);
  const emits = defineEmits(calendarEmits);

  const currentYear = ref<string>(year.value);
  const currentMonth = ref<string>(month.value);
  const isScrolling = ref<boolean>(false);
  const calendarRef = ref<HTMLElement | null>(null);

  const baseArr = reactive(new Array(30).fill(0).map((i, index) => index));
  let frontP = 0;

  const load = (dir: 'up' | 'down') => {
    if (dir === 'down') {
      baseArr.push(baseArr[baseArr.length - 1] + 1);
    } else {
      baseArr.unshift(--frontP);
    }
  };

  let scroPx: number = 0; // 记录滚动的 px 值
  const scrollCb = (scrolledPx: number) => {
    const scrolledWeeks = Math.floor(scrolledPx / 50) + 2.5; // 设置2.5， 因为第二个半行是月份是分隔线
    const scrolledDay = getNowDay(`${year.value}-${month.value}-01`).add(scrolledWeeks * 7, 'day');

    currentMonth.value = paddingZero(scrolledDay.month() + 1);
    currentYear.value = String(scrolledDay.year());
    scroPx = scrolledPx;
  };

  const nowMonthFirstDay = getNowDay(`${year.value}-${month.value}-01`); // 今天所在月份的第一天
  const rowDay = nowMonthFirstDay.add(-nowMonthFirstDay.day() + 1, 'day');

  const getDay = (row: number, col: number) => {
    return rowDay.add((row - 1) * 7 + col - 1, 'day');
  };

  const getClass = (row: number, col: number) => {
    const classes: string[] = [];
    const day = getDay(row, col);

    // 滚动高亮和本月的日期高亮
    if (isScrolling.value) {
      classes.push('light');
    } else if (getFormatFullTime(day) === selectedDay.value) {
      classes.push('light');
    } else {
      classes.push(day.month() + 1 === Number(currentMonth.value) ? 'light' : 'dark');
    }

    // 今天的日期
    classes.push(isToday(day) ? 'today' : '');

    return classes;
  };

  const scrollingCb = (isScroll: boolean) => {
    isScrolling.value = isScroll;
  };

  const goTodayInMonth = () => {
    domSommthlyScroll(calendarRef.value!, -scroPx);
  };

  const goPrevMonth = () => {
    const scroDay = rowDay.add(getNearestInt(scroPx / 50), 'week');
    const currMonth = dayjs(`${currentYear.value}-${currentMonth.value}-01`);
    const prevMonth = dayjs(currMonth).add(-1, 'month');
    const diffDays = getDiffDays(scroDay, prevMonth);
    const tarNum = Math.floor(diffDays / 7) + (diffDays % 7 === 0 ? 0 : 1);

    domSommthlyScroll(calendarRef.value!, -tarNum * 50);

    let scroPx1 = scroPx;
    setTimeout(() => {
      let scroNum = Math.abs(scroPx - scroPx1) / 50;
      scroNum = getNearestInt(scroNum);
      if (scroNum !== tarNum) {
        domSommthlyScroll(calendarRef.value!, -(tarNum - scroNum) * 50);
      }
    }, 300);
  };

  const goNextMonth = () => {
    const scroDay = rowDay.add(getNearestInt(scroPx / 50), 'week'); // 滚动条的 Day
    const currMonth = dayjs(`${currentYear.value}-${currentMonth.value}-01`);
    const nextMonth = dayjs(currMonth).add(1, 'month');
    const tarNum = Math.floor(getDiffDays(nextMonth, scroDay) / 7);

    domSommthlyScroll(calendarRef.value!, tarNum * 50);

    let scroPx1 = scroPx;
    setTimeout(() => {
      let scroNum = (scroPx - scroPx1) / 50;
      scroNum = getNearestInt(scroNum);

      if (tarNum !== scroNum) {
        domSommthlyScroll(calendarRef.value!, (tarNum - scroNum) * 50);
      }
    }, 300);
  };

  const onTodayInMonthBtnClick = throttle(goTodayInMonth, 600);
  const onPrevMonthClick = throttle(goPrevMonth, 600);
  const onNextMonthClick = throttle(goNextMonth, 600);

  const selectedDay = ref<string>(`${year.value}-${month.value}-${date.value}`);
  const selectDay = (selected: Dayjs) => {
    selectedDay.value = getFormatFullTime(selected);
  };

  watch(selectedDay, (val) => {
    emits('update:modelValue', val);
  });

  const getBorderClass = (row: number, col: number) => {
    let borderClass: string = '';
    const day = getDay(row, col);
    const fullTime = getFormatFullTime(day);

    if (fullTime === selectedDay.value) {
      borderClass = 'selected';

      if (
        paddingZero(day.date()) === date.value &&
        paddingZero(day.month() + 1) === month.value &&
        String(day.year()) === year.value
      ) {
        borderClass = 'today-selected';
      }
    }

    return borderClass;
  };

  const onMouseEnter = (e: Event) => {
    const tar = e.target as HTMLElement;
    const classList: string[] = Array.from(tar.classList);

    if (classList.includes('cell-border')) {
      tar.classList.add('active');
    }
  };

  const onMouseLeave = (e: Event) => {
    const tar = e.target as HTMLElement;
    const classList: string[] = Array.from(tar.classList);

    if (classList.includes('cell-border')) {
      tar.classList.remove('active');
    }
  };
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-title">
      <Btn color="#dfdfdff3" hover-color="#fff" @click="onTodayInMonthBtnClick">
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
      <thead class="calendar-table-head">
        <tr class="calendar-table-head-row">
          <th
            class="calendar-table-head-cell"
            v-for="item in ['一', '二', '三', '四', '五', '六', '日']"
            :key="item"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <div
        class="calendar-table-body"
        v-infinite-scroll="{ load, initTop: 50, scrollRate: 50, scrollCb, scrollingCb }"
        ref="calendarRef"
      >
        <tr v-for="row in baseArr" class="calendar-table-row" :key="row">
          <td
            class="cell"
            :class="getClass(row, col)"
            v-for="col in 7"
            :key="col"
            @click="selectDay(getDay(row, col))"
          >
            <div
              class="cell-border"
              :class="getBorderClass(row, col)"
              @mouseenter="onMouseEnter($event)"
              @mouseleave="onMouseLeave($event)"
            ></div>
            <div
              class="cell-selected-border"
              :class="isToday(dayjs(selectedDay)) && isToday(getDay(row, col)) ? 'selected' : ''"
            ></div>
            <span>{{ getDay(row, col).date() }}</span>
            <span>{{ getDayLunar(getDay(row, col)) }}</span>
          </td>
        </tr>
      </div>
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

      .calendar-table-head {
        .calendar-table-head-row {
          display: flex;
          width: 20rem;
          .calendar-table-head-cell {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 100;
          }
        }
      }

      .calendar-table-body {
        height: 18.75rem;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .calendar-table-row {
          display: flex;
          width: 20rem;
          .cell {
            position: relative;
            border-top: 2px solid #1e1e1e;
            border-bottom: 2px solid #1e1e1e;
            flex: 1;
            height: 3.125rem;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 0.8125rem;
          }
          .cell.today {
            background-color: #0078d7;
          }

          .cell-border {
            position: absolute;
            width: 40px;
            height: 42px;
          }

          .cell-border.active {
            border: 3px solid rgb(255, 255, 255, 0.3);
          }

          .cell-border.selected {
            border: 3px solid #1065ab;
          }

          .cell-selected-border {
            position: absolute;
            width: 34px;
            height: 36px;
          }

          .cell-selected-border.selected {
            border: 3px solid #000;
          }

          // .cell-selected-border.today-selected {
          //   border: 3px solid #000;
          // }

          .cell.dark {
            color: #7c7c7c;
          }
          .cell.light {
            color: #fff;
          }
        }
      }
    }
  }
</style>
