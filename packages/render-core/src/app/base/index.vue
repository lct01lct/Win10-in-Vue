<script lang="ts" setup>
  import BaseBody from './base-body.vue';
  import BaseHeader from './base-header.vue';
  import { useResize } from './base';
  import type { AppViewSizeOpt } from './base';
  import { animation } from 'utils';
  import type { WinAppDOM } from '../.';
  import { WIN_APP_SCOPE, getAppInstance } from '../.';
  import type { ResizeBindingValue } from 'utils';
  import { taskBarTriggerList } from './taskBar';
  import { toggleZIndex } from './taskBar';
  import { getViewSizeConfig } from './view-config';

  defineProps<{
    appLogo?: string;
    appName?: string;
  }>();

  const appRef = ref<WinAppDOM>();
  const isShow = ref<boolean>(true);
  const appName = inject<string>('appName')!;
  const appClassName = inject<string>('appClassName');
  const appInstance = getAppInstance();
  const viewConfig = getViewSizeConfig(appInstance);

  onMounted(async () => {
    await nextTick();
    appRef.value![WIN_APP_SCOPE].isShow = isShow;

    document.addEventListener('click', HandleAppClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', HandleAppClick);
  });

  const HandleAppClick = (e: MouseEvent) => {
    if (appRef.value!.contains(e.target as HTMLElement)) {
      e.stopPropagation();
      appRef.value!.style.transform = 'scale(1.001)';
    } else {
      appRef.value!.style.transform = 'scale(1)';
    }
  };

  const appViewSize = reactive<AppViewSizeOpt>({
    width: viewConfig.width,
    height: viewConfig.height,
    top: viewConfig.top,
    left: viewConfig.left,
  });

  const getAppStyle = () => {
    const index = taskBarTriggerList.findIndex((item) => item.name === appName);

    return {
      width: appViewSize?.width + 'px',
      height: appViewSize?.height + 'px',
      left: `${appViewSize?.left}px`,
      top: `${appViewSize?.top}px`,
      zIndex: taskBarTriggerList[index]?.zIndex,
    };
  };

  const setAppViewSize = (
    { width, height, left, top }: AppViewSizeOpt,
    immediate: boolean = false
  ) => {
    const animationOpt = {
      targets: appRef.value!,
      width: [appViewSize.width, width !== undefined ? width : appViewSize.width],
      height: [appViewSize.height, height !== undefined ? height : appViewSize.height],
      left: [appViewSize.left, left !== undefined ? left : appViewSize.left],
      top: [appViewSize.top, top !== undefined ? top : appViewSize.top],
      duration: immediate ? 0 : 100,

      complete() {
        if (width !== undefined) appViewSize.width = width;
        if (height !== undefined) appViewSize.height = height;
        if (left !== undefined) appViewSize.left = left;
        if (top !== undefined) appViewSize.top = top;
      },
    } as any;

    animation(animationOpt);
  };

  const onAppClick = () => {
    toggleZIndex(appName);
  };

  const { resizeMovingSubscribers, subscribeResizeMoving } = useResize();

  const vResizeOpt: ResizeBindingValue = {
    movedFn: ({ width, height, left, top }: AppViewSizeOpt) => {
      setAppViewSize({ width, height, left, top }, true);
    },
    border: {
      minWidth: viewConfig.minWidth,
      minHeight: viewConfig.minHeight,
    },
    movingFn: (params: AppViewSizeOpt) => {
      resizeMovingSubscribers.forEach((fn) => {
        fn(params as Required<AppViewSizeOpt>);
      });
    },
    onMousedownCb(tar) {
      toggleZIndex(tar);
    },
  };

  provide('appViewSize', appViewSize);
  provide('subscribeResizeMoving', subscribeResizeMoving);
  provide('resizeMovingSubscribers', resizeMovingSubscribers);
</script>

<template>
  <div
    class="app-wrapper"
    :class="[appClassName]"
    :style="getAppStyle()"
    ref="appRef"
    v-show="isShow"
    @click.stop
    @contextmenu.stop
    @click.capture="onAppClick"
    v-resize="vResizeOpt"
  >
    <BaseHeader
      :appViewSize="appViewSize"
      @setAppViewSize="setAppViewSize"
      :appRef="appRef!"
      v-model:isShow="isShow"
      :appName="appName"
      :appLogo="appLogo"
    >
      <template v-if="$slots.header" #default>
        <slot name="header"></slot>
      </template>
    </BaseHeader>
    <BaseBody>
      <slot name="body"></slot>
    </BaseBody>
  </div>
</template>

<style scoped lang="scss">
  .app-wrapper {
    position: absolute;
    box-shadow: 0 0 4px #848383;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
