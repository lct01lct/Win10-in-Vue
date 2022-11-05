<script lang="ts" setup>
  import Popover from '@/components/Popover/index.vue';
  import Icon from '@/components/Icon/index.vue';
</script>

<script lang="ts">
  export default {
    name: 'MessTask',
  };
</script>

<template>
  <Popover :left-margin="-358" animation-dir="left">
    <div class="task-bg-detail message-task-container"></div>
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
    width: 400px;
    height: 704px;
    background-color: #1e1e1e;
    opacity: 0.9;
  }

  .message-task {
    width: 36px !important;
  }
</style>
