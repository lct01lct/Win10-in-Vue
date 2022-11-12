import anime from 'animejs';

export type NetSetType = 'wifi' | 'flyMode' | 'hotspot';

export const isSelectWifi = ref(true);
export const isSelectFlyMode = ref(false);
export const isSelectHotspot = ref(false);
export const wifiStatus = computed(() => !isSelectFlyMode.value && isSelectWifi.value);

export interface WifiItem {
  name: string;
  type: '安全' | '开放';
  auto: boolean;
}

export const wifiInfo: WifiItem[] = reactive([{ name: 'Nuc-Student', type: '开放', auto: true }]);

export const waitWifiInfo: WifiItem[] = [
  { name: 'Nuc-Student-Auto', type: '安全', auto: false },
  { name: 'Nuc-Teacher', type: '开放', auto: false },
  { name: 'Nuc-Teacher-Auto', type: '安全', auto: false },
  { name: 'Nuc-Student1-Auto', type: '安全', auto: false },
  { name: 'Nuc-Teacher1', type: '开放', auto: false },
  { name: 'Nuc-Teacher1-Auto', type: '安全', auto: false },
];
