import { BaseApp } from './base/baseApp';
import DesktopIcon from './base/desktop-icon.vue';
import type { BaseAppContructorOpt } from './base/baseApp';
import { deskTopIconMap, getNewlyPosIdx } from './base/desktop-icon';
import { Component } from 'vue';
import { pinyin } from 'pinyin-pro';

export interface WinAppConstructorOpt extends BaseAppContructorOpt {
  isFromSystem?: boolean;
}

interface DeskTopApp {
  name: string;
  comp: Component;
}

export class WinApp extends BaseApp {
  static registeredAppList: WinApp[] = reactive([]);
  static deskTopAppList: DeskTopApp[] = reactive([]);

  deskTopName = '';
  pinyin_name = '';
  isFromSystem = false;

  constructor(opt: WinAppConstructorOpt) {
    super(opt);

    this.isFromSystem = opt.isFromSystem || false;
    this.pinyin_name = pinyin(opt.name);
    WinApp.registeredAppList.push(this);
  }

  // 创建快捷方式
  createShortcut(appIcon: string, appName: string) {
    this.deskTopName = appName;
    WinApp.deskTopAppList.push({
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
    const index = WinApp.deskTopAppList.findIndex((item) => item.name === this.deskTopName);
    WinApp.deskTopAppList.splice(index, 1);
    deskTopIconMap.delete(this.deskTopName);
  }
}
