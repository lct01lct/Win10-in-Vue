<script lang="ts" setup>
  import { Pointer } from '../types';
  import { getAppInstance, isOpenedInDesktop } from '../../../';
  import { getDesktopPointer } from 'win10/src/config';

  const currPointer = ref<Pointer>();

  (function init() {
    if (isOpenedInDesktop()) {
      currPointer.value = getDesktopPointer();
    } else {
      currPointer.value = getAppInstance().infoByOpened?.folderPointer;
    }

    // TODO:

    // console.log(currPointer.value?.path);
  })();
</script>

<template>
  <div class="terminal-body-wrapper">
    <div class="terminal-body-inner">
      <div class="terminal-tip">
        <div>Microsoft Windows [版本 10.0.19044.2006]</div>
        <div>(c) Microsoft Corporation。保留所有权利。</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .terminal-body-wrapper {
    overflow: hidden;
    height: 100%;
    background-color: #000;
    color: #fff;
    font-weight: 100;
  }
</style>
