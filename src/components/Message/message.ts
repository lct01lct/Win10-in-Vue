import { VNode, App } from 'vue';
import Message from './message.vue';
import anime from 'animejs';
import { CompType } from '@/utils/vue';

export interface MessageInstance {
  isClose: boolean;
  close: () => void;
  destroy: () => void;
}
export type MessageContent = string | VNode;

export let currMessage = ref<MessageInstance | null>(null);

watch(currMessage, (newMessage, oldMessage) => {
  oldMessage && oldMessage.destroy();
});

export const createMessage = (
  content: MessageContent
): { messageApp: App<Element>; vm: CompType<typeof Message> } => {
  const oMessage = document.createDocumentFragment() as unknown as HTMLElement;
  const messageApp = createApp(Message, { content });

  const vm: CompType<typeof Message> = messageApp.mount(oMessage);

  document.body.appendChild(oMessage);

  nextTick(() => {
    anime({
      targets: vm.messageRef,
      translateX: -320,
      duration: 100,
      loop: false,
      direction: 'alternate',
      easing: 'easeInCubic',
    });
  });
  return {
    messageApp,
    vm,
  };
};

export const messageClose = (vm: CompType<typeof Message>, cb: Function) => {
  anime({
    targets: vm.messageRef,
    translateX: 320,
    duration: 100,
    loop: false,
    direction: 'alternate',
    easing: 'easeInCubic',
    complete() {
      cb();
    },
  });
};

export const autoDestroyMessage = (messageInstance: MessageInstance, delay: number) => {
  !messageInstance.isClose &&
    setTimeout(() => {
      messageInstance.close();
    }, delay);
};
