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
  comp: Component;
}

export const registeredAppList: WinApp[] = reactive([]);
export const deskTopAppList: DeskTopApp[] = reactive([]);

export const addFolderInDesktopFolder = (folderApp: WinApp) => {
  deskTopAppList.push({
    name: folderApp.name,
    comp: () =>
      h(DesktopIcon, { appInstance: folderApp, appIcon: folderApp._logo, appName: folderApp.name }),
  });
};

export class WinApp extends BaseApp {
  deskTopName = '';
  pinyin_name = '';
  isFromSystem = false;

  constructor(opt: WinAppConstructorOpt) {
    super(opt);

    this.isFromSystem = opt.isFromSystem || false;
    this.pinyin_name = pinyin(opt.name);
    registeredAppList.push(this);
  }

  // 创建快捷方式
  createShortcut(appIcon: string, appName: string) {
    this.deskTopName = appName;
    deskTopAppList.push({
      name: appName,
      comp: () => h(DesktopIcon, { appInstance: this, appIcon, appName }),
    });

    deskTopIconMap.set(appName, {
      appInstance: this,
      posIdx: getNewlyPosIdx(),
      isFocus: false,
    });

    return this;
  }

  deleteShortcut() {
    const index = deskTopAppList.findIndex((item) => item.name === this.deskTopName);
    deskTopAppList.splice(index, 1);
    deskTopIconMap.delete(this.deskTopName);
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
