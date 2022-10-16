<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
  import { hour, minute, year, month, date } from '@/share/time';
  import { systemTaskIconList } from './taskBar-bg';
</script>

<template>
  <div class="background-task-wrapper">
    <div class="system-task task-bg-item" v-for="item in systemTaskIconList" :key="item.className">
      <Icon :width="18" :height="18" v-if="item.tp">
        <img :src="item.tp" alt="" />
      </Icon>
      <div v-else style="font-size: 17px">英</div>
    </div>
    <div class="time-task task-bg-item">
      <span>{{ hour }}:{{ minute }}</span>
      <span>{{ year }}-{{ month }}-{{ date }}</span>
    </div>
    <div class="message-task task-bg-item">
      <Icon :width="20" :height="20">
        <img src="@/assets/images/homePage/taskBar-img/message.svg" />
      </Icon>
    </div>
    <div class="back-deskTop-item"></div>
  </div>
</template>

<style lang="scss">
  .background-task-wrapper {
    display: flex;
    align-items: center;
    height: 50px;
    color: #fff;
    font-size: 13px;
    > div {
      &:hover {
        background-color: #373838;
      }
    }
    .system-task {
      box-sizing: content-box;
      height: 50px;
      text-align: center;
      line-height: 50px;
      > .icon {
        margin-left: 2px;
        > img {
          display: block;
          margin-top: 17px;
        }
      }
    }
    .back-deskTop-item {
      width: 5px;
      height: 50px;
      border-left: 1px solid #fff;
    }
    .task-bg-item {
      width: 24px;
      height: 50px;
    }
    .message-task {
      width: 36px;
      height: 50px;
      line-height: 50px;
      > .icon {
        margin-left: 8px;
        > img {
          display: block;
          margin-top: 17px;
        }
      }
    }
    .time-task {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      > span {
        &:nth-child(2) {
          margin-top: 5px;
        }
      }
    }
  }
</style>
