import {
  getRealTime,
  paddingZero,
  formatDay,
  getLunar,
  getDiffDays,
  getFormatFullTime,
} from './utils';
import type { Dayjs } from './utils';

const now = getRealTime();

const realTime = reactive({
  hour: paddingZero(now.hour()),
  minute: paddingZero(now.minute()),
  second: paddingZero(now.second()),
  year: String(now.year()),
  month: paddingZero(now.month() + 1),
  date: paddingZero(now.date()),
  day: formatDay(now.day()),
  lunar: '一月初一',
});

const { hour, minute, month, date, day, year, second, lunar } = toRefs(realTime);

setInterval(() => {
  const now = getRealTime();
  hour.value = paddingZero(now.hour());
  minute.value = paddingZero(now.minute());
  year.value = String(now.year());
  month.value = paddingZero(now.month() + 1);
  date.value = paddingZero(now.date());
  day.value = formatDay(now.day());
  second.value = paddingZero(now.second());
  lunar.value = getLunar(year.value, month.value, date.value).dateStr;
}, 1000);

const isToday = (day: Dayjs) => {
  return (
    paddingZero(day.date()) === date.value &&
    paddingZero(day.month() + 1) === month.value &&
    String(day.year()) === year.value
  );
};

const todayStr = `${year.value}-${month.value}-${date.value}`;

export {
  hour,
  minute,
  month,
  date,
  day,
  year,
  second,
  lunar,
  paddingZero,
  getLunar,
  getDiffDays,
  getFormatFullTime,
  isToday,
  todayStr,
};
export type { Dayjs };
