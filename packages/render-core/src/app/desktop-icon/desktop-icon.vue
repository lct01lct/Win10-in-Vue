<script lang="ts" setup>
  import { checkAppisFolderApp, maxAppHeight, checkAppIsFileApp } from '../.';
  import { FolderApp } from '@/system-app';
  import { DeskTopIcon } from './desktop-icon';
  import { DragBindingValue } from 'utils';
  import { openMenu } from './desktop-icon-contextmenu';
  import EdgeIcon from './img/edge.png';
  import ChromeIcon from './img/chrome.png';
  import {
    deskTopData,
    isFolder,
    useDownloadAppStore,
    deleteFolder,
    isFile,
    CustomFileList,
  } from 'model-core';
  import { R_RemoveDownloadedApp } from 'model-core';
  import {
    DESKTOP_ICON_MARGINX,
    DESKTOP_ICON_MARGINY,
    DESKTOP_ICON_PADDING_TOP,
    DESKTOP_ICON_SIZE,
  } from './config';

  const props = defineProps<{
    deskTopIcon: DeskTopIcon;
  }>();

  const downloadAppStore = useDownloadAppStore();

  const getPosition = () => {
    const posIdx = props.deskTopIcon.posIdx;
    const deskTopHeight = maxAppHeight;
    const deskTopPaddingTop = DESKTOP_ICON_PADDING_TOP;
    const iconMarginX = DESKTOP_ICON_MARGINX;
    const iconMarginY = DESKTOP_ICON_MARGINY;
    const iconSize = DESKTOP_ICON_SIZE;
    const colMaxCount = Math.floor((deskTopHeight - deskTopPaddingTop) / (iconSize + iconMarginY));

    return {
      left: `${
        Math.floor(posIdx % colMaxCount ? posIdx / colMaxCount : posIdx / colMaxCount - 1) *
        (iconMarginX + iconSize)
      }px`,
      top: `${
        deskTopPaddingTop +
        (posIdx % colMaxCount ? (posIdx % colMaxCount) - 1 : colMaxCount - 1) *
          (iconMarginY + iconSize)
      }px`,
    };
  };

  const styles = computed(() => {
    const pos = getPosition();

    return {
      left: pos?.left || '0px',
      top: pos?.top || '0px',
    };
  });

  const onIconClick = () => {
    DeskTopIcon.resetDeskTopIcon();
    onIconMouseDown();
  };

  const onIconMouseDown = () => {
    props.deskTopIcon.isFocus = true;
    props.deskTopIcon.isEditting = false;
  };

  const onIconDbclick = () => {
    const appInstance = props.deskTopIcon.reference;

    appInstance.open({
      folderName: props.deskTopIcon.displayName,
    });

    // reRender folder
    if (appInstance._isRender && checkAppisFolderApp(appInstance)) {
      (appInstance as FolderApp).init?.();
    }

    props.deskTopIcon.isFocus = false;
  };

  const onIconContextMenu = (event: MouseEvent) => {
    openMenu({
      props: {
        options: [
          [
            {
              name: '打开(O)',
              onClick() {
                onIconDbclick();
              },
              bold: true,
            },
            {
              name: '打开方式(H)',
              onClick() {},
              subOptions: [
                { name: 'Google chrome', icon: ChromeIcon },
                { name: 'Microsoft edge', icon: EdgeIcon },
                { name: '选择其他应用' },
              ],
            },
          ],
          [{ name: '剪切(T)' }, { name: '复制(C)' }],
          [
            {
              name: '删除(D)',
              onClick() {
                const appInstance = props.deskTopIcon.reference;

                if (appInstance) {
                  if (checkAppisFolderApp(appInstance)) {
                    const folderNode = deskTopData.children.find((item) => {
                      return item.name === props.deskTopIcon.displayName;
                    });

                    if (isFolder(folderNode)) {
                      deleteFolder(folderNode.path);
                    }
                  } else if (checkAppIsFileApp(appInstance)) {
                    const fileNode = deskTopData.children.find((item) => {
                      return isFile(item) && item.fullName === props.deskTopIcon.displayName;
                    });

                    if (isFile(fileNode)) {
                      deskTopData.removeFile(fileNode);
                    }
                  } else if (!appInstance.isFromSystem) {
                    const downloadedApp = downloadAppStore.downloadAppList;
                    const downloadId = downloadedApp.find(
                      (item) => item.name === appInstance.name
                    )?._id;

                    if (downloadId) {
                      R_RemoveDownloadedApp(downloadId);
                    }
                  }

                  props.deskTopIcon.removeDeskTopIcon();
                }
              },
            },
            {
              name: '重命名(M)',
              onClick() {
                appTempName.value = props.deskTopIcon.displayName;
                props.deskTopIcon.isEditting = true;
                props.deskTopIcon.isFocus = true;
              },
            },
          ],
          [{ name: '属性(R)' }],
        ],
        event,
      },
    });

    DeskTopIcon.resetDeskTopIcon();
    if (props.deskTopIcon) {
      props.deskTopIcon.isFocus = true;
    }
  };

  const vDragOpt: DragBindingValue = {};

  const appTempName = ref(props.deskTopIcon.displayName);

  watch(
    () => props.deskTopIcon.displayName,
    (val) => {
      appTempName.value = val;
    }
  );

  const onTextareaEnter = () => {
    if (!appTempName.value) {
      appTempName.value = props.deskTopIcon.displayName;
    }

    if (props.deskTopIcon.isEditting) {
      const originName = props.deskTopIcon.displayName;

      if (checkAppisFolderApp(props.deskTopIcon.reference)) {
        const oldFolder = deskTopData.children.find(
          (item) => isFolder(item) && item.name === originName
        );

        if (oldFolder) {
          if (appTempName.value) {
            oldFolder.name = appTempName.value;
            const newFolder = oldFolder;
            props.deskTopIcon.displayName = newFolder.name;
          }
        }
      } else if (checkAppIsFileApp(props.deskTopIcon.reference)) {
        const oldFile = deskTopData.children.find(
          (item) =>
            isFile(item) &&
            item.fullName === originName &&
            (item.fullName.split('.')[1] ?? '') === item.extension
        );

        if (isFile(oldFile)) {
          const oldExt = oldFile.extension;
          oldFile.fullName = appTempName.value;

          const newFile = oldFile;
          if (oldExt !== newFile.extension) {
            const FileClass = CustomFileList.find((item) => {
              return newFile.extension === item.prototype.extension;
            });

            if (FileClass) {
              const newIcon = FileClass.prototype.defaultIcon;
              Object.setPrototypeOf(newFile, FileClass.prototype);
              newFile.icon = newIcon;
              props.deskTopIcon.icon = newIcon;
            }
          }

          props.deskTopIcon.displayName = newFile.fullName;
        }
      }

      props.deskTopIcon.displayName = appTempName.value;
      props.deskTopIcon.isEditting = false;
    }
  };

  defineExpose({
    onTextareaEnter: onTextareaEnter,
  });
