import { ContextMenuProps, createContextMenu } from '@/win';
import FolderIcon from '@/assets/images/file/folder.png';
import ShortcutsIcon from '@/assets/images/file/shortcuts.png';
import DocumentIcon from '@/assets/images/file/document.png';
import ZipIcon from '@/assets/images/file/zip.png';
import WordIcon from '@/assets/images/file/word.png';
import ExcelIcon from '@/assets/images/file/excel.png';
import PptIcon from '@/assets/images/file/ppt.png';
import RtfIcon from '@/assets/images/file/rtf.png';
import { currPointer, clearSelectedFoldersAndFiles } from '../../../folder';

export const { open: openWrapperContextMenu } = createContextMenu();

export const wrapperContextmenuOptions: ContextMenuProps['options'] = [
  [
    {
      name: '查看(V)',
      subOptions: [
        { name: '超大图标(X)' },
        { name: '大图标(R)' },
        { name: '中等图标(M)' },
        { name: '小图标(N)' },
        { name: '列表(L)' },
        { name: '详细信息(D)', select: true },
        { name: '平铺(S)' },
        { name: '内容(T)' },
      ],
    },
    {
      name: '排序方式(O)',
      subOptions: [
        [{ name: '名称', select: true }, { name: '修改日期' }, { name: '大小' }, { name: '名称' }],
        [{ name: '递增(A)', select: true }, { name: '递减(D)' }],
        [{ name: '更多(M)...' }],
      ],
    },
    {
      name: '分组依据(P)',
      subOptions: [
        [{ name: '名称' }, { name: '修改日期' }, { name: '大小' }, { name: '名称' }],
        [
          { name: '递增(A)', disabled: true },
          { name: '递减(D)', disabled: true },
        ],
        [{ name: '更多(M)...' }],
      ],
    },
    { name: '刷新(E)' },
  ],
  [{ name: '自定义文件夹(F)...' }],
  [
    { name: '粘贴(P)', disabled: true },
    { name: '粘贴快捷方式(S)', disabled: true },
    { name: '撤销 删除(U)' },
  ],
  [{ name: '授予访问权限(G)' }],
  [
    {
      name: '新建(W)',
      subOptions: [
        [
          {
            name: '文件夹(F)',
            onClick() {
              const newFolder = currPointer.value?.addFolder('新建文件夹');
              if (newFolder) {
                clearSelectedFoldersAndFiles();
                newFolder.isEditting = true;
                newFolder.isFocus = true;
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
  ],
  [{ name: '属性(R)' }],
];
