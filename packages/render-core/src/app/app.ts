import { BaseApp } from './base/baseApp';
import DesktopIcon from './base/desktop-icon.vue';
import type { BaseAppContructorOpt } from './base/baseApp';
import { deskTopIconMap, getNewlyPosIdx } from './base/desktop-icon';
import { Component } from 'vue';

export interface WinAppConstructorOpt extends BaseAppContructorOpt {}

interface DeskTopApp {
  name: string;
  comp: Component;
}
export class WinApp extends BaseApp {
  deskTopName: string = '';

  constructor({ name, comp, icon }: WinAppConstructorOpt) {
    super({
      name,
      comp,
      icon,
    });
  }

  static DeskTopAppList: DeskTopApp[] = [];

  // 创建快捷方式
  createShortcut(appIcon: string, appName: string) {
    this.deskTopName = appName;
    WinApp.DeskTopAppList.push({
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
    const index = WinApp.DeskTopAppList.findIndex((item) => item.name === this.deskTopName);
    WinApp.DeskTopAppList.splice(index, 1);
    deskTopIconMap.delete(this.deskTopName);
  }
}
