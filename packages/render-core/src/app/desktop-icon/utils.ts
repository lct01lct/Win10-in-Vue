import { unReactiveDeskTopList } from './data';

export function getNewlyPosIdx() {
  const nextIdx: number[] = [];

  const iconList = unReactiveDeskTopList.sort((a, b) => a.posIdx - b.posIdx);

  for (let icon of iconList) {
    const index = nextIdx.indexOf(icon.posIdx);
    if (index === -1) {
      nextIdx.push(icon.posIdx + 1);
    } else if (index > -1) {
      nextIdx[index] = icon.posIdx + 1;
    }
  }

  return unReactiveDeskTopList.length ? Math.min(...nextIdx) : 1;
}
