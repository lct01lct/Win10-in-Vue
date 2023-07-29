import { App, ComponentPublicInstance } from 'vue';
import ContextMenu from './contextmenu.vue';
import { createApp } from 'vue';

export interface OptionItem {
  icon?: string;
  name: string;
  onClick?: () => void;
  subOptions?: OptionItem[];
}

export interface ContextMenuProps {
  options: OptionItem[];
  event: MouseEvent;
}

type ContextMenuVm = ComponentPublicInstance & { close: () => void; visible: boolean };

export const useContextMenu = () => {
  let vm: ContextMenuVm;
  let app: App;
  const open = ({ props }: { props?: ContextMenuProps; slot?: number }) => {
    const container = document.createDocumentFragment() as unknown as Element;
    app = createApp(ContextMenu, { ...props });
    vm = app.mount(container) as ContextMenuVm;
    document.body.appendChild(container);
  };

  const close = () => {
    vm.close();
  };

  return {
    open,
    close,
  };
};
