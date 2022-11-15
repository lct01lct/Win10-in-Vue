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
  { name: '定位', icon: '/src/assets/images/homePage/taskBar-img/position.png' },
  { name: '节电模式', icon: '/src/assets/images/homePage/taskBar-img/lightning.png' },
  { name: '未连接', icon: '/src/assets/images/homePage/taskBar-img/bluetooth-origin.png' },
  { name: '夜间模式', icon: '/src/assets/images/homePage/taskBar-img/nightmode.png' },
  { name: '移动热点', icon: '/src/assets/images/homePage/taskBar-img/hotspot.png' },
  { name: '飞行模式', icon: '/src/assets/images/homePage/taskBar-img/flyMode.png' },
  { name: '就近共享', icon: '/src/assets/images/homePage/taskBar-img/share.png' },
  { name: '所有设置', icon: '/src/assets/images/homePage/taskBar-img/setting.png' },
  { name: '网络', icon: '/src/assets/images/homePage/taskBar-img/network.png' },
  { name: '连接', icon: '/src/assets/images/homePage/taskBar-img/connection.png' },
  { name: '投影', icon: '/src/assets/images/homePage/taskBar-img/projection.png' },
  { name: 'VPN', icon: '/src/assets/images/homePage/taskBar-img/VPN.png' },
  { name: '专注助手', icon: '/src/assets/images/homePage/taskBar-img/moon.png' },
  { name: '屏幕截图', icon: '/src/assets/images/homePage/taskBar-img/cut.png' },
  { name: 'WLAN', icon: '/src/assets/images/homePage/taskBar-img/wifi.png' },
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
