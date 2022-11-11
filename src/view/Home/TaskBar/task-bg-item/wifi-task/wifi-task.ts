import anime from 'animejs';

export type NetSetType = 'wifi' | 'flyMode' | 'hotspot';

export const isSelectWifi = ref(true);
export const isSelectFlyMode = ref(false);
export const isSelectHotspot = ref(false);
export const wifiStatus = computed(() => !isSelectFlyMode.value && isSelectWifi.value);

interface WifiItem {
  name: string;
  type: '安全' | '开放';
}

export const wifiInfo: WifiItem[] = reactive([{ name: 'Nuc-Student', type: '开放' }]);

export const waitWifiInfo: WifiItem[] = [
  { name: 'Nuc-Student-Auto', type: '安全' },
  { name: 'Nuc-Teacher', type: '开放' },
  { name: 'Nuc-Ttudent-Auto', type: '安全' },
  { name: 'Nuc-Student1-Auto', type: '安全' },
  { name: 'Nuc-Teacher1', type: '开放' },
  { name: 'Nuc-Ttudent1-Auto', type: '安全' },
];
