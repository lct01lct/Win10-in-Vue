<script lang="ts" setup>
  import {
    WinApp,
    checkAppisNotFolderApp,
    checkAppisFolderApp,
    deskTopAppList,
    maxAppHeight,
  } from '../.';
  import { FolderApp } from '@/system-app';
  import { deskTopIconMap, resetFocusIcon } from './desktop-icon';
  import { DragBindingValue } from 'utils';
  import { openMenu } from './desktop-icon-contextmenu';
  import EdgeIcon from './img/contextmenu/edge.png';
  import ChromeIcon from './img/contextmenu/chrome.png';
  import { deskTopData, isFolder, renameFolder } from 'model-core';

  const props = defineProps<{
    appInstance: WinApp;
    appIcon: string;
    appName: Ref<string>;
  }>();

  const deskIconOpt = computed(() => {
    const res = deskTopIconMap.get(props.appName.value);
    return res;
  });

  const getPosition = () => {
    if (deskIconOpt.value) {
      const posIdx = deskIconOpt.value.posIdx;
      const deskTopHeight = maxAppHeight;
      const deskTopPaddingTop = 8;
      const iconMarginX = 4;
      const iconMarginY = 15;
      const iconSize = 76.8;
      const colMaxCount = Math.floor(
        (deskTopHeight - deskTopPaddingTop) / (iconSize + iconMarginY)
      );

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
    }
  };

  const styles = computed(() => {
    const pos = getPosition();

    return {
      left: pos?.left || '0px',
      top: pos?.top || '0px',
    };
  });

  const onIconClick = () => {
    resetFocusIcon();
    onIconMouseDown();
  };

  const onIconMouseDown = () => {
    if (deskIconOpt.value) {
      deskIconOpt.value.isFocus = true;
      deskIconOpt.value.isEditting = false;
    }
  };

  const onIconDbclick = () => {
    const appInstance = props.appInstance;

    appInstance.open({
      folderName: props.appName.value,
    });

    // reRender folder
    if (appInstance._isRender && appInstance.name === '文件夹') {
      (appInstance as FolderApp).init?.();
    }

    if (deskIconOpt.value) {
      deskIconOpt.value.isFocus = false;
    }
  };

  const onIconContextMenu = (event: MouseEvent) => {
    openMenu({
      props: {
        options: [
          [
            {
              name: '打开',
              onClick() {
                onIconDbclick();
              },
            },
            {
              name: '打开方式',
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
            { name: '删除快捷方式(D)' },
            {
              name: '重命名(M)',
              onClick() {
                if (deskIconOpt.value) deskIconOpt.value.isEditting = true;
              },
            },
          ],
        ],
        event,
      },
    });

    resetFocusIcon();
    if (deskIconOpt.value) {
      deskIconOpt.value.isFocus = true;
    }
  };

  const vDragOpt: DragBindingValue = {};

  const appTempName = ref(props.appName);

  watch(
    () => deskIconOpt.value?.isEditting,
    () => {
      if (!deskIconOpt.value?.isEditting) {
        appTempName.value = props.appName.value;

        const deskTopItem = deskTopAppList.find((item) => item.name === props.appName.value);

        if (deskTopItem) {
          deskTopItem.displayName = appTempName.value;
        }

        if (deskIconOpt.value) {
          checkAppisNotFolderApp(deskIconOpt.value.appInstance, () => {
            if (deskIconOpt.value) {
              deskIconOpt.value.appInstance.displayName = appTempName.value;
            }
          });
        }
      }
    }
  );

  // Change folderName when rename folder name in desktop
  watch(
    () => props.appName.value,
    (newName, oldName) => {
      if (oldName) {
        checkAppisFolderApp(props.appInstance, () => {
          const folderNode = deskTopData.children.find((item) => {
            return item.name === oldName;
          });

          if (isFolder(folderNode)) {
            renameFolder(folderNode.path, newName);
          }
        });
      }
    }
  );

  const onTextareaEnter = () => {
    if (deskIconOpt.value) {
      deskIconOpt.value.isEditting = false;
    }
  };
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
    :class="[deskIconOpt?.isFocus ? 'focus' : '']"
  >
    <img class="app-icon" :src="appIcon" alt="" draggable="false" />
    <div v-if="deskIconOpt?.isEditting && deskIconOpt?.isFocus" class="app-temp-name">
      <win-textarea
        class="app-name-textarea"
        v-model="appTempName"
        @enter="onTextareaEnter"
      ></win-textarea>
    </div>
    <span v-else class="app-name" :class="[deskIconOpt?.isFocus ? '' : 'omit']">
      {{ appName.value }}
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
