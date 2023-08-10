<script lang="ts" setup>
  import { resetFocusIcon } from '@/app';
  import { useUserStore } from 'model-core';
  import { CSSProperties } from 'vue';
  import { deskTopAppList } from '@/app';
  import { contextMenuOptions, openMenu } from './contextmenu/';

  const reset = () => {
    resetFocusIcon();
  };

  const userStore = useUserStore();

  const wallpaperStyle = computed<CSSProperties>(() => ({
    'background-image': `url(${userStore.user?.wallpaper})`,
  }));

  const onDeskTopContextMenu = (e: MouseEvent) => {
    reset();
    openMenu({
      props: {
        options: contextMenuOptions,
        event: e,
      },
    });
  };
</script>

<template>
  <div
    class="deskTop-wrapper"
    @click="reset"
    :style="wallpaperStyle"
    @contextmenu.stop="onDeskTopContextMenu"
  >
    <template v-for="item in deskTopAppList" :key="item.name">
      <component :is="item.comp"></component>
    </template>
  </div>
</template>

<style scoped>
  .deskTop-wrapper {
    position: relative;
    z-index: auto;
    width: 1536px;
    height: 704px;
    background-repeat: no-repeat;
    background-size: 100vw calc(100vh - 50px);
  }
</style>
