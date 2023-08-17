import { WinApp } from '..';
import { Component } from 'vue';

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
    this.posIdx = option.posIdx || DeskTopIcon.getNewlyPosIdx();
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
}
