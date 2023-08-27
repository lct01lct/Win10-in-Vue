<script lang="ts" setup>
  import { DeskTopIcon, folderAndFileDeskTopIconList } from '@/app';
  import { defaultFileNameMap, isFolder, useUserStore } from 'model-core';
  import { CSSProperties } from 'vue';
  import { openMenu } from './contextmenu/';
  import DisplaySettingIcon from './contextmenu/img/display-settings.png';
  import PersonaliztionIcon from './contextmenu/img/personalization.png';
  import FolderIcon from '@/assets/images/file/folder.png';
  import ShortcutsIcon from '@/assets/images/file/shortcuts.png';
  import DocumentIcon from '@/assets/images/file/document.png';
  import ZipIcon from '@/assets/images/file/zip.png';
  import WordIcon from '@/assets/images/file/word.png';
  import ExcelIcon from '@/assets/images/file/excel.png';
  import PptIcon from '@/assets/images/file/ppt.png';
  import RtfIcon from '@/assets/images/file/rtf.png';
  import { settingApp } from '@/system-app';
  import { Folder } from 'model-core';
  import { deskTopIconList, DeskTopIconVue, createFileIconInDeskTop } from '@/app';

  const reset = () => {
    DeskTopIcon.resetDeskTopIcon();
    deskTopIconVueRefs.value.forEach((item) => {
      item.onTextareaEnter();
    });
  };

  const userStore = useUserStore();
  const deskTopIconVueRefs = shallowRef<any[]>([]);

  const wallpaperStyle = computed<CSSProperties>(() => ({
    'background-image': `url(${userStore.user?.wallpaper})`,
  }));

  const onDeskTopContextMenu = (e: MouseEvent) => {
    reset();
    openMenu({
      props: {
        options: [
          [
            {
              name: '查看方式',
              subOptions: [
                [
                  { name: '大图标(R)' },
                  {
                    name: '中等图标(M)',
                    select: true,
                  },
                  { name: '小图标(N)' },
                ],
                [{ name: '自动排列图标(A)' }, { name: '将图标与网格对齐(I)', tick: true }],

                [{ name: '显示桌面图标(D)', tick: true }],
              ],
            },
            {
              name: '排序方式(D)',
              subOptions: [
                { name: '名称' },
                { name: '大小' },
                { name: '项目类型' },
                { name: '修改日期' },
              ],
            },
            { name: '刷新(E)', onClick: () => location.reload() },
          ],
          [
            {
              name: '粘贴',
              disabled: true,
            },
            { name: '粘贴快捷方式', disabled: true },
          ],
          [
            {
              name: '新建(W)',
              subOptions: [
                [
                  {
                    name: '文件夹(F)',
                    onClick() {
                      const newFolder = Folder.getDeskTop().addFolder();
                      const folderIcon = folderAndFileDeskTopIconList.value.find((item) => {
                        return (
                          isFolder(item.originFileOrFolder) &&
                          item.originFileOrFolder.name === newFolder.name
                        );
                      })!;
                      folderIcon.posIdx = DeskTopIcon.computePosIdx(e);
                      folderIcon.isEditting = true;
                      folderIcon.isFocus = true;
                    },
                    icon: FolderIcon,
                  },
                  { name: '快捷方式(S)', icon: ShortcutsIcon },
                ],
                [
                  {
                    name: 'Microsoft Word 文档',
                    icon: WordIcon,
                    onClick() {
                      createFileIconInDeskTop(
                        { name: defaultFileNameMap['docx'], extension: 'docx' },
                        e
                      );
                    },
                  },
                  {
                    name: 'Microsoft PowerPoint 演示文稿',
                    icon: PptIcon,
                    onClick() {
                      createFileIconInDeskTop(
                        { name: defaultFileNameMap['pptx'], extension: 'pptx' },
                        e
                      );
                    },
                  },
                  {
                    name: 'RTF 格式',
                    icon: RtfIcon,
                    onClick() {
                      createFileIconInDeskTop(
                        { name: defaultFileNameMap['rtf'], extension: 'rtf' },
                        e
                      );
                    },
                  },
                  {
                    name: '文本文档',
                    icon: DocumentIcon,
                    onClick() {
                      createFileIconInDeskTop(
                        { name: defaultFileNameMap['txt'], extension: 'txt' },
                        e
                      );
                    },
                  },
                  {
                    name: 'Microsoft Excel 工作表',
                    icon: ExcelIcon,
                    onClick() {
                      createFileIconInDeskTop(
                        { name: defaultFileNameMap['xlsx'], extension: 'xlsx' },
                        e
                      );
                    },
                  },
                  { name: '压缩文件夹', icon: ZipIcon },
                ],
              ],
            },
          ],
          [
            { name: '显示设置(D)', icon: DisplaySettingIcon },
            {
              name: '个性化(R)',
              onClick: () => {
                settingApp.open({ route: '个性化' });
              },
              icon: PersonaliztionIcon,
            },
          ],
        ],
        event: e,
      },
    });
  };
</script>

<template>
  <div
    class="deskTop-wrapper"
    @click="reset"
    :style="wallpaperStyle"
    @contextmenu.stop="onDeskTopContextMenu"
  >
    <DeskTopIconVue
      v-for="item in deskTopIconList"
      :desk-top-icon="item"
      :key="item.id"
      ref="deskTopIconVueRefs"
    ></DeskTopIconVue>
  </div>
</template>

<style scoped>
  .deskTop-wrapper {
    position: relative;
    z-index: auto;
    width: 1536px;
    height: 704px;
    background-repeat: no-repeat;
    background-size: 100vw calc(100vh - 50px);
  }
</style>
