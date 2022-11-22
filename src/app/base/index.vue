<script lang="ts" setup>
  import BaseBody from './base-body.vue';
  import BaseHeader from './base-header.vue';
  import type { AppViewSizeOpt } from './base';
  import { compMap } from './baseApp';
  import animation from '@/share/anime';
  import type { WinAppDOM } from '../.';
  import { WIN_APP_SCOPE, getWinAppScope } from '../.';
  import type { ComputedRef } from 'vue';

  const appRef = ref<WinAppDOM>();
  const isShow = ref<boolean>(true);

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
      appRef.value!.style.transform = 'scale(1.002)';
    } else {
      appRef.value!.style.transform = 'scale(1)';
    }
  };

  const appViewSize = reactive<AppViewSizeOpt>({
    width: 1000,
    height: 600,
    top: 50,
    left: 250,
  });

  const zIndex = inject<ComputedRef<number>>('zIndex')!;

  const getAppStyle = () => {
    return {
      width: appViewSize.width + 'px',
      height: appViewSize.height + 'px',
      left: `${appViewSize.left}px`,
      top: `${appViewSize.top}px`,
      zIndex: zIndex.value,
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
    const { appInstance } = getWinAppScope(appRef.value!);
    const comp = compMap.get(appInstance.name)!;
    compMap.delete(appInstance.name);
    compMap.set(appInstance.name, comp);
  };
</script>

<template>
  <div
    class="app-wrapper"
    :style="getAppStyle()"
    ref="appRef"
    v-show="isShow"
    @click="onAppClick"
    v-resize
  >
    <BaseHeader
      :appViewSize="appViewSize"
      @setAppViewSize="setAppViewSize"
      :appRef="appRef!"
      v-model:isShow="isShow"
    >
      <slot name="header"></slot>
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
  }
</style>
