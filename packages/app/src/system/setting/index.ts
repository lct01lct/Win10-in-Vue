import { WinApp } from '../..';
import Setting from './setting.vue';
import SettingIcon from './img/setting-icon.png';

export const settingAppName = '设置';

export const settingApp = new WinApp({
  name: settingAppName,
  comp: Setting,
  icon: SettingIcon,
});

export { SettingIcon };
