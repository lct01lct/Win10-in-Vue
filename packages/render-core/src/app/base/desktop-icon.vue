<script lang="ts" setup>
  import { WinApp, maxAppHeight } from '../.';
  import { FolderApp } from '@/system-app';
  import { deskTopIconMap, resetFocusIcon } from './desktop-icon';

  const props = defineProps<{ appInstance: WinApp; appIcon: string; appName: string }>();

  const deskIconOpt = deskTopIconMap.get(props.appName);

  const getPosition = () => {
    if (deskIconOpt) {
      const posIdx = deskIconOpt.posIdx;
      const deskTopHeight = maxAppHeight;
      const deskTopPaddingTop = 8;
      const iconMarginX = 2;
      const iconMarginY = 10;
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
</script>

<template>
  <div
    class="desktop-icon-wrapper"
    @dblclick="onIconDbclick"
    :style="styles"
    @click.stop="onIconClick"
    :class="[deskIconOpt?.isFocus ? 'focus' : '']"
  >
    <img class="app-icon" :src="appIcon" alt="" draggable="false" />
    <span class="app-name">{{ appName }}</span>
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
    height: 76.8px;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: default;
    .app-icon {
      width: 50px;
      height: 50px;
    }
    .app-name {
      color: #fff;
      font-size: 12px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #ddd;
    }
  }
  .desktop-icon-wrapper.focus {
    background: rgba(195, 234, 247, 0.3);
    border: 1px solid #ddd;
  }
</style>
