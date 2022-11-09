export type NetSetType = 'wifi' | 'flyMode' | 'hotspot';

export const isSelectWifi = ref(true);
export const isSelectFlyMode = ref(false);
export const isSelectHotspot = ref(false);
export const wifiStatus = computed(() => !isSelectFlyMode.value && isSelectWifi.value);

interface WifiItem {
  name: string;
  type: '安全' | '开放式';
}

export const wifiInfo: WifiItem[] = [
  { name: 'Nuc-Student', type: '开放式' },
  { name: 'Nuc-Student-Auto', type: '安全' },
  { name: 'Nuc-Teacher', type: '开放式' },
  { name: 'Nuc-Student-Auto', type: '安全' },
];
