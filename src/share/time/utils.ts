import dayjs from 'dayjs';
import { dayArr } from '@/config/time';

export const getRealTime = () => {
  return dayjs(new Date());
};

export const paddingZero = (num: number): string => {
  return num < 10 ? '0' + num : String(num);
};

export const formatDay = (num: number): string => {
  return `星期${dayArr[num]}`;
};

export { getLunar } from 'chinese-lunar-calendar';
