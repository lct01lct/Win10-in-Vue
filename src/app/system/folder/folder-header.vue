<script lang="ts" setup>
  import { WinApp } from '@/app';
  import { Icon } from '@/components';

  const winApp = inject<WinApp>('appInstance')!;
</script>

<template>
  <div class="folder-header-wrapper">
    <Icon :width="18" :height="18">
      <img :src="winApp._logo" alt="" draggable="false" />
    </Icon>
    <span class="divide-line"></span>
    <Icon :width="18" :height="18" class="header-opt">
      <img src="./img/isFocus.png" draggable="false" />
    </Icon>
    <Icon :width="18" :height="18" class="header-opt">
      <img src="./img/empty-folder.ico" draggable="false" />
    </Icon>
    <Icon :width="18" :height="18" class="header-opt">
      <img
        src="./img/select.png"
        draggable="false"
        style="width: 10px; height: 10px; padding-top: 4px; padding-left: 4px"
      />
    </Icon>
    <span class="divide-line"></span>
    <span class="folder-name">{{ winApp.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .folder-header-wrapper {
    display: flex;
    align-items: center;
    padding-left: 5px;
    .divide-line {
      display: inline-block;
      height: 16px;
      margin: 0 10px;
      border-left: 1px solid #bbb;
    }

    .header-opt {
      border: 1px solid transparent;
      margin-left: 2px;
      &:hover {
        border: 1px solid rgb(0, 255, 255, 0.4);
        background-color: #cce8ff;
      }
    }

    .folder-name {
      font-size: 12px;
    }
  }
</style>
