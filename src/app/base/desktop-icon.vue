<script lang="ts" setup>
  import { PropType } from 'vue';
  import { WinApp } from '../.';
  import { deskTopIconList, resetFocusIcon } from './desktop-icon';

  const props = defineProps({
    appInstance: {
      type: Object as PropType<WinApp>,
      required: true,
    },
    appIcon: {
      type: String,
      required: true,
    },
    appName: {
      type: String,
      required: true,
    },
  });

  const deskIconOpt = deskTopIconList.find((item) => props.appName === item.appName)!;

  const getStyles = () => {
    const posIdx = deskIconOpt.posIdx;

    const deskTopWidth = 1536;
    const deskTopHeight = 704;
    const deskTopPaddingTop = 8;
    const iconMarginX = 2;
    const iconMarginY = 10;
    const iconSize = 76.8;
    const colMaxCount = Math.floor((deskTopHeight - deskTopPaddingTop + iconMarginY) / iconSize);

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

  const onIconClick = () => {
    resetFocusIcon();
    deskIconOpt.isFocus = true;
  };

  const onIconDbclick = () => {
    props.appInstance.open();
    deskIconOpt.isFocus = false;
  };
</script>

<template>
  <div
    class="desktop-icon-wrapper"
    @dblclick="onIconDbclick"
    :style="getStyles()"
    @click.stop="onIconClick"
    :class="[deskIconOpt.isFocus ? 'focus' : '']"
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
