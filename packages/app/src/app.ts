import BaseApp from './base/baseApp';
import DesktopIcon from './base/desktop-icon.vue';
import type { BaseAppContructorOpt } from './base/baseApp';
import { deskTopIconList, getNewlyPosIdx } from './base/desktop-icon';

interface WinAppConstructorOpt extends BaseAppContructorOpt {}

export default class WinApp extends BaseApp {
  constructor({ name, comp, icon }: WinAppConstructorOpt) {
    super({
      name,
      comp,
      icon,
    });
  }

  // 创建快捷方式
  createShortcut(appIcon: string, appName: string) {
    deskTopIconList.push({ appInstance: this, posIdx: getNewlyPosIdx(), isFocus: false, appName });

    const oContainer = document.createDocumentFragment() as unknown as HTMLElement;
    const vueApp = createApp(DesktopIcon, {
      appInstance: this,
      appIcon,
      appName,
    });
    vueApp.mount(oContainer);

    setTimeout(() => {
      document.querySelector('.deskTop-wrapper')!.appendChild(oContainer);
    });

    return this;
  }
}
