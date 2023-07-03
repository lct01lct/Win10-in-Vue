import dayjs from 'dayjs';
import { paddingZero, getFormatFullTime, todayStr, subscribeEverydayUpdate } from '@/share/time';
import { VNode } from 'vue';

interface Message {
  isSeen: boolean;
  title?: {
    text?: string;
    icon?: string;
  };
  content?: string | VNode;
  option: IOption;
  dom: HTMLElement;
}

interface IOption {
  tip?: string;
  todo?: string;
  time: string;
  publicTime: string;
}

type NewMessage = Omit<Omit<Omit<Message, 'option'>, 'dom'>, 'isSeen'> & {
  option?: Partial<IOption>;
};

export const messageList: Message[] = reactive([
  {
    isSeen: false,
    title: { text: '截图和草稿2', icon: '' },
    content: '123',
    option: {
      tip: '截图已经保存到剪切板',
      todo: '选择此处标记并共享图版',
      publicTime: '2022-11-11 15:46',
      time: '2022-11-13',
    },
  },
  {
    isSeen: false,
    title: { text: '截图和草稿3', icon: '' },
    content: '123',
    option: {
      tip: '截图已经保存到剪切板',
      todo: '选择此处标记并共享图版',
      publicTime: '2022-11-13 15:46',
      time: '2022-11-13',
    },
  },
]) as unknown as Message[];

export const isNotSeenCount = computed(() => {
  let count = 0;
  messageList.forEach((item) => !item.isSeen && count++);

  return count;
});

export const setAllMessageIsSeen = () => {
  messageList.forEach((item) => (item.isSeen = true));
};

subscribeEverydayUpdate(() => {
  messageList.forEach((item) => {
    if (item.option.publicTime.slice(0, 10) !== todayStr) {
      item.option.time === item.option.publicTime.slice(0, 10);
    }
  });
});

export const createNewMessage = (opt?: NewMessage): string => {
  const publicTime = `${getFormatFullTime()} ${paddingZero(dayjs().hour())}:${paddingZero(
    dayjs().minute()
  )}`;
  const time = publicTime.slice(-5);

  const newMessage = (opt || {}) as Message;
  newMessage.option = newMessage.option || {};
  newMessage.option.time = time;
  newMessage.option.publicTime = publicTime;
  newMessage.isSeen = false;
  typeof newMessage.content === 'object' && markRaw(newMessage.content);

  messageList.unshift(newMessage);

  return publicTime;
};

// 测试用例
// createNewMessage({
//   title: { text: '截图和草稿1', icon: '' },
//   content: '123',
//   option: {
//     tip: '截图已经保存到剪切板',
//     todo: '选择此处标记并共享图版',
//   },
// });

export const resolveMessageContent = (content: string | VNode) => {
  if (typeof content === 'string') {
    return h('img', { class: 'message-item-content-img' });
  } else {
    return h(content);
  }
};

export const removeMessageByPublicTime = (publicTime: string) => {
  const index = messageList.findIndex((item) => item.option.publicTime === publicTime);
  index > -1 && messageList.splice(index, 1);
};
