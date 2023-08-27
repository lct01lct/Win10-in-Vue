import { BaseApp } from './base/baseApp';
import type { BaseAppContructorOpt } from './base/baseApp';
import { DeskTopIcon } from './desktop-icon';
import { Component } from 'vue';
import { pinyin } from 'pinyin-pro';
import { AppOrigin } from './types';
import { Base } from '.';

export interface WinAppConstructorOpt extends BaseAppContructorOpt {
  isFromSystem?: boolean;
}

export const registeredAppList: WinApp[] = reactive([]);

export interface ShortCutOption {
  posIdx?: number;
}

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

  createShortcut(appIcon: string, displayName: string, option?: ShortCutOption) {
    this.displayName = displayName;

    if (checkAppIsFolderApp(this) || checkAppIsFileApp(this)) {
      throw Error('FolderApp or FileApp cannot create shortcut');
    }
    const deskTopIcon = new DeskTopIcon({
      displayName: displayName,
      reference: this,
      icon: appIcon,
      posIdx: option?.posIdx,
    });

    return deskTopIcon;
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

export const checkAppIsFolderApp = (app: WinApp, fn?: Function) => {
  const isFolderApp = app.name === '文件夹';
  if (isFolderApp) {
    fn?.();
  }

  return isFolderApp;
};

export const checkAppIsFileApp = (app: WinApp, fn?: Function) => {
  const isFileApp = app.name === '记事本';
  if (isFileApp) {
    fn?.();
  }

  return isFileApp;
};
