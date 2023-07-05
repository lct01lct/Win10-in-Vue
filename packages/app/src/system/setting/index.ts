import { WinApp, WinAppConstructorOpt, InfoByOpened } from '../..';
import Setting from './setting.vue';
import SettingIcon from './img/setting-icon.png';
import { SettingPageOpenRoute } from './setting-page';

export const settingAppName = '设置';

export class SettingApp extends WinApp {
  declare infoByOpened: InfoByOpened & { route: SettingPageOpenRoute };

  constructor(opt: WinAppConstructorOpt) {
    super(opt);
  }
}

export const settingApp = new SettingApp({
  name: settingAppName,
  comp: Setting,
  icon: SettingIcon,
});

export { SettingIcon };
