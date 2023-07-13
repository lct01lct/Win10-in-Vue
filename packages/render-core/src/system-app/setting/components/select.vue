<script lang="ts" setup generic="T">
  import { onClickOutside } from '@vueuse/core';

  interface Option {
    value: T;
    label: string;
  }

  defineProps<{ modelValue: T; options: Option[] }>();
  const emits = defineEmits<{
    'update:modelValue': [value: T];
  }>();

  const onItemClick = (item: Option) => {
    emits('update:modelValue', item.value);
    visible.value = false;
  };

  const visible = ref(false);
  const listRef = shallowRef<HTMLElement>();

  const clearup = onClickOutside(listRef, () => {
    visible.value = false;
  });

  onUnmounted(() => {
    clearup?.();
  });
</script>

<template>
  <div class="select" @click="visible = !visible">
    <span class="select__content">{{ modelValue }}</span>
    <span class="iconfont icon-xiangxia"></span>
    <div class="option-list" v-if="visible" ref="listRef">
      <div
        class="option-item"
        :class="{
          active: item.value === modelValue,
        }"
        v-for="item in options"
        @click.stop="onItemClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .select {
    position: relative;
    display: inline-flex;
    width: 300px;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #999999;
    font-size: 14px;
    &:hover {
      border: 3px solid #666666;
    }
    .select__content {
      padding-left: 10px;
    }
    .iconfont {
      padding-right: 10px;
    }
    .option-list {
      top: -3px;
      left: -3px;
      position: absolute;
      width: 306px;
      padding: 5px 0;
      background-color: #e7e7e7;
      box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
      .option-item {
        padding: 10px;
        font-weight: 600;
        &:hover {
          background-color: #d8d8d8;
        }
      }
      .option-item.active {
        background-color: #a6d8ff;
        &:hover {
          background-color: #86c1ef;
        }
      }
    }
  }
</style>
