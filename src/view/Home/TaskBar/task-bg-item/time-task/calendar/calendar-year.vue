<script lang="ts" setup>
  import dayjs, { Dayjs } from 'dayjs';
  import { todayStr, year } from '@/share/time';
  import { yearPeriod, fsm, selectedYear } from './calendar';

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

  const rowYear = dayjs(todayStr.slice(0, 4));

  const getYear = (row: number, col: number) => {
    return rowYear.add((row - 2) * 4 + (col - 1), 'year');
  };

  const scrollCb = (scrolledPx: number) => {
    const scrolledFourYears = Math.floor(scrolledPx / 75) + 2; // 设置2.5， 因为第二个半行是月份是分隔线
    const scrolledYear = dayjs(`${Number(year.value) - 1}-01-01`).add(
      scrolledFourYears * 4,
      'year'
    );
    yearPeriod.value = fallOnWhichPeriod(scrolledYear.year());
  };

  const fallOnWhichPeriod = (year: number) => {
    const start = year - (year % 10);
    return [start, start + 9];
  };

  const isInYearPeriod = (year: number) => {
    return year >= yearPeriod.value[0] && year <= yearPeriod.value[1];
  };

  const getClass = (row: number, col: number) => {
    const classes: string[] = [];
    const cellYear = getYear(row, col).year();

    if (isScrolling.value) {
      classes.push('light');
    } else if (String(cellYear) === year.value) {
      classes.push('light');
    } else {
      classes.push(isInYearPeriod(cellYear) ? 'light' : 'dark');
    }

    classes.push(String(cellYear) === selectedYear.value ? 'today' : '');

    return classes;
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

  const selectYear = (dayjs: Dayjs) => {
    selectedYear.value = String(dayjs.year());
    fsm.goto('month');
  };

  const calendarRef = ref<HTMLElement | null>(null);

  defineExpose({
    calendarRef,
  });
</script>

<template>
  <div
    class="select-year-table"
    v-infinite-scroll="{ load, initTop: 75, scrollRate: 50, scrollingCb, scrollCb }"
    ref="calendarRef"
  >
    <tr v-for="row in baseArr" class="calendar-table-row" :key="row">
      <td
        class="cell"
        v-for="col in 4"
        :key="col"
        :class="getClass(row, col)"
        @click="selectYear(getYear(row, col))"
        @mouseenter="onMouseEnter($event)"
        @mouseleave="onMouseLeave($event)"
        @mousemove="onMouseEnter($event)"
      >
        {{ getYear(row, col).year() }}
      </td>
    </tr>
  </div>
</template>

<style scoped lang="scss">
  .select-year-table {
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
      cursor: default;
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
