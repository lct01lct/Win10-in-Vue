<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
  import { systemTaskIconList } from './taskBar-bg';
  import Popover from '@/components/Popover/index.vue';
  import MessageTask from './task-bg-item/mess-task.vue';
  import TimeTask from './task-bg-item/time-task/index.vue';
</script>

<template>
  <div class="background-task-wrapper">
    <Popover v-for="item in systemTaskIconList" :key="item.className">
      <component :is="item.comp"></component>
      <template #reference>
        <div class="system-task task-bg-item">
          <Icon :width="18" :height="18" v-if="item.tp">
            <img :src="item.tp" alt="" />
          </Icon>
          <div v-else style="font-size: 17px; color: #fff">英</div>
        </div>
      </template>
    </Popover>

    <TimeTask></TimeTask>

    <MessageTask></MessageTask>

    <div class="back-deskTop-item"></div>
  </div>
</template>

<style lang="scss">
  .background-task-wrapper {
    display: flex;
    align-items: center;
    height: 50px;
    .system-task {
      box-sizing: content-box;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .back-deskTop-item {
      width: 5px;
      height: 50px;
      border-left: 1px solid #fff;
    }
    .task-bg-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 50px;

      &:hover {
        background-color: #373838;
      }
    }
  }
</style>
