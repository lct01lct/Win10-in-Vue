<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { Icon } from '@/components';
  import { maxAppWidth, maxAppHeight } from './base';
  import type { AppViewSizeOpt } from './base';
  import type { WinAppDOM } from '../.';
  import { getWinAppScope, WIN_APP_SCOPE } from '../.';
  import { animation } from 'utils';
  import { removeTaskBarTriggerItem, toggleZIndex } from './taskBar';
  import type { DragBindingValue } from 'utils';
  import type { ResizeMoveingScbscriber } from '../';

  const resizeMovingSubscribers = inject<ResizeMoveingScbscriber[]>('resizeMovingSubscribers');

  const props = defineProps({
    appViewSize: {
      type: Object as PropType<AppViewSizeOpt>,
      required: true,
    },
    appRef: {
      type: Object as PropType<WinAppDOM>,
    },
    isShow: {
      type: Boolean,
      required: true,
    },
    appName: {
      type: String,
    },
    appLogo: {
      type: String,
    },
  });

  const emits = defineEmits(['setAppViewSize', 'update:isShow']);

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
      opacity: [1, 0],
      duration: 300,
      begin() {
        props.appRef!.style.transformOrigin = 'bottom left';
      },
      complete() {
        emits('update:isShow', !props.isShow);
      },
    });
  };

  const onMaximizeBtnClick = () => {
    const { isFull } = getWinAppScope(props.appRef!);
    const params: AppViewSizeOpt = {};
    isFull.value = !isFull.value;
    if (!isFullScreen.value) {
      oldAppViewSize.width = props.appViewSize.width;
      oldAppViewSize.height = props.appViewSize.height;
      oldAppViewSize.left = props.appViewSize.left;
      oldAppViewSize.top = props.appViewSize.top;
      Object.assign(params, { width: maxAppWidth, height: maxAppHeight, top: 0, left: 0 });
    } else {
      Object.assign(params, {
        width: oldAppViewSize.width,
        height: oldAppViewSize.height,
        left: oldAppViewSize.left,
        top: oldAppViewSize.top,
      });
    }
    emits('setAppViewSize', params);
    resizeMovingSubscribers?.map((fn) => {
      fn(params as Required<AppViewSizeOpt>);
    });
  };

  const onCloseBtnClick = () => {
    animation({
      targets: props.appRef,
      opacity: [1, 0],
      scale: [1.0, 0],
      duration: 100,
      complete() {
        const { close, appInstance } = getWinAppScope(props.appRef!);
        close();
        removeTaskBarTriggerItem(appInstance.name);
        appInstance._isRender = false;
      },
    });
  };

  onMounted(async () => {
    await nextTick();
    props.appRef![WIN_APP_SCOPE].onMinimizeBtnClick = onMinimizeBtnClick;
  });

  const vDragOpt: DragBindingValue = {
    tar: '.app-wrapper',
    movedFn(x: number, y: number) {
      emits('setAppViewSize', { left: x, top: y }, true);
    },
    onMousedownCb(tar) {
      toggleZIndex(tar);
    },
  };
</script>

<template>
  <div class="app-header-wrapper" v-drag="vDragOpt" @dblclick="onMaximizeBtnClick">
    <div class="app-header-left-wrapper">
      <slot v-if="$slots.default"></slot>
      <div v-else-if="appName || appLogo" class="app-header-inner">
        <Icon :size="18" v-if="appLogo" :style="{ marginRight: '5px' }">
          <img :src="appLogo" alt="" />
        </Icon>
        <template v-if="appName">
          {{ appName }}
        </template>
      </div>
    </div>
    <div class="app-header-right-wrapper" @mousedown.stop @mouseleave.stop>
      <div class="app-view-opt-item minimize-btn" @click="onMinimizeBtnClick">
        <Icon :height="iconSize" :width="iconSize">
          <img src="./img/minimize.png" />
        </Icon>
      </div>
      <div class="app-view-opt-item maximize-btn" @click="onMaximizeBtnClick">
        <Icon :height="iconSize" :width="iconSize">
          <img v-if="!isFullScreen" src="./img/maximize.png" />
          <img v-else src="./img/restore.png" />
        </Icon>
      </div>
      <div
        class="app-view-opt-item close-btn"
        @click="onCloseBtnClick"
        @mouseenter="closeBtnIsActive = !closeBtnIsActive"
        @mouseleave="closeBtnIsActive = !closeBtnIsActive"
      >
        <Icon :height="iconSize" :width="iconSize">
          <img v-if="!closeBtnIsActive" src="./img/close.png" alt="" />
          <img v-else src="./img/close-active.png" alt="" />
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

  .app-header-inner {
    margin: 0 5px;
    display: flex;
    font-size: 12px;
    align-items: center;
  }
</style>
