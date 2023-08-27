import { deskTopData, isFile } from 'model-core';
import { DeskTopIcon, DeskTopIconOpt } from './desktop-icon';
import fileFullIcon from '@/system-app/folder/img/file-full.png';
import { checkAppIsFileApp, checkAppisFolderApp, registeredAppList } from '..';

export const appDeskTopIconConfigList: DeskTopIcon[] = reactive([]);

export const deskTopIconList = computed<DeskTopIcon[]>(() => {
  return [...appDeskTopIconConfigList, ...folderAndFileDeskTopIconList.value];
});

export const unReactiveDeskTopList: DeskTopIcon[] = [];

export const folderAndFileDeskTopIconList = computed(() => {
  return deskTopData.children.map((item) => {
    const opt: DeskTopIconOpt = {
      displayName: item.name,
      icon: fileFullIcon,
      reference: registeredAppList.find((item) => checkAppisFolderApp(item))!,
    };

    if (isFile(item)) {
      opt.displayName = item.fullName;
      opt.icon = item.defaultIcon;
      opt.reference = registeredAppList.find((item) => checkAppIsFileApp(item))!;
    }

    const deskTopIcon = new DeskTopIcon(opt);

    return deskTopIcon;
  });
});
