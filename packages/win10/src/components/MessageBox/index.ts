import { App, VNode, ComponentPublicInstance, Ref } from 'vue';
import MessageBox from './message-box.vue';

interface MessageBoxOpt {
  title?: string;
  content?: VNode | string;
  cancelBtn?: boolean | string;
  confirmBtn?: boolean | string;
  appendTo?: string | HTMLElement;
  onOpen?: () => void;
  onClose?: () => void;
  width?: number;
  height?: number;
}

const messageBox = (option: MessageBoxOpt) => {
  const appendTo = option.appendTo || '.deskTop-wrapper';
  const oWrapper = (
    typeof appendTo === 'string' ? document.querySelector(appendTo) : appendTo
  ) as HTMLElement | null;

  const messageBoxApp = createApp(MessageBox, { ...option, appendTo: oWrapper });

  return new Promise<string>((resolve, reject) => {
    showMessageBox(messageBoxApp, oWrapper, resolve, reject, option);
  });
};

type PromiseExecutorParams = Parameters<ConstructorParameters<typeof Promise<string>>[0]>;
type MessageBoxVm = ComponentPublicInstance & { watchState: (fn: (state: State) => void) => void };
export type State = 'confirm' | 'cancel' | 'none' | 'close';

const showMessageBox = (
  messageBoxApp: App,
  oWrapper: HTMLElement | null,
  resolve: PromiseExecutorParams[0],
  reject: PromiseExecutorParams[1],
  option: MessageBoxOpt
) => {
  if (oWrapper) {
    const oMessageBox = document.createDocumentFragment();
    const vm = messageBoxApp.mount(oMessageBox) as MessageBoxVm;
    oWrapper.appendChild(oMessageBox);
    option.onOpen?.();

    vm.watchState((state) => {
      if (state === 'confirm') {
        resolve('confirm');
      } else if (state === 'cancel') {
        reject('cancel');
      } else if (state === 'close') {
        resolve('close');
      }

      if (state !== 'none') {
        hideMessageBox(messageBoxApp, option);
      }
    });
  } else {
    reject('Please ensure appendTo is a valid value!');
  }
};

const hideMessageBox = (messageBoxApp: App, option: MessageBoxOpt) => {
  messageBoxApp.unmount();
  option.onClose?.();
};

export default messageBox;
