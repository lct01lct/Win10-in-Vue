<script lang="ts" setup>
  import MenuItem from './menu-item.vue';
  import type { SubscribeResizeMovingType, AppViewSizeOpt } from '@/app';
  import { Desc, Folder, isFile, ORIGIN_MENU_DATA, getDesktopPointer } from 'model-core';
  import quickVisitIcon from './img/quick-visit.png';
  import cDescIcon from './img/C-Desc.png';
  import dDescIcon from './img/D-Desc.png';

  const subscribeResizeMoving = inject<SubscribeResizeMovingType>('subscribeResizeMoving')!;
  const menuHeight = ref<number>(500 - 135);

  subscribeResizeMoving(({ width, height, top, left }: Required<AppViewSizeOpt>) => {
    menuHeight.value = height - 135;
  });

  setTimeout(() => {
    type MenuItem = (Desc | Folder) & {
      icon?: string;
    };

    const deskTopPointer = getDesktopPointer() as MenuItem;
    deskTopPointer.icon = quickVisitIcon;

    const cDesc = Folder.findByPath('C:\\') as MenuItem;
    cDesc.icon = cDescIcon;

    const dDesc = Folder.findByPath('D:\\') as MenuItem;
    dDesc.icon = dDescIcon;
  });

  const leftOffset = 0;
</script>

<template>
  <div class="menu-wrapper">
    <ul class="menu-list" :style="{ height: menuHeight + 'px' }">
      <template v-for="item in ORIGIN_MENU_DATA">
        <MenuItem
          :item="item"
          v-if="!isFile(item) || !item.extension"
          :key="item.name"
          :leftOffset="leftOffset"
          :icon="item.icon"
          :isExpand="true"
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
