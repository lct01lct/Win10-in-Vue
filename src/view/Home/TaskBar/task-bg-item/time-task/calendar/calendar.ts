import { getLunar, year, month, paddingZero, getDiffDays } from '@/share/time';
import type { Dayjs } from '@/share/time';
import dayjs from 'dayjs';

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

export const currentYear = ref<string>(year.value);
export const currentMonth = ref<string>(month.value);

export let scroPx: number = 0; // 记录滚动的 px 值
export const scrollCb = (scrolledPx: number) => {
  const scrolledWeeks = Math.floor(scrolledPx / 50) + 2.5; // 设置2.5， 因为第二个半行是月份是分隔线
  const scrolledDay = getNowDay(`${year.value}-${month.value}-01`).add(scrolledWeeks * 7, 'day');

  currentMonth.value = paddingZero(scrolledDay.month() + 1);
  currentYear.value = String(scrolledDay.year());
  scroPx = scrolledPx;
};

export const isScrolling = ref<boolean>(false);

export const scrollingCb = (isScroll: boolean) => {
  isScrolling.value = isScroll;
};
