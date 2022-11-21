import { WinApp } from '..';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
  isFocus: boolean;
}

export const deskTopIconList = reactive<DeskTopIconItem[]>([]);
export const curFoucsItemName = ref<string>('');
export const resetFocusIcon = () => {
  const index = deskTopIconList.findIndex(
    (item) => item.appInstance.name === curFoucsItemName.value
  );
  if (index > -1) deskTopIconList[index].isFocus = false;
};

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
