<script lang="ts" setup>
  import BaseBody from './base-body.vue';
  import BaseHeader from './base-header.vue';
  import type { AppViewSizeOpt } from './base';
  import animation from '@/share/anime';
  import type { WinApp } from '../.';

  const appRef = ref<WinApp>();

  const appViewSize = reactive<AppViewSizeOpt>({
    width: 1000,
    height: 600,
    top: 50,
    left: 100,
  });

  const getAppStyle = () => {
    return {
      width: appViewSize.width + 'px',
      height: appViewSize.height + 'px',
      left: `${appViewSize.left}px`,
      top: `${appViewSize.top}px`,
    };
  };

  const setAppViewSize = ({ width, height, left, top }: AppViewSizeOpt) => {
    animation({
      targets: appRef.value!,
      width: [appViewSize.width, width ? width : appViewSize.width],
      height: [appViewSize.height, height ? height : appViewSize.height],
      left: [appViewSize.left, left !== undefined ? left : appViewSize.left],
      top: [appViewSize.top, top !== undefined ? top : appViewSize.top],
      duration: 100,
      complete() {
        if (width) appViewSize.width = width;
        if (height) appViewSize.height = height;
        if (left !== undefined) appViewSize.left = left;
        if (top !== undefined) appViewSize.top = top;
      },
    });
  };
</script>

<template>
  <div class="app-wrapper" :style="getAppStyle()" ref="appRef">
    <BaseHeader :appViewSize="appViewSize" @setAppViewSize="setAppViewSize" :appRef="appRef!">
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
    box-sizing: border-box;
    box-shadow: 0 0 4px #848383;
    background-color: #fff;
  }
</style>
