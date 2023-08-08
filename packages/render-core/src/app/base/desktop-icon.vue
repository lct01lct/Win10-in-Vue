<script lang="ts" setup>
  import { WinApp, maxAppHeight } from '../.';
  import { FolderApp } from '@/system-app';
  import { deskTopIconMap, resetFocusIcon } from './desktop-icon';
  import { DragBindingValue } from 'utils';
  import EdgeIcon from './img/contextmenu/edge.png';
  import { openMenu, baseOptions } from './desktop-icon-contextmenu';

  const props = defineProps<{ appInstance: WinApp; appIcon: string; appName: string }>();

  const deskIconOpt = deskTopIconMap.get(props.appName);

  const getPosition = () => {
    if (deskIconOpt) {
      const posIdx = deskIconOpt.posIdx;
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
    if (deskIconOpt) {
      deskIconOpt.isFocus = true;
    }
  };

  const onIconDbclick = () => {
    const appInstance = props.appInstance;

    appInstance.open({
      folderName: props.appName,
    });

    // reRender folder
    if (appInstance._isRender && appInstance.name === '文件夹') {
      (appInstance as FolderApp).init?.();
    }

    if (deskIconOpt) {
      deskIconOpt.isFocus = false;
    }
  };

  const onIconContextMenu = (event: MouseEvent) => {
    openMenu({
      props: {
        options: [
          {
            name: '打开',
            onClick() {
              onIconDbclick();
            },
          },
          ...baseOptions,
        ],
        event,
      },
    });

    resetFocusIcon();
    if (deskIconOpt) {
      deskIconOpt.isFocus = true;
    }
  };

  const vDragOpt: DragBindingValue = {};
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
    <span class="app-name" :class="[deskIconOpt?.isFocus ? '' : 'omit']">{{ appName }}</span>
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
    }
    .app-name {
      display: inline-block;
      padding: 0 5px;
      color: #fff;
      font-size: 12px;
      text-align: center;
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
    max-height: 27.6px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
</style>
