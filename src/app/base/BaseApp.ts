import { App, Component, ComponentPublicInstance, Ref } from 'vue';
import animation from '@/share/anime';

const compMap: { [key: string]: Component } = {};

interface BaseApp {
  _dom: WinAppDOM;
  _vm: ComponentPublicInstance;
}

class BaseApp {
  name: string;
  _zIndex: number = 0;
  constructor(name: string, comp: Component) {
    this.name = name;
    installWinApp(name, comp);
  }

  open() {
    const vueApp = createApp(compMap[this.name]);
    const oContainer = document.createDocumentFragment() as unknown as HTMLElement;
    const vm = vueApp.mount(oContainer);
    const _dom = oContainer.querySelector('.app-wrapper')! as WinAppDOM;
    document.querySelector('.deskTop-wrapper')!.appendChild(oContainer);

    this._dom = _dom;
    this._vm = vm;

    initWinAppStyle(_dom, this);
    createWinAppScope(_dom, vueApp);
  }

  close() {
    getWinAppScope(this._dom).close();
  }

  show() {
    animation({
      targets: this._dom,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 300,
      begin: async () => {
        await nextTick();
        this._dom.style.transformOrigin = 'bottom left';
        this._dom[WIN_APP_SCOPE].isShow.value = true;
      },
      complete: () => {
        this._dom.style.transformOrigin = 'center';
      },
    });
  }

  hide(immediate: boolean = true) {
    if (immediate) {
      this._dom[WIN_APP_SCOPE].isShow.value = false;
    } else {
      this._dom[WIN_APP_SCOPE].onMinimizeBtnClick();
    }
  }
}

const installWinApp = (name: string, comp: Component) => {
  if (compMap[name]) {
    throw new Error('${name} already exists!');
  } else {
    compMap[name] = comp;
  }
};

export const WIN_APP_SCOPE = '__WIN__APP__SCOPE__';
export type WinAppDOM = HTMLElement & {
  [WIN_APP_SCOPE]: {
    close: () => void;
    onMinimizeBtnClick: () => void;
    isShow: Ref<boolean>;
  };
};

export const getWinAppScope = (_dom: WinAppDOM) => {
  return _dom[WIN_APP_SCOPE];
};

const initWinAppStyle = async (_dom: WinAppDOM, winApp: BaseApp) => {
  _dom.style.zIndex = '10';
  winApp._zIndex = 10;

  animation({
    targets: _dom,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 300,
  });
};

const createWinAppScope = (_dom: WinAppDOM, vueApp: App<Element>) => {
  _dom[WIN_APP_SCOPE] = {
    close: () => {
      vueApp.unmount();
    },
  } as WinAppDOM['__WIN__APP__SCOPE__'];
};

export default BaseApp;
