import dayjs from 'dayjs';
import { dayArr } from '@/config/time';

type Dayjs = dayjs.Dayjs;

export const getRealTime = () => {
  return dayjs(new Date());
};

export const paddingZero = (num: number): string => {
  return num < 10 ? '0' + num : String(num);
};

export const formatDay = (num: number): string => {
  return `星期${dayArr[num]}`;
};

export const getDiffDays = (day1: string | Dayjs, day2: string | Dayjs, type = 'day') => {
  return dayjs(day1).diff(day2, type as any);
};

export const getFormatFullTime = (day: Dayjs) => {
  return `${day.year()}-${paddingZero(day.month() + 1)}-${paddingZero(day.date())}`;
};

export { getLunar } from 'chinese-lunar-calendar';

export type { Dayjs };
