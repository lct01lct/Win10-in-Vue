import { ShortCutOption, WinApp, maxAppHeight, registeredAppList } from '..';
import { Component } from 'vue';
import {
  DESKTOP_ICON_MARGINX,
  DESKTOP_ICON_MARGINY,
  DESKTOP_ICON_PADDING_TOP,
  DESKTOP_ICON_SIZE,
} from './view-config';
import fileFullIcon from '@/system-app/folder/img/file-full.png';
import { folderAppName, notepadAppName } from '@/system-app';
import { Folder, InitFileOpt, createFile, deskTopData } from 'model-core';

export interface DeskTopIconItem {
  appInstance: WinApp;
  posIdx: number;
  isFocus: boolean;
  isEditting: boolean;
  displayName: string;
  comp: Component;
}

interface DeskTopIconOpt {
  reference: WinApp;
  displayName: string;
  icon: string;
  posIdx?: number;
}
export class DeskTopIcon {
  displayName: string = '';
  posIdx: number;
  isFocus = false;
  isEditting = false;
  reference: WinApp;
  icon: string;

  constructor(option: DeskTopIconOpt) {
    this.displayName = option.displayName;
    this.reference = option.reference;
    this.posIdx =
      (option.posIdx && DeskTopIcon.resolvePosIdx(option.posIdx)) || DeskTopIcon.getNewlyPosIdx();
    this.icon = option.icon;

    return reactive(this) as DeskTopIcon;
  }

  static isFocusIcons = computed(() => DeskTopIcon.deskTopIconList.filter((item) => item.isFocus));
  static deskTopIconList: DeskTopIcon[] = reactive([]);
  static DeskTopComponentMap = reactive(new Map<DeskTopIcon, Component>());

  addNewDeskTopIcon(Component: Component) {
    DeskTopIcon.deskTopIconList.push(this);
    DeskTopIcon.DeskTopComponentMap.set(this, Component);
  }

  removeDeskTopIcon() {
    const index = DeskTopIcon.deskTopIconList.findIndex((item) => item === this);
    if (index > -1) {
      const component = DeskTopIcon.DeskTopComponentMap.get(this);
      DeskTopIcon.DeskTopComponentMap.delete(this);
      return {
        desktopIcon: DeskTopIcon.deskTopIconList.splice(index, 1),
        component: component,
      };
    }
  }

  static getNewlyPosIdx(): number {
    const nextIdx: number[] = [];
    const iconList = Array(...DeskTopIcon.deskTopIconList).sort((a, b) => a.posIdx - b.posIdx);

    for (let icon of iconList) {
      const index = nextIdx.indexOf(icon.posIdx);
      if (index === -1) {
        nextIdx.push(icon.posIdx + 1);
      } else if (index > -1) {
        nextIdx[index] = icon.posIdx + 1;
      }
    }

    return DeskTopIcon.deskTopIconList.length ? Math.min(...nextIdx) : 1;
  }

  static resetDeskTopIcon() {
    DeskTopIcon.deskTopIconList.forEach((item) => {
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
    const arr = DeskTopIcon.deskTopIconList.sort((a, b) => a.posIdx - b.posIdx);

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
