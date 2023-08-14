import { App, ComponentPublicInstance } from 'vue';
import ContextMenu from './contextmenu.vue';
import { createApp } from 'vue';
import { isTwoArray } from 'utils';

export interface ContextMenuOptionItem {
  icon?: string;
  name: string;
  onClick?: () => void;
  subOptions?: ContextMenuProps['options'];
  disabled?: boolean;
  select?: boolean;
  tick?: boolean;
}

export interface ContextMenuProps {
  options: ContextMenuOptionItem[] | ContextMenuOptionItem[][];
  event: MouseEvent;
}

type ContextMenuVm = ComponentPublicInstance & { close: () => void; visible: boolean };

export const createContextMenuOptionGroup = (group: ContextMenuOptionItem[]) => group;

export const createContextMenu = () => {
  let vm: ContextMenuVm;
  let app: App;
  const open = ({ props }: { props?: ContextMenuProps; slot?: number }) => {
    if (props) {
      props.options = isTwoArray(props?.options) ? props?.options : [props.options];
    }

    const container = document.createDocumentFragment() as unknown as Element;
    app = createApp(ContextMenu, { ...props });
    vm = app.mount(container) as ContextMenuVm;
    document.body.appendChild(container);

    const clearup = watch(
      () => vm.visible,
      () => {
        app.unmount();
        clearup();
      }
    );
  };

  const close = () => {
    vm.close();
  };

  return {
    open,
    close,
  };
};
