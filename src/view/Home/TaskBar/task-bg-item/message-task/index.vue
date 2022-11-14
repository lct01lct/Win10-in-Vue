<script lang="ts" setup>
  import Popover from '@/components/Popover/index.vue';
  import Icon from '@/components/Icon/index.vue';
  import MessageList from './message-list.vue';
  import Setting from './setting.vue';
</script>

<template>
  <Popover :left-margin="-348" animation-dir="left">
    <div class="task-bg-detail message-task-container">
      <div class="manage-message"><span>管理通知</span></div>
      <MessageList></MessageList>
      <Setting></Setting>
    </div>
    <template #reference>
      <div class="task-bg-item message-task">
        <Icon :width="20" :height="20">
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
  }
</style>
