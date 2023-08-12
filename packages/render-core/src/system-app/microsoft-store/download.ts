import { AppOrigin, WinApp } from '@/app';
import {
  ApplicationDesc,
  R_AddDownloadedApp,
  useUserStore,
  R_getApplicationById,
  useDownloadAppStore,
} from 'model-core';

export const useDownloadApp = async ({ downloadLink, icon, _id }: ApplicationDesc) => {
  const userStore = useUserStore();
  const appModule = await import(/* @vite-ignore */ downloadLink);
  const appOrigin: AppOrigin = appModule.default;
  appOrigin.icon = icon;
  WinApp.install(appOrigin).createShortcut(icon, appOrigin.name);
  const res = await R_AddDownloadedApp(_id);
  const downloadedAppIdList = res?.data?.downloadedApp;

  if (downloadedAppIdList) {
    userStore.setUser({ ...userStore.user!, downloadedAppIdList });
  }
};

export const initDownloadedApps = async () => {
  const userStore = useUserStore();
  const downloadAppStore = useDownloadAppStore();

  const downloadAppIds = userStore.user?.downloadedAppIdList;

  if (downloadAppIds?.length) {
    const reses = await Promise.all(
      downloadAppIds.map((id) => {
        return R_getApplicationById(id);
      })
    );
    reses.forEach((res) => {
      const app = res?.data?.app;

      if (app) {
        useDownloadApp(app);
        downloadAppStore.downloadAppList.push(app);
      }
    });
  }
};
