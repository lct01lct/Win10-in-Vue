import { createContextMenu, ContextMenuProps, createContextMenuOptionGroup } from '@/win';
import BlackCircleIcon from './img/black-circle.png';
import HookIcon from './img/hook.png';
import { addFolderInDeskTop, settingApp } from '@/system-app';
import { Folder } from 'model-core';

import DisplaySettingIcon from './img/display-settings.png';
import PersonaliztionIcon from './img/personalization.png';
import FolderIcon from './img/folder.png';
import ShortcutsIcon from './img/shortcuts.png';
import DocumentIcon from './img/document.png';
import ZipIcon from './img/zip.png';
import WordIcon from './img/word.png';
import ExcelIcon from './img/excel.png';
import PptIcon from './img/ppt.png';
import RtfIcon from './img/rtf.png';
import { deskTopIconMap } from '@/app';

export const { open: openMenu } = createContextMenu();

const contextMenuGroup1 = createContextMenuOptionGroup([
  {
    name: '查看方式',
    subOptions: [
      [
        { name: '大图标(R)' },
        {
          name: '中等图标(M)',
          icon: BlackCircleIcon,
        },
        { name: '小图标(N)' },
      ],
      [{ name: '自动排列图标(A)' }, { name: '将图标与网格对齐(I)', icon: HookIcon }],

      [{ name: '显示桌面图标(D)', icon: HookIcon }],
    ],
  },
  {
    name: '排序方式(D)',
    subOptions: [{ name: '名称' }, { name: '大小' }, { name: '项目类型' }, { name: '修改日期' }],
  },
  { name: '刷新(E)', onClick: () => location.reload() },
]);

export const desktopContextMenuCopyOption = createContextMenuOptionGroup([
  {
    name: '粘贴',
    disabled: true,
  },
  { name: '粘贴快捷方式', disabled: true },
]);

const contextMenuGroup3 = createContextMenuOptionGroup([
  {
    name: '新建(W)',
    subOptions: [
      [
        {
          name: '文件夹(F)',
          onClick() {
            const newFolder = Folder.getDeskTop().addFolder();
            addFolderInDeskTop(newFolder.name);
            const deskTopIconConfig = deskTopIconMap.get(newFolder.name);
            if (deskTopIconConfig) {
              deskTopIconConfig.isEditting = true;
              deskTopIconConfig.isFocus = true;
            }
          },
          icon: FolderIcon,
        },
        { name: '快捷方式(S)', icon: ShortcutsIcon },
      ],
      [
        { name: 'Microsoft Word 文档', icon: WordIcon },
        { name: 'Microsoft PowerPoint 演示文稿', icon: PptIcon },
        { name: 'RTF 格式', icon: RtfIcon },
        { name: '文本文档', icon: DocumentIcon },
        { name: 'Microsoft Excel 工作表', icon: ExcelIcon },
        { name: '压缩文件夹', icon: ZipIcon },
      ],
    ],
  },
]);

const contextMenuGroup4 = createContextMenuOptionGroup([
  { name: '显示设置(D)', icon: DisplaySettingIcon },
  {
    name: '个性化(R)',
    onClick: () => {
      settingApp.open({ route: '个性化' });
    },
    icon: PersonaliztionIcon,
  },
]);

export const contextMenuOptions: ContextMenuProps['options'] = [
  contextMenuGroup1,
  desktopContextMenuCopyOption,
  contextMenuGroup3,
  contextMenuGroup4,
];
