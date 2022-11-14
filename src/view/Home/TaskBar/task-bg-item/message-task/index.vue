<script lang="ts" setup>
  import Popover from '@/components/Popover/index.vue';
  import Icon from '@/components/Icon/index.vue';
  import MessageList from './message-list.vue';
  import Setting from './setting.vue';
  import { setAllMessageIsSeen, isNotSeenCount } from './messages';

  const onPopoverOpen = () => {
    console.log(1);
    setAllMessageIsSeen();
  };
</script>

<template>
  <Popover :left-margin="-348" animation-dir="left" @open="onPopoverOpen">
    <div class="task-bg-detail message-task-container">
      <div class="manage-message"><span>管理通知</span></div>
      <MessageList></MessageList>
      <Setting></Setting>
    </div>
    <template #reference>
      <div class="task-bg-item message-task">
        <Icon v-if="isNotSeenCount" :width="28" :height="20">
          <img src="@/assets/images/homePage/taskBar-img/hasMessage.png" alt="" />
          <i class="is-not-seen-count">{{ isNotSeenCount }}</i>
        </Icon>
        <Icon v-else :width="20" :height="20">
          <img src="@/assets/images/homePage/taskBar-img/message.svg" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss">
  .message-task-container {
    width: 390px;
    height: 704px;
    background-color: #1e1e1e;
    opacity: 0.9;
    .manage-message {
      padding: 20px;
      color: #99c6e9;
      font-size: 13px;
      text-align: right;
    }
  }

  .message-task {
    width: 36px !important;
    position: relative;
    .is-not-seen-count {
      display: inline-block;
      position: absolute;
      right: 2px;
      bottom: 6px;
      width: 15px;
      height: 15px;
      background-color: #000;
      color: #fff;
      opacity: 0.8;
      border: 1px solid #fff;
      border-radius: 50%;
      text-indent: 2px;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>
