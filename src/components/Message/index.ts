import Message from './message.vue';
import { createNewMessage } from '@/share/win';
import {
  MessageContent,
  currMessage,
  createMessage,
  autoDestroyMessage,
  messageClose,
} from './message';
import type { MessageInstance } from './message';
import { sleep } from '@/utils/async';

const MESSAGE_DELAY = 2000;

type Message = Promise<MessageInstance>;

const message = async (content: MessageContent): Message => {
  await sleep(500);
  createNewMessage({ content });

  const { messageApp, vm } = createMessage(content);

  const messageInstance: MessageInstance = {
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

  autoDestroyMessage(messageInstance, MESSAGE_DELAY);

  return messageInstance;
};

export { message };

export type { Message };
