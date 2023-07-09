import positionIcon from '@/assets/images/homePage/taskBar-img/position.png';
import lightningIcon from '@/assets/images/homePage/taskBar-img/lightning.png';
import bluetoothOriginIcon from '@/assets/images/homePage/taskBar-img/bluetooth-origin.png';
import nightmodeIcon from '@/assets/images/homePage/taskBar-img/nightmode.png';
import hotspotIcon from '@/assets/images/homePage/taskBar-img/hotspot.png';
import flyModeIcon from '@/assets/images/homePage/taskBar-img/flyMode.png';
import shareIcon from '@/assets/images/homePage/taskBar-img/share.png';
import settingIcon from '@/assets/images/homePage/taskBar-img/setting.png';
import networkIcon from '@/assets/images/homePage/taskBar-img/network.png';
import connectionIcon from '@/assets/images/homePage/taskBar-img/connection.png';
import projectionIcon from '@/assets/images/homePage/taskBar-img/projection.png';
import VPNIcon from '@/assets/images/homePage/taskBar-img/VPN.png';
import moonIcon from '@/assets/images/homePage/taskBar-img/moon.png';
import cutIcon from '@/assets/images/homePage/taskBar-img/cut.png';
import wifiIcon from '@/assets/images/homePage/taskBar-img/wifi.png';

export interface Setting {
  name: string;
  icon: string;
  onTrigger?: Function;
}

export interface SettingItem extends Setting {
  isFocus: boolean;
}

export const progessVal = ref(100);

export const allSettings: Setting[] = [
  { name: '定位', icon: positionIcon },
  { name: '节电模式', icon: lightningIcon },
  { name: '未连接', icon: bluetoothOriginIcon },
  { name: '夜间模式', icon: nightmodeIcon },
  { name: '移动热点', icon: hotspotIcon },
  { name: '飞行模式', icon: flyModeIcon },
  { name: '就近共享', icon: shareIcon },
  { name: '所有设置', icon: settingIcon },
  { name: '网络', icon: networkIcon },
  { name: '连接', icon: connectionIcon },
  { name: '投影', icon: projectionIcon },
  { name: 'VPN', icon: VPNIcon },
  { name: '专注助手', icon: moonIcon },
  { name: '屏幕截图', icon: cutIcon },
  { name: 'WLAN', icon: wifiIcon },
];

export const settingList = reactive<SettingItem[]>([]);

export const addSettingItem = (name: string, isFocus: boolean = false) => {
  if (settingList.findIndex((item) => item.name === name) > -1) return;

  const index = allSettings.findIndex((item) => item.name === name);

  if (index > -1) {
    settingList.push({ isFocus, ...allSettings[index] });
  }
};

export const deleteSettingItem = (name: string) => {
  const index = settingList.findIndex((item) => item.name === name);

  index > -1 && settingList.splice(index, 1);
};

// init
(() => {
  allSettings.forEach(({ name }) => {
    const defaultFocusNames = ['定位', '未连接'];

    if (defaultFocusNames.includes(name)) {
      addSettingItem(name, true);
    } else {
      addSettingItem(name);
    }
  });
})();
