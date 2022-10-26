import { getRealTime, paddingZero, formatDay, getLunar } from './utils';

const realTime = reactive({
  hour: '00',
  minute: '00',
  second: '00',
  year: '1971',
  month: '01',
  date: '01',
  day: '星期一',
  lunar: '一月初一',
});

const { hour, minute, month, date, day, year, second, lunar } = toRefs(realTime);

setInterval(() => {
  const realTime = getRealTime();
  hour.value = paddingZero(realTime.hour());
  minute.value = paddingZero(realTime.minute());
  year.value = String(realTime.year());
  month.value = paddingZero(realTime.month() + 1);
  date.value = paddingZero(realTime.date());
  day.value = formatDay(realTime.day());
  second.value = paddingZero(realTime.second());
  lunar.value = getLunar(year.value, month.value, date.value).dateStr;
}, 1000);

export { hour, minute, month, date, day, year, second, lunar };
