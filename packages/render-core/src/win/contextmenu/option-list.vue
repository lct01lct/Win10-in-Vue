<script lang="ts" setup>
  import { ContextMenuOptionItem } from '.';
  import OptionItem from './option-item.vue';
  import { CSSProperties } from 'vue';
  import { contextmenuZIndex } from 'model-core';

  const optionListRef = shallowRef<HTMLElement>();
  const props = withDefaults(
    defineProps<{
      options: ContextMenuOptionItem[];
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
    <OptionItem
      v-if="options.length"
      v-for="(option, index) in options"
      :option="option"
      :close="close"
      :deep="deep"
      :key="index"
    ></OptionItem>
  </div>
</template>

<style scoped lang="scss">
  .option-list {
    position: absolute;
    padding: 2px 0px;
    width: 220px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    cursor: default;
    .option-item {
      position: relative;
      justify-content: flex-start;
      display: flex;
      align-items: center;
      padding: 2px 10px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      &:hover {
        background-color: #ffffff;
      }
      .option-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        .option-img {
          width: 100%;
          height: 100%;
        }
      }

      .option-more {
        margin-left: auto;
        color: #390000;
        font-size: 14px;
      }
    }
  }
</style>
