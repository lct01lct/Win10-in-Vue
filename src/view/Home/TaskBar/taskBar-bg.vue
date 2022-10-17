<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
  import { hour, minute, year, month, date } from '@/share/time';
  import { systemTaskIconList } from './taskBar-bg';
  import Popover from '@/components/Popover/index.vue';
</script>

<template>
  <div class="background-task-wrapper">
    <div class="system-task task-bg-item" v-for="item in systemTaskIconList" :key="item.className">
      <Icon :width="18" :height="18" v-if="item.tp">
        <img :src="item.tp" alt="" />
      </Icon>
      <div v-else style="font-size: 17px; color: #fff">英</div>
    </div>
    <div class="time-task task-bg-item">
      <span>{{ hour }}:{{ minute }}</span>
      <span>{{ year }}-{{ month }}-{{ date }}</span>
    </div>

    <Popover>
      <div>1</div>
      <template #reference>
        <div class="message-task task-bg-item">
          <Icon :width="20" :height="20">
            <img src="@/assets/images/homePage/taskBar-img/message.svg" />
          </Icon>
        </div>
      </template>
    </Popover>

    <div class="back-deskTop-item"></div>
  </div>
</template>

<style lang="scss" scoped>
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
    .message-task {
      width: 36px;
    }
    .time-task {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      color: #fff;
      font-size: 13px;
      > span {
        &:nth-child(2) {
          margin-top: 5px;
        }
      }
    }
  }
</style>
