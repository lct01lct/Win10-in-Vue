import { WinApp } from '..';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
  isFocus: boolean;
  isEditting: boolean;
}

export const deskTopIconMap = reactive<Map<string, DeskTopIconItem>>(new Map());

export const isFocusIcons = computed(() =>
  Array.from(deskTopIconMap.values()).filter((item) => item.isFocus)
);

export const resetFocusIcon = () => {
  deskTopIconMap.forEach((item) => {
    item.isFocus = false;
    item.isEditting = false;
  });
};

export const getNewlyPosIdx = (): number => {
  const nextIdx: number[] = [];
  const iconList = Array.from(deskTopIconMap.values()).sort((a, b) => a.posIdx - b.posIdx);

  for (let icon of iconList) {
    const index = nextIdx.indexOf(icon.posIdx);
    if (index === -1) {
      nextIdx.push(icon.posIdx + 1);
    } else if (index > -1) {
      nextIdx[index] = icon.posIdx + 1;
    }
  }

  return deskTopIconMap.size ? Math.min(...nextIdx) : 1;
};
