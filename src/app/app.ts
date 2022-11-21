import BaseApp from './base/BaseApp';
import DesktopIcon from './base/desktop-icon.vue';
import type { BaseAppContructorOpt } from './base/BaseApp';
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
  createShortcut(appIcon: string, appName?: string) {
    setTimeout(() => {
      deskTopIconList.push({ appInstance: this, posIdx: getNewlyPosIdx(), isFocus: false });
      const oContainer = document.createDocumentFragment() as unknown as HTMLElement;
      const vueApp = createApp(DesktopIcon, {
        appInstance: this,
        appIcon,
        appName: appName ? appName : this.name,
      });
      vueApp.mount(oContainer);

      document.querySelector('.deskTop-wrapper')!.appendChild(oContainer);
    });

    return this;
  }
}
