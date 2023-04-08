import DAO from 'utils/localStoage';

export type NetSetType = 'wifi' | 'flyMode' | 'hotspot';

export const isSelectWifi = ref(true);
export const isSelectFlyMode = ref(false);
export const isSelectHotspot = ref(false);
export const wifiStatus = computed(() => !isSelectFlyMode.value && isSelectWifi.value);

interface WifiItem {
  name: string;
  type: '安全' | '开放';
  auto: boolean;
}

const WIFIINFO = [
  { name: 'Nuc-Student', type: '开放', auto: true },
  { name: 'Nuc-Student-Auto', type: '安全', auto: false },
  { name: 'Nuc-Teacher', type: '开放', auto: false },
  { name: 'Nuc-Teacher-Auto', type: '安全', auto: false },
  { name: 'Nuc-Student1-Auto', type: '安全', auto: false },
  { name: 'Nuc-Teacher1', type: '开放', auto: false },
  { name: 'Nuc-Teacher1-Auto', type: '安全', auto: false },
];
export const dao = new DAO('win10_', '--|--');

dao.set('WIFIINFO', WIFIINFO);

export const wifiInfo = ref<WifiItem[]>([dao.get('WIFIINFO').value[0]]);
export const resetWifiInfo = () => {
  wifiInfo.value = [dao.get('WIFIINFO').value[0]];
  waitWifiInfo.length = 0;
  waitWifiInfo.push(...dao.get('WIFIINFO').value.slice(1));
};

export const waitWifiInfo: WifiItem[] = dao.get('WIFIINFO').value.slice(1);
