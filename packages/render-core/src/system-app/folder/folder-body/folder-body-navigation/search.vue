<script lang="ts" setup>
  import { Icon } from '@/components';

  const placeholder = ref<string>('在什么内搜索');
</script>

<template>
  <div class="search-wrapper">
    <input type="text" class="search-ipt" :placeholder="placeholder" />
    <Icon class="search-icon" :height="16" :width="16">
      <img src="../../img/search.png" alt="" />
    </Icon>
  </div>
</template>

<style scoped lang="scss">
  .search-wrapper {
    position: relative;
    margin-left: 40px;
    .search-ipt {
      width: 90px;
      height: 25px;
      padding-left: 24px;
      border: 1px solid #ccc;
      outline: none;
      font-size: 12px;
    }
  }
  .search-icon {
    position: absolute;
    top: 6px;
    left: 5px;
  }
</style>
