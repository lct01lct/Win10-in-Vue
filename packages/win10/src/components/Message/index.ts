import Message from './message.vue';
import { createNewMessage } from '@/share/win';
import {
  MessageContent,
  currMessage,
  createMessage,
  autoDestroyMessage,
  messageClose,
  SCOPE,
} from './message';
import type { MessageInstance, MessageOption } from './message';
import { sleep } from 'utils/async';

const MESSAGE_DELAY = 2000;

type Message = Promise<MessageInstance>;

const message = async (content: MessageContent, opt?: MessageOption): Message => {
  await sleep(500);
  const publicTime = createNewMessage({ content });
  let messageInstance: MessageInstance;

  const { messageApp, vm } = createMessage(content, opt);

  messageInstance = {
    isClose: false,
    close() {
      messageClose(vm, () => {
        this.destroy();
      });
    },
    destroy() {
      messageApp.unmount();
      this.isClose = true;
    },
  };

  currMessage.value = messageInstance;
  vm.messageRef[SCOPE] = { messageInstance, publicTime };

  autoDestroyMessage(messageInstance, MESSAGE_DELAY);

  return messageInstance;
};

export { message };

export type { Message };