</script>

<template>
  <div
    v-drag="vDragOpt"
    class="desktop-icon-wrapper"
    @dblclick="onIconDbclick"
    @contextmenu.stop="onIconContextMenu"
    :style="styles"
    @click.stop="onIconClick"
    @mousedown.stop="onIconMouseDown"
    :class="[deskTopIcon.isFocus ? 'focus' : '']"
  >
    <img class="app-icon" :src="deskTopIcon.icon" alt="" draggable="false" />
    <div v-if="deskTopIcon.isEditting && deskTopIcon.isFocus" class="app-temp-name">
      <win-textarea
        class="app-name-textarea"
        v-model="appTempName"
        @enter="onTextareaEnter"
      ></win-textarea>
    </div>
    <span v-else class="app-name" :class="[deskTopIcon.isFocus ? '' : 'omit']">
      {{ deskTopIcon.displayName }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  .desktop-icon-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 76.8px;
    padding: 5px 0px;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: default;
    z-index: 1;
    .app-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }
    .app-temp-name {
      .app-name-textarea {
        font-size: 12px;
        line-height: 12px;
        max-width: calc(76.8px - 2 * 5px);
      }
    }

    .app-name {
      display: inline-block;
      padding: 0 4px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      max-width: 66.8px;
      min-height: 16px;
      word-break: break-word;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #ddd;
    }
  }
  .desktop-icon-wrapper.focus {
    background: rgba(195, 234, 247, 0.3);
    border: 1px solid #ddd;
    z-index: 2;
  }

  .desktop-icon-wrapper .omit {
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 29.7px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    word-break: break-word;
  }
</style>
