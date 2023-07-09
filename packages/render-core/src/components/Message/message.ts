import { VNode, App, Ref, ComponentPublicInstance } from 'vue';
import Message from './message.vue';
import anime from 'animejs';

export interface MessageInstance {
  isClose: boolean;
  close: () => void;
  destroy: () => void;
}
export type MessageContent = string | VNode;
export type MessageVm = ComponentPublicInstance & {
  messageRef: MessageEL;
};

export const SCOPE = '__SCOPE__';
export type MessageEL = HTMLElement & {
  [SCOPE]: {
    messageInstance: MessageInstance;
    publicTime: string;
  };
};

export let currMessage = ref<MessageInstance | null>(null);

export interface MessageOption {
  click: () => void;
}

watch(currMessage, (newMessage, oldMessage) => {
  oldMessage && oldMessage.destroy();
});

export const createMessage = (
  content: MessageContent,
  opt?: MessageOption
): {
  messageApp: App<Element>;
  vm: MessageVm;
} => {
  const oMessage = document.createDocumentFragment() as unknown as HTMLElement;
  const messageApp = createApp(Message, { content, ...opt });

  const vm = messageApp.mount(oMessage) as MessageVm;

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

export const messageClose = (vm: MessageVm, cb: Function) => {
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
