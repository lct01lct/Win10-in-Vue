import { getRealTime, paddingZero, formatDay } from './utils';

const realTime = reactive({
  hour: '00',
  minute: '00',
  year: '1971',
  month: '01',
  date: '01',
  day: '星期一',
});

const { hour, minute, month, date, day, year } = toRefs(realTime);

setInterval(() => {
  const realTime = getRealTime();
  hour.value = paddingZero(realTime.hour());
  minute.value = paddingZero(realTime.minute());
  year.value = String(realTime.year());
  month.value = paddingZero(realTime.month() + 1);
  date.value = paddingZero(realTime.date());
  day.value = formatDay(realTime.day());
}, 1);

export { hour, minute, month, date, day, year };
