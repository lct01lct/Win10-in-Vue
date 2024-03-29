<script lang="ts" setup>
  import { Desc, Extension, Files, Folder, isFile, isFolder } from 'model-core';
  import { Icon } from '@/components';
  import { openPointerContextMenu } from './contextmenu/table-item-contextmenu';
  import { clearSelectedFoldersAndFiles } from '../../folder';
  import DocumentIcon from '@/assets/images/file/document.png';
  import WordIcon from '@/assets/images/file/word.png';
  import ExcelIcon from '@/assets/images/file/excel.png';
  import PptIcon from '@/assets/images/file/ppt.png';
  import RtfIcon from '@/assets/images/file/rtf.png';

  const fileIconMap: Record<Extension, string> = {
    docx: WordIcon,
    '': DocumentIcon,
    xlsx: ExcelIcon,
    pptx: PptIcon,
    txt: DocumentIcon,
    rtf: RtfIcon,
  };

  const props = defineProps<{
    item: Files | Folder;
    headerItemsConfig: {
      title: string;
      width: number;
      className: string;
    }[];
  }>();

  const getItemName = () => {
    const folderOrFile = props.item;
    if (isFolder(folderOrFile)) {
      return folderOrFile.name;
    } else {
      return folderOrFile.fullName;
    }
  };

  const folderOrFileTempName = ref(getItemName());

  const setCurrPointer = inject<(currPointer: Folder | Desc) => void>('setCurrPointer');
  const onTextareaEnter = () => {
    if (props.item.isEditting) {
      const currItem = props.item;
      if (isFolder(currItem)) {
        currItem.name = folderOrFileTempName.value;
      } else {
        currItem.fullName = folderOrFileTempName.value;
      }
      currItem.isEditting = false;
    }
  };

  const onItemContextMenu = (event: MouseEvent) => {
    clearSelectedFoldersAndFiles();
    props.item.isFocus = true;

    openPointerContextMenu({
      props: {
        options: [
          [
            {
              name: '打开(O)',
              bold: true,
              onClick() {
                onItemDblClick();
              },
            },
            { name: '在新窗口中打开(E)' },
            { name: '固定到快速访问' },
          ],
          [{ name: '剪切(T)' }, { name: '复制(C)' }],
          [
            { name: '创建快捷方式(S)' },
            {
              name: '删除(D)',
              onClick() {
                if (isFile(props.item)) {
                  props.item.parent?.removeFile(props.item);
                } else {
                  props.item.parent?.removeFolder(props.item);
                }
              },
            },
            {
              name: '重命名(M)',
              onClick() {
                props.item.isEditting = true;
                props.item.isFocus = true;
                folderOrFileTempName.value = getItemName();
              },
            },
          ],
          [{ name: '属性(R)' }],
        ],
        event,
      },
    });
  };

  const onItemDblClick = () => {
    if (isFile(props.item)) {
      // parse TODO:
      alert(`当前功能暂未实现，敬请期待`);
    } else {
      if (props.item && setCurrPointer) {
        setCurrPointer(props.item);
      }
    }
  };

  const onItemClick = () => {
    clearSelectedFoldersAndFiles();
    props.item.isFocus = true;
  };

  defineExpose({
    renameFolderOrFile: onTextareaEnter,
  });
</script>

<template>
  <div
    class="folder-content-table-row"
    @click.stop="onItemClick"
    @dblclick.stop="onItemDblClick"
    @contextmenu.stop="onItemContextMenu"
  >
    <td
      class="folder-content-table-cell name"
      :style="{ width: headerItemsConfig[0].width + 'px' }"
    >
      <Icon :height="20" :width="20" :style="{ marginRight: '4px' }">
        <img v-if="isFile(item)" :src="fileIconMap[item.extension]" />
        <img
          v-else-if="isFolder(item) && !item.children.length"
          src="../../img/file-empty.png"
          alt=""
        />
        <img
          v-else-if="isFolder(item) && item.children.length"
          src="../../img/file-full.png"
          alt=""
        />
      </Icon>

      <span class="folder-name" v-if="!item?.isEditting">
        {{ isFolder(item) ? item.name : item.fullName }}
      </span>
      <win-textarea
        v-else
        class="app-name-textarea"
        v-model="folderOrFileTempName"
        @enter="onTextareaEnter"
        :autoFocus="(str: string) => [0, str.lastIndexOf('.')]"
      ></win-textarea>
    </td>
    <td class="folder-content-table-cell" :style="{ width: headerItemsConfig[1].width + 'px' }">
      {{ item.createdAt }}
    </td>
    <td class="folder-content-table-cell" :style="{ width: headerItemsConfig[2].width + 'px' }">
      {{ isFile(item) ? item.extension : '文件夹' }}
    </td>
    <td class="folder-content-table-cell" :style="{ width: headerItemsConfig[3].width + 'px' }">
      {{ parseInt(item.size) + 'kb' }}
    </td>
  </div>
</template>

<style scoped lang="scss">
  .folder-content-table-row {
    height: 20px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
  }

  .folder-content-table-cell.name {
    padding-left: 10px;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    color: #000;
  }

  .folder-name {
    padding-left: 2.8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 190px;
  }
</style>
