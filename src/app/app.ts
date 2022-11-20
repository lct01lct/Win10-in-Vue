import BaseApp from './base/BaseApp';
import type { BaseAppContructorOpt } from './base/BaseApp';

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
  createShortcut(icon: string) {}
}
