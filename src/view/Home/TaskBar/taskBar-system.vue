<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
  import {
    systemTaskImgList,
    sysytmTaskIconMouseenterHandler,
    sysytmTaskIconMouseleaveHandler,
  } from './taskBar-system';
</script>

<template>
  <div class="system-task-wrapper">
    <div
      class="system-task-item"
      v-for="(item, index) in systemTaskImgList"
      :key="item.className"
      @mouseenter="sysytmTaskIconMouseenterHandler(index)"
      @mouseleave="sysytmTaskIconMouseleaveHandler(index)"
    >
      <Icon :width="20" :height="20">
        <img :src="item.tp" alt="" v-if="item.show" />
        <img :src="item.tp1" alt="" v-if="!item.show" />
      </Icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .system-task-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .system-task-item {
      display: flex;
      width: 45px;
      height: 50px;
      > .icon {
        height: 50px;
        margin: auto;
      }

      &:hover {
        background-color: #333536;
      }

      &:nth-child(n + 1) {
        margin-left: 3px;
      }
    }
  }
</style>
