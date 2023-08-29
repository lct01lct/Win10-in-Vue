import { WinApp, checkAppIsFileApp, checkAppIsFolderApp, maxAppHeight } from '..';
import { Component } from 'vue';
import {
  DESKTOP_ICON_MARGINX,
  DESKTOP_ICON_MARGINY,
  DESKTOP_ICON_PADDING_TOP,
  DESKTOP_ICON_SIZE,
} from './config';
import { getNewlyPosIdx } from './utils';
import {
  appDeskTopIconConfigList,
  unReactiveDeskTopList,
  deskTopIconList,
  folderAndFileDeskTopIconList,
} from './data';
import { Files, Folder, InitFileOpt, createFile, deskTopData, isFile, isFolder } from 'model-core';
import { getRandomId } from 'utils';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
  isFocus: boolean;
  isEditting: boolean;
  displayName: string;
  comp: Component;
}

export interface DeskTopIconOpt {
  reference: WinApp;
  displayName: string;
  icon: string;
  posIdx?: number;
  originFileOrFolder?: Files | Folder;
}
export class DeskTopIcon {
  id = getRandomId();
  displayName: string = '';
  private _posIdx: number = 0;
  isFocus = false;
  isEditting = false;
  reference: WinApp;
  icon: string;
  originFileOrFolder?: Files | Folder;

  set posIdx(idx: number) {
    if (idx < 0) return;
    if (deskTopIconList.value.find((item) => item.posIdx === idx)) return;
    this._posIdx = idx;
  }

  get posIdx() {
    return this._posIdx;
  }

  constructor(option: DeskTopIconOpt) {
    const _self = reactive(this) as DeskTopIcon;

    this.displayName = option.displayName;
    this.reference = option.reference;
    this.icon = option.icon;
    this._posIdx = (option.posIdx && DeskTopIcon.resolvePosIdx(option.posIdx)) || getNewlyPosIdx();
    this.originFileOrFolder = option.originFileOrFolder;
    unReactiveDeskTopList.push(this);

    if (!checkAppIsFileApp(this.reference) && !checkAppIsFolderApp(this.reference)) {
      appDeskTopIconConfigList.push(this);
    }

    if (checkAppIsFolderApp(_self.reference) && isFolder(_self.originFileOrFolder)) {
      watch(
        () => _self.originFileOrFolder?.name,
        (val) => {
          if (val) _self.displayName = val;
        }
      );
    } else if (checkAppIsFileApp(_self.reference) && isFile(_self.originFileOrFolder)) {
      watch(
        () => (_self.originFileOrFolder as Files).fullName,
        (val) => {
          if (val) _self.displayName = val;
        }
      );
    }

    return _self;
  }

  removeDeskTopIcon() {
    if (!checkAppIsFolderApp(this.reference) && !checkAppIsFileApp(this.reference)) {
      const index = appDeskTopIconConfigList.findIndex((item) => item === this);
      const unReactiveIndex = unReactiveDeskTopList.findIndex((item) => {
        return item.displayName === this.displayName;
      });

      if (index > -1 && unReactiveIndex > -1) {
        appDeskTopIconConfigList.splice(index, 1);
        unReactiveDeskTopList.splice(unReactiveIndex, 1);
      }
    }
  }

  static resetDeskTopIcon() {
    deskTopIconList.value.forEach((item) => {
      item.isEditting = false;
      item.isFocus = false;
    });
  }

  static computePosIdx(e: MouseEvent) {
    const deskTopHeight = maxAppHeight;
    const deskTopPaddingTop = DESKTOP_ICON_PADDING_TOP;
    const iconMarginX = DESKTOP_ICON_MARGINX;
    const iconMarginY = DESKTOP_ICON_MARGINY;
    const iconSize = DESKTOP_ICON_SIZE;
    const colMaxCount = Math.floor((deskTopHeight - deskTopPaddingTop) / (iconSize + iconMarginY));
    const minTop = deskTopPaddingTop;
    const maxTop = colMaxCount * (iconMarginX + iconSize);
    const left = e.pageX;
    const top = (e.pageY < minTop ? minTop : e.pageY) > maxTop ? maxTop : e.pageY;
    const rowIndex = Math.floor(left / (iconMarginX + iconSize));
    const colIndex = Math.floor(top / (iconMarginY + iconSize));

    return rowIndex * colMaxCount + colIndex + 1;
  }

  private static resolvePosIdx(posIdx: number) {
    let currIdx = posIdx;
    const arr = unReactiveDeskTopList.sort((a, b) => a.posIdx - b.posIdx);

    for (let item of arr) {
      if (item.posIdx === currIdx) {
        item.posIdx++;
        currIdx++;
      } else if (item.posIdx > currIdx) {
        break;
      }
    }

    return posIdx;
  }
}

export const createFileIconInDeskTop = (fileOption: InitFileOpt, e: MouseEvent) => {
  const newFile = createFile(fileOption, deskTopData);

  const newFileIcon = folderAndFileDeskTopIconList.value.find((item) => {
    return isFile(item.originFileOrFolder) && item.originFileOrFolder.fullName === newFile.fullName;
  })!;
  newFileIcon.posIdx = DeskTopIcon.computePosIdx(e);
  newFileIcon.isEditting = true;
  newFileIcon.isFocus = true;

  return newFileIcon;
};
