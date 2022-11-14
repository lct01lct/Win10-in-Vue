import dayjs from 'dayjs';
import { paddingZero, getFormatFullTime, todayStr, subscribeEverydayUpdate } from '@/share/time';

interface Message {
  title?: {
    text?: string;
    icon?: string;
  };
  content?: {
    img?: '';
  };
  option: IOption;
}

interface IOption {
  tip?: string;
  todo?: string;
  time: string;
  publicTime: string;
}

type NewMessgae = Omit<Message, 'option'> & { option: Partial<IOption> };

export const messageList = reactive<Message[]>([
  {
    title: { text: '截图和草稿', icon: '' },
    content: { img: '' },
    option: {
      publicTime: '2022-11-13 15:46',
      time: '2022-11-13',
    },
  },
]);

subscribeEverydayUpdate(() => {
  messageList.forEach((item) => {
    if (item.option.publicTime.slice(0, 10) !== todayStr) {
      item.option.time === item.option.publicTime.slice(0, 10);
    }
  });
});

export const createNewMessgae = (opt?: NewMessgae) => {
  const publicTime = `${getFormatFullTime()} ${paddingZero(dayjs().hour())}:${paddingZero(
    dayjs().minute()
  )}`;
  const time = publicTime.slice(-5);

  const newMessage = {
    option: {
      time,
      publicTime,
    },
  };
  messageList.push(newMessage);
};

createNewMessgae();
