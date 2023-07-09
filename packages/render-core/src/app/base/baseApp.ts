import { App, Component, ComponentPublicInstance, Ref } from 'vue';
import { animation } from 'utils';
import { addTaskBarTriggerItem, toggleZIndex, taskBarTriggerList } from './taskBar';
import type { TaskBarTriggerItem } from './taskBar';
import installDirective from 'utils/vue-utils/directives';
import { Folder, Desc } from 'model-core';

export const compMap: Map<string, Component> = new Map();

export const WIN_APP_SCOPE = '__WIN__APP__SCOPE__';
export type WinAppDOM = HTMLElement & {
  [WIN_APP_SCOPE]: {
    appInstance: BaseApp;
    close: () => void;
    onMinimizeBtnClick: () => void;
    isShow: Ref<boolean>;
    isFull: Ref<boolean>;
  };
};

export interface BaseAppContructorOpt {
  name: string;
  comp: Component;
  icon: string;
}

export interface BaseApp {
  _dom: WinAppDOM;
}

export type InfoByOpened = {
  folderName?: string;
  folderPointer?: Desc | Folder;
  minWidth?: number;
  minHeight?: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  isFull?: boolean;
} & Record<string, any>;

export class BaseApp {
  name: string;
  infoByOpened?: InfoByOpened;
  _logo: string;
  _isRender: boolean = false;
  private _vm?: ComponentPublicInstance;
  closeCbs: (() => void)[] = [];

  constructor({ name, comp, icon }: BaseAppContructorOpt) {
    this.name = name;
    this._logo = icon;
    installWinApp(name, comp);
  }

  open(info?: InfoByOpened) {
    this.infoByOpened = info;

    if (!this._isRender) {
      // 必须先生成 taskBarList 中的 zIndex 信息
      const zIndex = taskBarTriggerList.length + 1;

      renderTiggerInTaskBar({
        iconPath: this._logo,
        name: this.name,
        winApp: this as any,
        zIndex,
      });

      const oContainer = document.createDocumentFragment() as unknown as HTMLElement;
      const vueApp = createApp(compMap.get(this.name)!);
      installDirective(vueApp);

      vueApp.provide('appInstance', this);
      vueApp.provide('appName', this.name);
      vueApp.provide('appClassName', `${this.name}-app-wrapper`);

      this._vm = vueApp.mount(oContainer);
      const _dom = oContainer.querySelector('.app-wrapper')! as WinAppDOM;
      this._dom = _dom;

      document.querySelector('.deskTop-wrapper')!.appendChild(oContainer);

      initWinAppStyle(_dom, this);
      createWinAppScope(_dom, vueApp, this);

      this._isRender = true;
    } else {
      this.show(true);
    }
  }

  close() {
    getWinAppScope(this._dom).close();
  }

  show(immediate: boolean = false) {
    this._dom[WIN_APP_SCOPE].isShow.value = true;
    animation({
      targets: this._dom,
      scale: [immediate ? 1 : 0, 1],
      opacity: [0, 1],
      duration: immediate ? 0 : 300,
      begin: async () => {
        await nextTick();
        this._dom.style.transformOrigin = 'bottom left';
      },
      complete: () => {
        this._dom.style.transformOrigin = 'center';
      },
    });

    toggleZIndex(this._dom);
  }

  hide(immediate: boolean = true) {
    if (immediate) {
      this._dom[WIN_APP_SCOPE].isShow.value = false;
    } else {
      this._dom[WIN_APP_SCOPE].onMinimizeBtnClick();
    }
  }

  onClose(fn: () => void) {
    this.closeCbs.push(fn);
  }
}

const installWinApp = (name: string, comp: Component) => {
  if (compMap.has(name)) {
    throw new Error(`${name} already have existed!`);
  } else {
    compMap.set(name, comp);
  }
};

export const getWinAppScope = (_dom: WinAppDOM) => {
  return _dom[WIN_APP_SCOPE];
};

const initWinAppStyle = async (_dom: WinAppDOM, winApp: BaseApp) => {
  animation({
    targets: _dom,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 300,
  });
};

const createWinAppScope = (_dom: WinAppDOM, vueApp: App<Element>, baseApp: BaseApp) => {
  _dom[WIN_APP_SCOPE] = {
    appInstance: baseApp,
    close: () => {
      baseApp.closeCbs.forEach((fn) => fn());
      vueApp.unmount();
    },
    isFull: ref(false),
  } as WinAppDOM['__WIN__APP__SCOPE__'];
};

const renderTiggerInTaskBar = (opt: TaskBarTriggerItem) => {
  addTaskBarTriggerItem(opt);
};
