<script lang="ts" setup>
  import { State } from '.';
  import { useZIndex } from 'model-core';
  import { Btn } from '../';
  import { WinCloseBtn } from '@/components';
  import type { DragBindingValue } from 'utils';
  import { useDebounce } from 'utils';

  const props = withDefaults(
    defineProps<{
      title?: string;
      content?: any;
      cancelBtn?: string | boolean;
      confirmBtn?: string | boolean;
      appendTo: HTMLElement | null;
      width?: number;
    }>(),
    {
      width: 400,
      cancelBtn: true,
      confirmBtn: true,
    }
  );

  const zIndexConfig = useZIndex('messageBox');
  const state = ref<State>('none');
  const outerRef = ref<HTMLElement>();

  onMounted(() => {
    const oWrapper = props.appendTo;
    const oOuter = outerRef.value;
    if (oWrapper) {
      if (oOuter) {
        const styles = getComputedStyle(oWrapper);
        oOuter.style.width = styles.width;
        oOuter.style.height = styles.height;
        zIndexConfig.set(oOuter);
      }
    } else {
      throw new Error('MessageBox Comp Error: Please ensure appendTo is a valid value!');
    }
  });

  const ContentVue = () => {
    if (typeof props.content === 'string') {
      return h(
        'div',
        {
          class: 'message-box__custom-content',
        },
        props.content
      );
    } else {
      return props.content;
    }
  };

  const watchStateEvents: ((state: State) => void)[] = [];

  const vDragOpt: DragBindingValue = {
    tar: '.message-box-outer',
  };

  watch(state, (_state) => {
    watchStateEvents.forEach((fn) => fn(_state));
  });

  const isClickOuter = ref(false);

  const { debounced, clearup } = useDebounce(
    () => (isClickOuter.value = false),
    1000,
    () => (isClickOuter.value = true)
  );

  const onOuterClick = debounced;
  const onWrapperClick = () => {
    isClickOuter.value = false;
    clearup();
  };

  onMounted(() => {
    zIndexConfig.remove();
  });

  defineExpose({
    state,
    watchState: (fn: (state: State) => void) => watchStateEvents.push(fn),
  });
</script>

<template>
  <div
    class="message-box-outer"
    ref="outerRef"
    @click.stop="onOuterClick"
    @mouseenter.stop
    @mouseleave.stop
    @mousedown.stop
  >
    <div
      class="meesage-box-wrapper"
      v-drag="vDragOpt"
      :style="{ width: width + 'px' }"
      :class="isClickOuter && 'blink'"
      @click.stop="onWrapperClick"
    >
      <div class="message-box__header">
        <div class="header-title">
          {{ title }}
        </div>
        <WinCloseBtn class="close-btn" @click="state = 'close'"></WinCloseBtn>
      </div>
      <div class="message-box__content">
        <ContentVue></ContentVue>
      </div>
      <div v-if="confirmBtn || cancelBtn" class="message-box__button-group">
        <Btn v-if="confirmBtn" @click="state = 'confirm'" class="message-box__button confirm-btn">
          {{ confirmBtn === true ? '确定' : confirmBtn }}
        </Btn>
        <Btn v-if="cancelBtn" @click="state = 'cancel'" class="message-box__button cancel-btn">
          {{ cancelBtn === true ? '取消' : cancelBtn }}
        </Btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .message-box-outer {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    .meesage-box-wrapper {
      border: 1px solid #000;
      background-color: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #000 !important;

      .message-box__header {
        padding-left: 5px;
        display: flex;
        height: 20px;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
      }

      .message-box__button-group {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-self: flex-end;
        height: 40px;
        background-color: #f0f0f0;

        .message-box__button {
          background-color: #e1e1e1;
          border: 2px solid #0078d7;
          font-size: 12px;
          padding: 0 10px;
        }

        .confirm-btn {
          margin-right: 20px;
        }

        .cancel-btn {
          margin-right: 20px;
        }
      }
    }
  }

  .close-btn {
    height: 20px;
  }

  .blink {
    animation: blink 0.2s infinite steps(1);
  }
  @keyframes blink {
    50% {
      color: transparent;
      border-color: transparent;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
</style>
