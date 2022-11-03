import { getLunar, year, month, paddingZero } from '@/share/time';
import type { Dayjs } from '@/share/time';
import dayjs from 'dayjs';
import FSM from '@/utils/fsm';
import cleepClone from 'lodash/cloneDeep';

export const _year = cleepClone(year);
export const _month = cleepClone(month);

export const getNowDay = (dateStr: string): dayjs.Dayjs => {
  return dayjs(dateStr);
};

export const getDayLunar = (day: Dayjs) => {
  try {
    return getLunar(day.year(), day.month() + 1, day.date()).dateStr.slice(-2);
  } catch (e) {
    return '出错';
  }
};

export const domSommthlyScroll = (dom: HTMLElement, y: number) => {
  dom.scrollBy({
    top: y,
    left: 0,
    behavior: 'smooth',
  });
};

export const currentYear = ref<string>(_year.value);
export const currentMonth = ref<string>(_month.value);

export let scroPx: number = 0; // 记录滚动的 px 值
export const scrollCb = (scrolledPx: number) => {
  const scrolledWeeks = Math.floor(scrolledPx / 50) + 2.5; // 设置2.5， 因为第二个半行是月份是分隔线
  const scrolledDay = getNowDay(`${_year.value}-${_month.value}-01`).add(scrolledWeeks * 7, 'day');

  currentMonth.value = paddingZero(scrolledDay.month() + 1);
  currentYear.value = String(scrolledDay.year());
  scroPx = scrolledPx;
};

export const isScrolling = ref<boolean>(false);

export const scrollingCb = (isScroll: boolean) => {
  isScrolling.value = isScroll;
  getTitle();
};

export type SelectType = 'year' | 'month' | 'date';
export const fsm = new FSM<SelectType>({
  init: 'date',
  steps: [
    { from: 'date', to: 'month' },
    { from: 'month', to: 'year' },
    { from: 'year', to: 'year' },
  ],
  onStateChange(newState, oldState) {
    if (newState === 'date' && oldState === 'month') {
      selectedDay.value = `${selectedMonth.value}-01`;
      currentMonth.value = `${selectedMonth.value.slice(5)}`;
      currentYear.value = `${selectedMonth.value.slice(0, 4)}`;
      _month.value = `${selectedMonth.value.slice(5)}`;
      _year.value = `${selectedMonth.value.slice(0, 4)}`;
    }
    selectType.value = newState;
    getTitle();
  },
});
export const selectType = ref<SelectType>('date');

export const resetCalendar = () => {
  fsm.reset();
  selectType.value = fsm.state!;
  _month.value = month.value;
  _year.value = year.value;
  currentMonth.value = month.value;
  currentYear.value = year.value;
};

export const selectedDay = ref<string>('2022-03-04');
export const selectedMonth = ref(`${_year.value}-${paddingZero(Number(_month.value))}`);
export const currentYearInMonthComp = ref(`${_year.value}`);
export const title = ref(`${currentYear.value} 年 ${currentMonth.value} 月`);

export const getTitle = async () => {
  const type = selectType.value;

  switch (type) {
    case 'date':
      title.value = `${currentYear.value} 年 ${currentMonth.value} 月`;
      break;
    case 'month':
      title.value = `${currentYearInMonthComp.value} 年`;
      break;
    case 'year':
      break;
    default:
      break;
  }
};
