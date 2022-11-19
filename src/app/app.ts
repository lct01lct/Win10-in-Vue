import Test from './test.vue';

export const compMap = {
  test: Test,
};

export type AppName = keyof typeof compMap;

export const WIN_APP_SCOPE = '__WIN__APP__SCOPE__';
export type WinApp = HTMLElement & {
  [WIN_APP_SCOPE]: {
    close: () => void;
  };
};

export const createApplication = (name: AppName) => {
  const vueApp = createApp(compMap[name]);
  const oContainer = document.createDocumentFragment() as unknown as HTMLElement;
  const vm = vueApp.mount(oContainer);
  const winApp = oContainer.querySelector('.app-wrapper')! as WinApp;

  document.querySelector('.deskTop-wrapper')!.appendChild(oContainer);
  winApp.style.zIndex = '10';
  winApp[WIN_APP_SCOPE] = {
    close: () => {
      vueApp.unmount();
    },
  };
};

export const createApplications = (names: AppName[]) => {
  return names.map((name) => createApplication(name));
};

export const getWinAppScope = (winApp: WinApp) => {
  return winApp[WIN_APP_SCOPE];
};
