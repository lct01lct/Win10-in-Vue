import { WinApp, WinAppConstructorOpt, InfoByOpened } from '@/app';
import Setting from './setting.vue';
import SettingIcon from './img/setting-icon.png';
import { SettingPageOpenRoute } from './setting-page';

export const settingAppName = '设置';
export type SettingAppInfoByOpened = InfoByOpened & { route?: SettingPageOpenRoute };

export class SettingApp extends WinApp {
  declare infoByOpened: SettingAppInfoByOpened;
  declare open: (info?: SettingAppInfoByOpened) => void;
  constructor(opt: WinAppConstructorOpt) {
    super(opt);
  }
}

export const settingApp = new SettingApp({
  name: settingAppName,
  comp: Setting,
  icon: SettingIcon,
  defaultWidth: 1000,
  defaultHeight: 600,
});

export { SettingIcon };
