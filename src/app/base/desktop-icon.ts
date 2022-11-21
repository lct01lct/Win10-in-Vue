import { WinApp } from '..';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
}

export const deskTopIconList = reactive<DeskTopIconItem[]>([]);

export const getNewlyPosIdx = (): number => {
  const nextIdx: number[] = [];

  for (let icon of deskTopIconList) {
    const index = nextIdx.indexOf(icon.posIdx + 1);
    if (index > -1) {
      nextIdx.push(icon.posIdx + 1);
    } else {
      nextIdx[index] = icon.posIdx + 1;
    }
  }

  return deskTopIconList.length ? Math.max(...nextIdx) : 1;
};
