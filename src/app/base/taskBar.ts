import { WinApp } from '@/app';

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
