<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { todayStr, year, month, Dayjs } from '@/share/time';
  import { currentYearInMonthComp, fsm, selectType } from './calendar';

  const baseArr = reactive(new Array(30).fill(0).map((i, index) => index));
  let frontP = 0;

  const load = (dir: 'up' | 'down') => {
    if (dir === 'down') {
      baseArr.push(baseArr[baseArr.length - 1] + 1);
    } else {
      baseArr.unshift(--frontP);
    }
  };

  const isScrolling = ref<boolean>(false);

  const scrollingCb = (isScroll: boolean) => {
    isScrolling.value = isScroll;
  };

  const rowMonth = dayjs(todayStr.slice(0, 4));
  const getClass = (row: number, col: number) => {
    const classes = [];
    const monthDayjs = getMonth(row, col);

    if (isScrolling.value) {
      classes.push('light');
    } else if (`${monthDayjs.year()}-${monthDayjs.month() + 1}` === selectedMonth.value) {
      classes.push('light');
    } else {
      classes.push(monthDayjs.year() === Number(currentYearInMonthComp.value) ? 'light' : 'dark');
    }

    const isCurrMonth = (monthDayjs: Dayjs) => {
      return (
        monthDayjs.month() + 1 === Number(month.value) && monthDayjs.year() === Number(year.value)
      );
    };

    // 今天的日期
    classes.push(isCurrMonth(monthDayjs) ? 'today' : '');

    return classes;
  };

  const getMonth = (row: number, col: number) => {
    return rowMonth.add((row - 1) * 4 + (col - 1), 'month');
  };

  const selectedMonth = ref(`${year.value}-${month.value}`);

  const selectMonth = (day: Dayjs) => {
    selectedMonth.value = `${day.year()}-${day.month() + 1}`;
    // 在 Popover 组件内设置元素隐藏，必须异步地设置
    setTimeout(() => {
      fsm.goto('date');
    }, 0);
  };

  const onMouseEnter = (e: Event) => {
    const tar = e.target as HTMLElement;
    const classList: string[] = Array.from(tar.classList);

    if (classList.includes('cell')) {
      tar.classList.add('active');
    }
  };

  const onMouseLeave = (e: Event) => {
    const tar = e.target as HTMLElement;
    const classList: string[] = Array.from(tar.classList);

    if (classList.includes('cell')) {
      tar.classList.remove('active');
    }
  };

  const scrollCb = (scrolledPx: number) => {
    const scrolledFourMonths = Math.floor(scrolledPx / 75) + 2.5; // 设置2.5， 因为第二个半行是月份是分隔线
    const scrolledDay = dayjs(`${Number(year.value) - 1}-${month.value}-01`).add(
      scrolledFourMonths * 4,
      'month'
    );

    currentYearInMonthComp.value = String(scrolledDay.year());
  };
</script>

<template>
  <div
    class="select-month-table"
    v-infinite-scroll="{ load, initTop: 75, scrollRate: 50, scrollingCb, scrollCb }"
    ref="calendarRef"
  >
    <tr v-for="row in baseArr" class="calendar-table-row" :key="row">
      <td
        class="cell"
        :class="getClass(row, col)"
        v-for="col in 4"
        :key="col"
        @click="selectMonth(getMonth(row, col))"
        @mouseenter="onMouseEnter($event)"
        @mouseleave="onMouseLeave($event)"
      >
        {{ getMonth(row, col).month() + 1 }}月
      </td>
    </tr>
  </div>
</template>

<style scoped lang="scss">
  .select-month-table {
    height: 300px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .calendar-table-row {
    display: flex;
    width: 20rem;
    .cell {
      position: relative;
      flex: 1;
      height: 75px;
      display: flex;
      border: 3px solid transparent;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.8125rem;
    }

    .cell.dark {
      color: #7c7c7c;
    }
    .cell.light {
      color: #fff;
    }

    .cell.today {
      background-color: #0078d7;
    }

    .cell.active {
      // box-sizing: content-box;
      border: 3px solid rgb(255, 255, 255, 0.3);
    }
  }
</style>
