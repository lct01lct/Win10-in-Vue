import { App } from 'vue';
import { WinApp } from '..';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
  isFocus: boolean;
  vueApp: App;
}

export const deskTopIconMap = reactive<Map<string, DeskTopIconItem>>(new Map());

export const isFocusIcons = computed(() =>
  Array.from(deskTopIconMap.values()).filter((item) => item.isFocus)
);

export const resetFocusIcon = () => {
  deskTopIconMap.forEach((item) => {
    item.isFocus = false;
  });
};

export const getNewlyPosIdx = (): number => {
  const nextIdx: number[] = [];

  for (let icon of deskTopIconMap.values()) {
    const index = nextIdx.indexOf(icon.posIdx);
    if (index === -1) {
      nextIdx.push(icon.posIdx + 1);
    } else if (index > -1) {
      nextIdx[index] = icon.posIdx + 1;
    }
  }

  return deskTopIconMap.size ? Math.min(...nextIdx) : 1;
};
