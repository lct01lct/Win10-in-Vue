import { Component } from 'vue';
import BaseApp from './base/BaseApp';

export default class WinApp extends BaseApp {
  constructor(name: string, comp: Component) {
    super(name, comp);
  }

  // 创建快捷方式
  createShortcut(icon: string) {}
}
