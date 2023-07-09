<script lang="ts" setup>
  import { getAppInstance, isOpenedInDesktop } from '@/app';
  import { terminalList, currPointer } from '../store';
  import { getDesktopPointer } from 'model-core';
  import TerminalItem from './terminal-item.vue';
  import { scrollToBottom } from 'utils';

  const wrapper = ref<HTMLElement>();
  const itemVueRef = ref<InstanceType<typeof TerminalItem>>();

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

  const onBodyClick = () => {
    itemVueRef.value?.autoFocus();
  };
</script>

<template>
  <div class="terminal-body-wrapper" ref="wrapper" @click="onBodyClick">
    <div class="terminal-body-inner">
      <div class="terminal-tip">
        <div>Microsoft Windows [版本 10.0.19044.2006]</div>
        <div>(c) Microsoft Corporation。保留所有权利。</div>
      </div>
      <TerminalItem v-for="item in terminalList" :pointer="currPointer" :item="item"></TerminalItem>
      <TerminalItem
        :pointer="currPointer"
        :scrollBottom="scrollBottom"
        ref="itemVueRef"
      ></TerminalItem>
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
