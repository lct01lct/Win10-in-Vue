import { deskTopData, isFile } from 'model-core';
import { DeskTopIcon, DeskTopIconOpt } from './desktop-icon';
import fileFullIcon from '@/system-app/folder/img/file-full.png';
import { checkAppIsFileApp, checkAppIsFolderApp, registeredAppList } from '..';

export const appDeskTopIconConfigList: DeskTopIcon[] = reactive([]);

export const deskTopIconList = computed<DeskTopIcon[]>(() => {
  return [...appDeskTopIconConfigList, ...folderAndFileDeskTopIconList.value];
});

export const unReactiveDeskTopList: DeskTopIcon[] = [];

export const folderAndFileDeskTopIconList = computed(() => {
  const arr: DeskTopIcon[] = [];

  for (const item of deskTopData.children) {
    const folderOrFileDeskTopIcon = folderAndFileDeskTopIconList.value?.find(
      (app) => app.originFileOrFolder === item
    );

    if (folderOrFileDeskTopIcon) {
      arr.push(folderOrFileDeskTopIcon);
    } else {
      const opt: DeskTopIconOpt = {
        displayName: item.name,
        icon: fileFullIcon,
        reference: registeredAppList.find((item) => checkAppIsFolderApp(item))!,
        originFileOrFolder: item,
      };

      if (isFile(item)) {
        opt.displayName = item.fullName;
        opt.icon = item.defaultIcon;
        opt.reference = registeredAppList.find((item) => checkAppIsFileApp(item))!;
      }

      const deskTopIcon = new DeskTopIcon(opt);
      arr.push(deskTopIcon);
    }
  }

  return arr;
});
