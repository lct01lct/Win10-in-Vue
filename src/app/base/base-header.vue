<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { Icon } from '@/components';
  import { maxAppWidth, maxAppHeight } from './base';
  import type { AppViewSizeOpt } from './base';
  import type { WinAppDOM } from '../.';
  import { getWinAppScope } from '../.';
  import animation from '@/share/anime';

  const props = defineProps({
    appViewSize: {
      type: Object as PropType<AppViewSizeOpt>,
      required: true,
    },
    appRef: {
      type: Object as PropType<WinAppDOM>,
    },
  });

  const emits = defineEmits(['setAppViewSize']);

  const iconSize = 12;
  const closeBtnIsActive = ref(false);
  const isFullScreen = computed<boolean>(
    () =>
      props.appViewSize.width === maxAppWidth &&
      props.appViewSize.height === maxAppHeight &&
      props.appViewSize.top === 0 &&
      props.appViewSize.left === 0
  );

  const oldAppViewSize: AppViewSizeOpt = {
    width: props.appViewSize.width,
    height: props.appViewSize.height,
    left: props.appViewSize.left,
    top: props.appViewSize.top,
  };

  const onMinimizeBtnClick = () => {
    animation({
      targets: props.appRef,
      scale: [1, 0],
      duration: 300,
      begin() {
        props.appRef!.style.transformOrigin = 'bottom left';
      },
    });
  };

  const onMaximizeBtnClick = () => {
    if (!isFullScreen.value) {
      oldAppViewSize.width = props.appViewSize.width;
      oldAppViewSize.height = props.appViewSize.height;
      oldAppViewSize.left = props.appViewSize.left;
      oldAppViewSize.top = props.appViewSize.top;
      emits('setAppViewSize', { width: maxAppWidth, height: maxAppHeight, top: 0, left: 0 });
    } else {
      emits('setAppViewSize', {
        width: oldAppViewSize.width,
        height: oldAppViewSize.height,
        left: oldAppViewSize.left,
        top: oldAppViewSize.top,
      });
    }
  };

  const onCloseBtnClick = () => {
    animation({
      targets: props.appRef,
      opacity: [1, 0],
      scale: [1.0, 0.6],
      duration: 100,
      complete() {
        const { close } = getWinAppScope(props.appRef!);
        close();
      },
    });
  };
</script>

<template>
  <div class="app-header-wrapper">
    <div class="app-header-left-wrapper">
      <slot></slot>
    </div>
    <div class="app-header-right-wrapper">
      <div class="app-view-opt-item minimize-btn" @click="onMinimizeBtnClick">
        <Icon :height="iconSize" :width="iconSize">
          <img src="@/assets/images/appPage/baseApp/minimize.png" />
        </Icon>
      </div>
      <div class="app-view-opt-item maximize-btn" @click="onMaximizeBtnClick">
        <Icon :height="iconSize" :width="iconSize">
          <img v-if="!isFullScreen" src="@/assets/images/appPage/baseApp/maximize.png" />
          <img v-else src="@/assets/images/appPage/baseApp/restore.png" />
        </Icon>
      </div>
      <div
        class="app-view-opt-item close-btn"
        @click="onCloseBtnClick"
        @mouseenter="closeBtnIsActive = !closeBtnIsActive"
        @mouseleave="closeBtnIsActive = !closeBtnIsActive"
      >
        <Icon :height="iconSize" :width="iconSize">
          <img v-if="!closeBtnIsActive" src="@/assets/images/appPage/baseApp/close.png" alt="" />
          <img v-else src="@/assets/images/appPage/baseApp/close-active.png" alt="" />
        </Icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .app-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;

    .app-header-right-wrapper {
      display: flex;
      height: 30px;
      .app-view-opt-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        &:hover {
          background-color: #e5e5e5;
        }
      }
      .app-view-opt-item.close-btn {
        &:hover {
          background-color: #e81123;
        }
      }
    }
  }
</style>
