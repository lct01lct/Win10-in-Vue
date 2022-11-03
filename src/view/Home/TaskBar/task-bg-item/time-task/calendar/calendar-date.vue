<script lang="ts" setup>
  import {
    year,
    month,
    date,
    paddingZero,
    getFormatFullTime,
    isToday,
    todayStr,
  } from '@/share/time';
  import dayjs, { Dayjs } from 'dayjs';
  import {
    getNowDay,
    getDayLunar,
    isScrolling,
    scrollCb,
    scrollingCb,
    currentMonth,
    _year,
    _month,
  } from './calendar';

  const props = defineProps({
    modelValue: {
      type: String,
      default: todayStr,
    },
  });
  const emits = defineEmits(['update:modelValue']);

  const selectedDay = ref<string>(props.modelValue);
  const selectDay = (selected: Dayjs) => {
    selectedDay.value = getFormatFullTime(selected);
  };

  watch(selectedDay, (val) => {
    emits('update:modelValue', val);
  });

  const baseArr = reactive(new Array(30).fill(0).map((i, index) => index));
  let frontP = 0;

  const load = (dir: 'up' | 'down') => {
    if (dir === 'down') {
      baseArr.push(baseArr[baseArr.length - 1] + 1);
    } else {
      baseArr.unshift(--frontP);
    }
  };

  const nowMonthFirstDay = computed(() => getNowDay(`${_year.value}-${_month.value}-01`)); // 今天所在月份的第一天
  const rowDay = nowMonthFirstDay.value.add(-nowMonthFirstDay.value.day() + 1, 'day');

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

  const calendarRef = ref<null | HTMLElement>(null);
  const compCtx = getCurrentInstance();
  defineExpose({
    calendarRef,
    rowDay,
    reset() {
      (compCtx as any).ctx.$forceUpdate();
    },
  });
</script>

<template>
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
      <td class="cell" :class="getClass(row, col)" v-for="col in 7" :key="col">
        <div
          class="cell-border"
          :class="getBorderClass(row, col)"
          @click="selectDay(getDay(row, col))"
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
</template>

<style scoped lang="scss">
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
        background-color: transparent;
        z-index: 1;
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

      .cell.dark {
        color: #7c7c7c;
      }
      .cell.light {
        color: #fff;
      }
    }
  }
</style>
