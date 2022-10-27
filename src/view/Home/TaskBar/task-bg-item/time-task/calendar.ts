import { getLunar } from '@/share/time';
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
