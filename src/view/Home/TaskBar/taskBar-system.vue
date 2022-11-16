<script lang="ts" setup>
  import { Icon, Popover } from '@/components';
  import {
    systemTaskImgList,
    sysytmTaskIconMouseenterHandler,
    sysytmTaskIconMouseleaveHandler,
  } from './taskBar-system';
</script>

<template>
  <div class="system-task-wrapper">
    <Popover v-for="(item, index) in systemTaskImgList" :key="item.className">
      <component :is="item.contentComp" v-if="item.contentComp"></component>
      <template #reference>
        <div
          class="system-task-item"
          @mouseenter="sysytmTaskIconMouseenterHandler(index)"
          @mouseleave="sysytmTaskIconMouseleaveHandler(index)"
        >
          <Icon :width="20" :height="20">
            <img :src="item.tp" alt="" v-if="item.show" />
            <img :src="item.tp1" alt="" v-if="!item.show" />
          </Icon>
        </div>
      </template>
    </Popover>
  </div>
</template>

<style lang="scss">
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
  .system-task-detail {
    background-color: #1e1e1e;
    opacity: 0.8;
    color: #fff;
  }
</style>
