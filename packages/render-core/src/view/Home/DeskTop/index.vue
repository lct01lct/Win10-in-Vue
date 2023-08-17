<script lang="ts" setup>
  import { DeskTopIcon } from '@/app';
  import { useUserStore } from 'model-core';
  import { CSSProperties } from 'vue';
  import { contextMenuOptions, openMenu } from './contextmenu/';

  const reset = () => {
    DeskTopIcon.resetDeskTopIcon();
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
    <template v-for="comp in DeskTopIcon.DeskTopComponentMap.values()" :key="comp">
      <component :is="comp"></component>
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
