import { WinApp } from '../..';
import Setting from './setting.vue';

export const settingAppName = '设置';
export const settingIcon = '';

export const settingApp = new WinApp({
  name: settingAppName,
  comp: Setting,
  icon: settingIcon,
});
