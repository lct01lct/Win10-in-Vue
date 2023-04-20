<script lang="ts" setup>
  import { Pointer } from '../types';
  import { getAppInstance, isOpenedInDesktop } from '../../../';
  import { terminalList } from '../store';
  import { getDesktopPointer } from 'win10/src/config';
  import TerminalItem from './terminal-item.vue';
  import { scrollToBottom } from 'utils';

  const currPointer = ref<Pointer>();
  const wrapper = ref<HTMLElement>();

  (function init() {
    if (isOpenedInDesktop()) {
      currPointer.value = getDesktopPointer();
    } else {
      currPointer.value = getAppInstance().infoByOpened?.folderPointer;
    }

    // reset when close
    getAppInstance().onClose(() => {
      terminalList.length = 0;
    });
  })();

  const scrollBottom = () => {
    if (wrapper.value) {
      scrollToBottom(wrapper.value);
    }
  };
</script>

<template>
  <div class="terminal-body-wrapper" ref="wrapper">
    <div class="terminal-body-inner">
      <div class="terminal-tip">
        <div>Microsoft Windows [版本 10.0.19044.2006]</div>
        <div>(c) Microsoft Corporation。保留所有权利。</div>
      </div>
      <TerminalItem v-for="item in terminalList" :pointer="currPointer" :item="item"></TerminalItem>
      <TerminalItem :pointer="currPointer" :scrollBottom="scrollBottom"></TerminalItem>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .terminal-body-wrapper {
    overflow: auto;
    height: 100%;
    background-color: #000;
    color: #fff;
    font-weight: 100;
    .terminal-body-inner {
      margin-bottom: 100px;
    }
  }
</style>
