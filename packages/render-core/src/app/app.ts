import { BaseApp } from './base/baseApp';
import DesktopIcon from './base/desktop-icon.vue';
import type { BaseAppContructorOpt } from './base/baseApp';
import { DeskTopIcon } from './base/desktop-icon';
import { Component } from 'vue';
import { pinyin } from 'pinyin-pro';
import { AppOrigin } from './types';
import { Base } from '.';

export interface WinAppConstructorOpt extends BaseAppContructorOpt {
  isFromSystem?: boolean;
}

export const registeredAppList: WinApp[] = reactive([]);

export const addFolderInDesktop = (folderApp: WinApp) => {
  return createDeskTopAppItem(folderApp, folderApp._logo, folderApp.name);
};

export const createDeskTopAppItem = (app: WinApp, appIcon: string, _displayName: string) => {
  const item = reactive({
    appInstance: app,
    comp: () =>
      h(DesktopIcon, {
        appInstance: app,
        appIcon,
      }),
  });

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

  private _displayName = '';
  pinyin_name = '';
  isFromSystem = false;

  constructor(opt: WinAppConstructorOpt) {
    super(opt);

    this.isFromSystem = opt.isFromSystem || false;
    registeredAppList.push(this);
  }

  // 创建快捷方式
  createShortcut(appIcon: string, displayName: string) {
    checkAppisNotFolderApp(this, () => {
      this.displayName = displayName;
    });

    const deskTopIcon = new DeskTopIcon({
      displayName: displayName,
      reference: this,
      icon: appIcon,
    });

    deskTopIcon.addNewDeskTopIcon(() =>
      h(DesktopIcon, {
        deskTopIcon,
      })
    );

    return this;
  }

  deleteShortcut(displayName: string) {
    // const index = deskTopIconList.findIndex((item) => item.displayName === displayName);
    // if (index > -1) {
    //   return deskTopIconList.splice(index, 1);
    // }
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

export const checkAppisNotFolderApp = (app: WinApp, fn?: Function) => {
  const isFolderApp = app.name !== '文件夹';
  if (isFolderApp) {
    fn?.();
  }

  return isFolderApp;
};

export const checkAppisFolderApp = (app: WinApp, fn?: Function) => {
  const isFolderApp = app.name === '文件夹';
  if (isFolderApp) {
    fn?.();
  }

  return isFolderApp;
};
