import { ContextMenuOptionItem, createContextMenu } from '@/win';
import EdgeIcon from './img/contextmenu/edge.png';
import ChromeIcon from './img/contextmenu/chrome.png';

export const { open: openMenu } = createContextMenu();
export const baseOptions: ContextMenuOptionItem[] = [
  {
    name: '打开方式',
    onClick() {},
    subOptions: [
      { name: 'Google chrome', icon: ChromeIcon },
      { name: 'Microsoft edge', icon: EdgeIcon },
      { name: '选择其他应用' },
    ],
  },
  { name: '剪切(T)' },
  { name: '复制(C)' },
  { name: '删除快捷方式(D)' },
  { name: '重命名(M)' },
];
