import dayjs from 'dayjs';

const getNowDay = (dateStr: string): dayjs.Dayjs => {
  return dayjs(dateStr);
};

export { getNowDay };
