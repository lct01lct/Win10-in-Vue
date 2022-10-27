<script lang="ts" setup>
  import Btn from '@/components/Btn/index.vue';
  import { year, month, getLunar, paddingZero } from '@/share/time';
  import type { Dayjs } from '@/share/time';
  import { getNowDay } from './calendar';
  import { Ref } from 'vue';

  const currentYear = ref<string>(year.value);
  const currentMonth = ref<string>(month.value);

  const baseArr = reactive(new Array(10).fill(0).map((i, index) => index));
  let frontP = 0;

  const load = (dir: 'up' | 'down') => {
    if (dir === 'down') {
      baseArr.push(baseArr[baseArr.length - 1] + 1);
    } else {
      baseArr.unshift(--frontP);
    }
  };

  const scrollCb = (scrolledPx: number) => {
    const scrolledWeeks = Math.floor(scrolledPx / 50) + 2;
    const scrolledDay = getNowDay(`${year.value}-${month.value}-01`).add(scrolledWeeks * 7, 'day');

    currentMonth.value = paddingZero(scrolledDay.month() + 1);
    currentYear.value = String(scrolledDay.year());
  };

  const firstDay = getNowDay(`${year.value}-${month.value}-01`);
  const rowDay = firstDay.add(-firstDay.day() + 1, 'day');

  const geyDay = (row: number, col: number) => {
    return rowDay.add((row - 1) * 7 + col - 1, 'day');
  };
  const getDayLunar = (day: Dayjs) => {
    try {
      return getLunar(day.year(), day.month() + 1, day.date()).dateStr.slice(2);
    } catch (e) {
      return '出错';
    }
  };

  const getClass = (row: number, col: number) => {
    if (isScrolling.value) {
      return 'light';
    }

    return geyDay(row, col).month() + 1 === Number(currentMonth.value) ? 'light' : 'dark';
  };

  const isScrolling = ref<boolean>(false);

  const scrollingCb = (isScroll: boolean) => {
    isScrolling.value = isScroll;
  };
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-title">
      <Btn color="#dfdfdff3" hover-color="#fff">
        <span class="current">{{ currentYear }} 年 {{ currentMonth }} 月</span>
      </Btn>
      <span class="btn-group">
        <Btn color="#dfdfdff3" hover-color="#fff">
          <span class="iconfont icon-xiangshang"></span>
        </Btn>
        <Btn color="#dfdfdff3" hover-color="#fff">
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
        v-infinite-scroll="{ load, initTop: 50, scrollRate: 5, scrollCb, scrollingCb }"
      >
        <tr v-for="row in baseArr" class="calendar-table-row" :key="row">
          <td class="cell" :class="getClass(row, col)" v-for="col in 7" :key="col">
            <span>{{ geyDay(row, col).date() }}</span>
            <span>{{ getDayLunar(geyDay(row, col)) }}</span>
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
            flex: 1;
            height: 3.125rem;
            display: flex;
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
        }
      }
    }
  }
</style>
