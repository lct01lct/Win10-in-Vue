import { WinApp } from '..';
import { taskBarTriggerList } from '..';

const DEFAULT_VIEW_WIDTH = 800;
const DEFAULT_VIEW_HEIGHT = 500;
const DEFAULT_VIEW_TOP = computed(() => 50 + taskBarTriggerList.length * 30);
const DEFAULT_VIEW_LEFT = computed(() => 250 + taskBarTriggerList.length * 30);
const DEFAULT_VIEW_MINWIDTH = 288;
const DEFAULT_VIEW_MINHEIGHT = 248;

export const DESKTOP_ICON_PADDING_TOP = 8;
export const DESKTOP_ICON_MARGINX = 4;
export const DESKTOP_ICON_MARGINY = 15;
export const DESKTOP_ICON_SIZE = 76.8;

export const getViewSizeConfig = (appInstance: WinApp) => {
  const info = appInstance.infoByOpened;

  return {
    width: info?.width || DEFAULT_VIEW_WIDTH,
    height: info?.height || DEFAULT_VIEW_HEIGHT,
    top: info?.top || DEFAULT_VIEW_TOP.value,
    left: info?.left || DEFAULT_VIEW_LEFT.value,
    minWidth: info?.minWidth || DEFAULT_VIEW_MINWIDTH,
    minHeight: info?.minHeight || DEFAULT_VIEW_MINHEIGHT,
  };
};
