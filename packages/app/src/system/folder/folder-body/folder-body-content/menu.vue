<script lang="ts" setup>
  import { ORIGIN_MENU_DATA } from 'win10/src/config/bin-data';
  import MenuItem from './menu-item.vue';
  import type { SubscribeResizeMovingType, AppViewSizeOpt } from '../../../../';

  const subscribeResizeMoving = inject<SubscribeResizeMovingType>('subscribeResizeMoving')!;
  const menuHeight = ref<number>(500 - 135);

  subscribeResizeMoving(({ width, height, top, left }: Required<AppViewSizeOpt>) => {
    menuHeight.value = height - 135;
  });

  const leftOffset = 0;
</script>

<template>
  <div class="menu-wrapper">
    <ul class="menu-list" :style="{ height: menuHeight + 'px' }">
      <template v-for="item in ORIGIN_MENU_DATA">
        <MenuItem
          :item="item"
          v-if="!item.extensions"
          :key="item.name"
          :leftOffset="leftOffset"
          :icon="item.icon"
        ></MenuItem>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .menu-list {
    padding: 0;
    width: 150px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-bottom: 0;
    .menu-item {
      list-style: none;
      margin-left: 20px;
    }
  }
</style>
