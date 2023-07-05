import { SettingPageOpenRoute, settingPageInfo } from './setting-page';

export const pageRoute = ref<SettingPageOpenRoute>();
export const setPageRoute = (route?: SettingPageOpenRoute) => {
  pageRoute.value = route;
};
export const pageOptions = computed(
  () => settingPageInfo.find((item) => item.name === pageRoute.value)!.options
);
