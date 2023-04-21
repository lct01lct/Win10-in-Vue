<script lang="ts" setup>
  import { Pointer } from '../types';
  import { addNewTerminalItem, TerminalItem, terminalList } from '../store';
  import { getAnswer } from '../core';
  import { handleKeyCode, sleep } from 'utils';

  type handlerMapKey = ReturnType<typeof handleKeyCode>;

  const props = defineProps<{
    pointer?: Pointer;
    item?: TerminalItem;
  }>();

  const iptVal = ref<string>('');
  const iptRef = ref<HTMLElement>();
  const attrs: { scrollBottom?: () => void } = useAttrs();
  let cacheIndex: number = 0; // 记录索引，按 up 键可以获取已访问的命令

  const _list = computed<string[]>(() => {
    const list = terminalList.map((item) => item.input);
    list.push(''); // list 最后一项为缓存

    return list;
  });

  const onIptMouseenter = async (e: KeyboardEvent) => {
    const res = handleKeyCode(e.keyCode);
    const handleEnter = async () => {
      if (props.pointer) {
        addNewTerminalItem({
          input: iptVal.value,
          output: getAnswer(props.pointer.path, iptVal.value),
        });
        iptVal.value = '';
        await nextTick();
        attrs.scrollBottom?.();
        cacheIndex = terminalList.length;
      }
    };

    const handleUp = () => {
      e.preventDefault();
      if (cacheIndex) {
        iptVal.value = _list.value[--cacheIndex];
      }
    };

    const handleDown = () => {
      e.preventDefault();
      if (cacheIndex <= terminalList.length - 1) {
        iptVal.value = _list.value[++cacheIndex];
      }
    };

    const handlerMap: Partial<Record<handlerMapKey, () => void>> = {
      enter: handleEnter,
      up: handleUp,
      down: handleDown,
    };

    const handleOther = async () => {
      await sleep(0);
      if (iptVal.value) {
        cacheIndex = _list.value.length - 1;
        _list.value[_list.value.length - 1] = iptVal.value;
      }
    };

    const resHandler = handlerMap[res];
    if (resHandler) {
      resHandler();
    } else {
      handleOther();
    }
  };

  const autoFocus = () => {
    iptRef.value?.focus();
  };

  onMounted(async () => {
    await nextTick();
    autoFocus();
  });

  defineExpose({
    autoFocus,
  });
</script>

<template>
  <div class="terminal-item">
    <div class="qustion-wrapper" v-if="pointer">
      <span class="current-path">
        {{ pointer.path }}
        <span style="transform: scale(1.2); display: inline-block; margin-right: 5px">></span>
      </span>
      <span v-if="item" class="qustion">{{ item.input }}</span>
      <input
        v-else
        class="ipt"
        type="text /"
        v-model="iptVal"
        @keydown="onIptMouseenter"
        ref="iptRef"
      />
    </div>
    <div class="answer" v-if="item">
      {{ item.output }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .terminal-item {
    margin-top: 24px;
    .qustion-wrapper {
      display: flex;
      .ipt {
        flex: 1;
        background-color: transparent;
        border: 0;
        outline: none;
        color: #fff;
        font-weight: 100;
      }
    }
  }
</style>
