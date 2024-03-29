import { Component } from 'vue';
import accountIcon from './img/item-icon/account.png';
import applicationIcon from './img/item-icon/application.png';
import deviceIcon from './img/item-icon/device.png';
import langIcon from './img/item-icon/lang.png';
import lockIcon from './img/item-icon/lock.png';
import netIcon from './img/item-icon/net.png';
import personalizationIcon from './img/item-icon/personalization.png';
import phoneIcon from './img/item-icon/phone.png';
import quickIcon from './img/item-icon/quick.png';
import searchIcon from './img/item-icon/search.png';
import systemIcon from './img/item-icon/system.png';
import updateIcon from './img/item-icon/update.png';
import xboxIcon from './img/item-icon/xbox.png';

// account-icon
import account_infoIcon from './img/account-icon/info.png';
import account_emailIcon from './img/account-icon/email.png';
import account_friendsIcon from './img/account-icon/friends.png';
import account_loginIcon from './img/account-icon/login.png';
import account_connectIcon from './img/account-icon/connect.png';
import account_syncIcon from './img/account-icon/sync.png';

// personalization-icon
import personalization_backgroundIcon from './img/personalization-icon/background.png';
import personalization_colorIcon from './img/personalization-icon/color.png';
import personalization_lockIcon from './img/personalization-icon/lock.png';
import personalization_themeIcon from './img/personalization-icon/theme.png';
import personalization_fontIcon from './img/personalization-icon/font.png';

export const settingPageInfo: SettingInfoItem[] = [
  {
    name: '系统',
    desc: '显示、声音、通知、电源',
    icon: systemIcon,
    options: [],
  },
  {
    name: '设备',
    desc: '蓝牙、打印机、鼠标',
    icon: deviceIcon,
    options: [],
  },
  {
    name: '手机',
    desc: '连接 Android 设备和 iPhone',
    icon: phoneIcon,
    options: [],
  },
  {
    name: '网络和 Internet',
    desc: 'WLAN、飞行模式、VPN',
    icon: netIcon,
    options: [],
  },
  {
    name: '个性化',
    desc: '背景、锁屏、颜色',
    icon: personalizationIcon,
    options: [
      {
        icon: personalization_backgroundIcon,
        subName: '背景',
        comp: () => import('./personalization-components/personalization-background.vue'),
      },
      { icon: personalization_colorIcon, subName: '颜色' },
      { icon: personalization_lockIcon, subName: '锁屏桌面' },
      { icon: personalization_themeIcon, subName: '主题' },
      { icon: personalization_fontIcon, subName: '字体' },
    ],
  },
  {
    name: '应用',
    desc: '卸载、默认应用、可选功能',
    icon: applicationIcon,
    options: [],
  },
  {
    name: '账户',
    desc: '你的账户、电子邮箱、同步设置、工作、家庭',
    icon: accountIcon,
    options: [
      {
        icon: account_infoIcon,
        subName: '账户信息',
        comp: () => import('./account-components/account-info.vue'),
      },
      { icon: account_emailIcon, subName: '电子邮箱和账户' },
      { icon: account_loginIcon, subName: '登录选项' },
      { icon: account_connectIcon, subName: '连接工作或学校账户' },
      { icon: account_friendsIcon, subName: '家庭和其他用户' },
      { icon: account_syncIcon, subName: '同步你的设置' },
    ],
  },
  {
    name: '时间和语言',
    desc: '语音、区域、日期',
    icon: langIcon,
    options: [],
  },
  {
    name: '游戏',
    desc: 'Xbox Game Bar、捕获、游戏模式',
    icon: xboxIcon,
    options: [],
  },
  {
    name: '轻松使用',
    desc: '讲述人、放大镜、高对比度',
    icon: quickIcon,
    options: [],
  },
  {
    name: '搜索',
    desc: '查找我的文件、权限',
    icon: searchIcon,
    options: [],
  },
  {
    name: '隐私',
    desc: '位置、摄像头、麦克风',
    icon: lockIcon,
    options: [],
  },
  {
    name: '更新和安全',
    desc: 'Windows 更新、恢复、备份',
    icon: updateIcon,
    options: [],
  },
];

export interface SettingPageOptionItem {
  readonly icon: string;
  readonly subName: string;
  readonly comp?: () => Promise<Component>;
}
export type SettingPageOpenRoute = (typeof settingPageInfo)[number]['name'];

export interface SettingInfoItem {
  readonly name:
    | '系统'
    | '设备'
    | '手机'
    | '网络和 Internet'
    | '个性化'
    | '应用'
    | '账户'
    | '时间和语言'
    | '游戏'
    | '轻松使用'
    | '搜索'
    | '隐私'
    | '更新和安全';
  readonly desc: string;
  readonly icon: string;
  readonly options: SettingPageOptionItem[];
}
