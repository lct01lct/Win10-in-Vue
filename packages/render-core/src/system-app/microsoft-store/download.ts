import { AppOrigin, WinApp } from '@/app';
import {
  ApplicationDesc,
  R_AddDownloadedApp,
  useUserStore,
  R_getApplicationById,
} from 'model-core';

export const useDownloadApp = async ({ downloadLink, icon, _id }: ApplicationDesc) => {
  const userStore = useUserStore();
  const appModule = await import(/* @vite-ignore */ downloadLink);
  const appOrigin: AppOrigin = appModule.default;
  appOrigin.icon = icon;
  WinApp.install(appOrigin).createShortcut(icon, appOrigin.name);
  const res = await R_AddDownloadedApp(_id);
  const downloadedApp = res?.data?.downloadedApp;
  if (downloadedApp) {
    userStore.setUser({ ...userStore.user!, downloadedApp });
  }
};

export const initDownloadedApps = async () => {
  const userStore = useUserStore();
  const downloadAppIds = userStore.user?.downloadedApp;

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
      }
    });
  }
};
