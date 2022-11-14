<script lang="ts" setup>
  import { messageList } from './messages';
</script>

<template>
  <div class="message-list empty" v-if="!messageList.length">没有新通知</div>
  <div class="message-list" v-else></div>
</template>

<style scoped lang="scss">
  .message-list {
    height: 300px;
  }
  .message-list.empty {
    line-height: 300px;
    text-align: center;
    font-weight: 700;
    color: #9f9f9f;
  }
</style>
