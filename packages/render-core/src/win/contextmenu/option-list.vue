<script lang="ts" setup>
  import { ContextMenuOptionItem } from '.';
  import OptionItem from './option-item.vue';
  import { CSSProperties } from 'vue';
  import { contextmenuZIndex } from 'model-core';

  const optionListRef = shallowRef<HTMLElement>();
  const props = withDefaults(
    defineProps<{
      options: ContextMenuOptionItem[][];
      close: () => void;
      deep?: number;
    }>(),
    {
      deep: 0,
    }
  );

  const style = computed<CSSProperties>(() => {
    return {
      zIndex: contextmenuZIndex + props.deep,
    };
  });

  defineExpose({
    optionListRef,
  });
</script>

<template>
  <div class="option-list" :style="style" ref="optionListRef">
    <template v-for="(opts, idx) in options" :key="idx">
      <OptionItem
        v-if="opts.length"
        v-for="(option, index) in opts"
        :option="option"
        :close="close"
        :deep="deep"
        :key="index"
      ></OptionItem>
      <div class="divider" v-if="idx < options.length - 1"></div>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .option-list {
    position: absolute;
    padding: 2px 0px;
    width: 220px;
    background-color: #eeeeee;
    border: 1px solid #bbb;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
    cursor: default;
  }

  .divider {
    height: 0.5px;
    margin: 2px 10px;
    width: calc(100% - 20px);
    background-color: #aaa;
  }
</style>
