<script lang="ts" setup>
  import type { SubscribeResizeMovingType, AppViewSizeOpt } from '@/app';
  import { Icon } from '@/components';

  const subscribeResizeMoving = inject<SubscribeResizeMovingType>('subscribeResizeMoving')!;

  subscribeResizeMoving(({ width, height, top, left }: Required<AppViewSizeOpt>) => {
    let reWidth: number = 0;
    if (width - 300 < 200) {
      reWidth = 200;
    } else {
      reWidth = width - 300;
    }

    iptWidth.value = reWidth;
  });

  const iptWidth = ref<number>(500);
  const isActive = ref<boolean>(false);
</script>

<template>
  <div class="navigation-wrapper">
    <div class="prepend-icon">
      <Icon :width="20" :height="20">
        <img src="@/assets/images/appPage/system-app/folder-app/file-full.png" />
      </Icon>
    </div>
    <input type="text" class="navigation-ipt" :style="{ width: iptWidth + 'px' }" />
    <button class="append-icon" @click="isActive = true" :class="[isActive ? 'isActive' : '']">
      <span class="iconfont icon-xiangxia"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .navigation-wrapper {
    position: relative;
    .prepend-icon {
      position: absolute;
      top: 5px;
      left: 5px;
    }

    .navigation-ipt {
      height: 25px;
      padding-left: 24px;
      border: 1px solid #ccc;
      outline: none;
      font-size: 12px;
      &:focus {
        border: 1px solid #0078d7;
      }
    }

    .append-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      width: 25px;
      height: 27px;
      border: 1px solid transparent;
      background-color: transparent;
    }

    .append-icon:focus,
    .append-icon:hover {
      border: 1px solid #005499;
      background-color: #cce4f7;
    }

    .append-icon:active {
      border: 1px solid #005499;
      background-color: #cce4f7;
    }
  }
</style>
