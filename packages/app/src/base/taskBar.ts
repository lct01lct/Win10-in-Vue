import { WinApp } from '..';

export interface TaskBarTriggerItem {
  name: string;
  iconPath: string;
  winApp: WinApp;
  zIndex: number;
}

export const taskBarTriggerList = reactive<TaskBarTriggerItem[]>([]);
export const addTaskBarTriggerItem = (opt: TaskBarTriggerItem) => {
  taskBarTriggerList.push(opt);
};
export const removeTaskBarTriggerItem = (name: string) => {
  const index = taskBarTriggerList.findIndex((item) => item.name === name);
  index > -1 && taskBarTriggerList.splice(index, 1);
};

export const toggleZIndex = (tar: string | HTMLElement) => {
  const openedAppLen = taskBarTriggerList.length;
  const index = taskBarTriggerList.findIndex(
    (item) => item.name === tar || item.winApp._dom === tar
  );

  if (index === -1) return;

  const triggerItem = taskBarTriggerList[index];
  const oldZIndex = taskBarTriggerList[index].zIndex;

  taskBarTriggerList.forEach((item) => {
    if (item.zIndex >= oldZIndex && item !== triggerItem) {
      item.zIndex--;
    }
  });

  triggerItem.zIndex = openedAppLen;
};
