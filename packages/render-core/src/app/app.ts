import { BaseApp } from './base/baseApp';
import DesktopIcon from './base/desktop-icon.vue';
import type { BaseAppContructorOpt } from './base/baseApp';
import { deskTopIconMap, getNewlyPosIdx } from './base/desktop-icon';
import { Component } from 'vue';
import { pinyin } from 'pinyin-pro';
import { AppOrigin } from './types';
import { Base } from '.';
export interface WinAppConstructorOpt extends BaseAppContructorOpt {
  isFromSystem?: boolean;
}

interface DeskTopApp {
  name: string;
  displayName: string;
  comp: Component;
}

export const registeredAppList: WinApp[] = reactive([]);
export const deskTopAppList: DeskTopApp[] = reactive([]);

export const addFolderInDesktopFolder = (folderApp: WinApp) => {
  return createDeskTopAppItem(folderApp, folderApp._logo, folderApp.name);
};

export const createDeskTopAppItem = (app: WinApp, appIcon: string, _displayName: string) => {
  const displayName = ref(_displayName);

  const item = reactive({
    name: _displayName,
    displayName: displayName as unknown as string,
    comp: () => h(DesktopIcon, { appInstance: app, appIcon, appName: displayName }),
  });

  watch(displayName, (val) => {
    item.name = val;
  });
  deskTopAppList.push(item);

  return item;
};

export class WinApp extends BaseApp {
  set displayName(val: string) {
    this._displayName = val;
    this.pinyin_name = pinyin(this.displayName);
  }
  get displayName() {
    return this._displayName;
  }
  _displayName = '';
  pinyin_name = '';
  isFromSystem = false;

  constructor(opt: WinAppConstructorOpt) {
    super(opt);

    this.isFromSystem = opt.isFromSystem || false;
    registeredAppList.push(this);
  }

  // 创建快捷方式
  createShortcut(appIcon: string, appName: string) {
    checkAppisNotFolderApp(this, () => {
      this.displayName = appName;
    });

    const deskTopAppItem = createDeskTopAppItem(this, appIcon, appName);

    watch(
      () => deskTopAppItem.displayName,
      (val, oldVal) => {
        const originApp = (oldVal && deskTopIconMap.get(oldVal)) || {
          appInstance: this,
          posIdx: getNewlyPosIdx(),
          isFocus: false,
          isEditting: false,
        };

        if (originApp && oldVal) deskTopIconMap.delete(oldVal);
        deskTopIconMap.set(val, originApp);

        // Sort by posIdx of desktopIconItem
        const deskTopEntries = Array(...deskTopIconMap.entries()).sort((e1, e2) => {
          return e1[1].posIdx - e2[1].posIdx;
        });
        deskTopIconMap.clear();
        deskTopEntries.forEach(([displayName, desktopIconItem]) => {
          deskTopIconMap.set(displayName, desktopIconItem);
        });
      },
      {
        immediate: true,
      }
    );

    return this;
  }

  deleteShortcut() {
    const index = deskTopAppList.findIndex((item) => item.name === this.displayName);
    deskTopAppList.splice(index, 1);
    deskTopIconMap.delete(this.displayName);
  }

  static install(appOrigin: AppOrigin) {
    const slots: Record<string, () => Component> = {};

    if (appOrigin.headerComp) slots.header = () => h(appOrigin.headerComp!);
    if (appOrigin.bodyComp) slots.body = () => h(appOrigin.bodyComp!);

    const _app = h(
      Base,
      {
        appLogo: appOrigin.icon,
        appName: appOrigin.name,
      },
      slots
    );

    return new WinApp(Object.assign(appOrigin, { comp: _app }));
  }
}

export const checkAppisNotFolderApp = (app: WinApp, fn: Function) => {
  if (app.name !== '文件夹') {
    fn();
  }
};
