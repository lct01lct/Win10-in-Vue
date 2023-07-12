import { WinApp } from '..';

export interface TaskBarTriggerItem {
  name: string;
  iconPath: string;
  winApp: WinApp;
  zIndex: number;
}

export const taskBarTriggerList: TaskBarTriggerItem[] = reactive([]);
export const addTaskBarTriggerItem = (opt: TaskBarTriggerItem) => {
  taskBarTriggerList.push(opt);
};
export const removeTaskBarTriggerItem = (name: string) => {
  const index = taskBarTriggerList.findIndex((item) => item.name === name);
  index > -1 && taskBarTriggerList.splice(index, 1);
};

export const toggleZIndex = (tar: string | HTMLElement) => {
  const openedAppLen = getOpenedAppLen();

  const index = taskBarTriggerList.findIndex(
    (item) => item.name === tar || item.winApp._dom === tar
  );

  if (index === -1) return;

  const triggerItem = taskBarTriggerList[index];
  const oldZIndex = triggerItem.zIndex;

  if (oldZIndex !== -1) {
    taskBarTriggerList.forEach((item) => {
      if (item.zIndex >= oldZIndex && item !== triggerItem) {
        item.zIndex--;
      }
    });
    triggerItem.zIndex = openedAppLen;
  } else {
    triggerItem.zIndex = openedAppLen + 1;
  }
};

export const removeZIndex = (tar: HTMLElement) => {
  const index = taskBarTriggerList.findIndex((item) => item.winApp._dom === tar);

  if (index === -1) return;

  const removedItem = taskBarTriggerList[index];

  const oldZIndex = removedItem.zIndex;
  removedItem.zIndex = -1;

  taskBarTriggerList.forEach((item) => {
    if (item.zIndex > oldZIndex) {
      item.zIndex--;
    }
  });
};

export const getOpenedAppLen = () => {
  return taskBarTriggerList.filter((item) => item.zIndex !== -1).length;
};
