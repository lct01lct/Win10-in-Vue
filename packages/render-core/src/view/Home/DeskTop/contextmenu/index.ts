import { ContextMenuOptionItem, createContextMenu } from '@/win';
import BlackCircleIcon from './img/black-circle.png';
import HookIcon from './img/hook.png';

export const { open: openMenu } = createContextMenu();

export const contextMenuOptions: ContextMenuOptionItem[] = [
  {
    name: '查看方式',
    subOptions: [
      { name: '大图标(R)' },
      { name: '中等图标(M)', icon: BlackCircleIcon },
      { name: '小图标(N)' },
      { name: '自动排列图标(A)' },
      { name: '将图标与网格对齐(I)', icon: HookIcon },
      { name: '显示桌面图标(D)', icon: HookIcon },
    ],
  },
];
