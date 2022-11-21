<script lang="ts" setup>
  import { PropType } from 'vue';
  import { WinApp } from '../.';
  import { deskTopIconList } from './desktop-icon';

  const { appInstance } = defineProps({
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

  const getStyles = () => {
    const index = deskTopIconList.findIndex((item) => item.appInstance.name === appInstance.name);
    const posIdx = index > -1 ? deskTopIconList[index].posIdx : 0;

    const deskTopWidth = 1536;
    const deskTopHeight = 704;
    const deskTopPaddingTop = 4;
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
        (posIdx % colMaxCount ? (posIdx % colMaxCount) - 1 : colMaxCount - 1) *
        (iconMarginY + iconSize)
      }px`,
    };
  };
</script>

<template>
  <div class="desktop-icon-wrapper" @dblclick="appInstance.open" :style="getStyles()">
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
    .app-icon {
      width: 50px;
      height: 50px;
    }
    .app-name {
      color: #fff;
      font-size: 12px;
    }
  }
</style>
