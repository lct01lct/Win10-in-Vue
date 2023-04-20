import { WinApp } from '..';

export const getAppInstance = () => {
  return inject<WinApp>('appInstance')!;
};

// 是否通过桌面的快捷方式打开
export const isOpenedInDesktop = () => {
  return getAppInstance()?.name === getAppInstance().infoByOpened?.folderName;
};
