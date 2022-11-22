import { WinApp } from '..';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
  isFocus: boolean;
  appName: string;
}

export const deskTopIconList = reactive<DeskTopIconItem[]>([]);

export const isFocusIcons = computed(() => deskTopIconList.filter((item) => item.isFocus));

export const resetFocusIcon = () => {
  deskTopIconList.forEach((item) => {
    item.isFocus = false;
  });
};

export const getNewlyPosIdx = (): number => {
  const nextIdx: number[] = [];

  for (let icon of deskTopIconList) {
    const index = nextIdx.indexOf(icon.posIdx);
    if (index === -1) {
      nextIdx.push(icon.posIdx + 1);
    } else if (index > -1) {
      nextIdx[index] = icon.posIdx + 1;
    }
  }

  return deskTopIconList.length ? Math.min(...nextIdx) : 1;
};
