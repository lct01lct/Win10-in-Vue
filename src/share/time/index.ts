import { getRealTime, paddingZero, formatDay } from './utils';

const realTime = reactive({
  hour: '00',
  minute: '00',
  month: '01',
  date: '01',
  day: '星期一',
});

const { hour, minute, month, date, day } = toRefs(realTime);

setInterval(() => {
  const realTime = getRealTime();
  hour.value = paddingZero(realTime.hour());
  minute.value = paddingZero(realTime.minute());
  month.value = paddingZero(realTime.month() + 1);
  date.value = paddingZero(realTime.date());
  day.value = formatDay(realTime.day());
}, 1);

export { hour, minute, month, date, day };
