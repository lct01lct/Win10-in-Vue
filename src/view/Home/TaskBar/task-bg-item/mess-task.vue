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
  <Popover :left-margin="-458" animation-dir="left">
    <div class="message-task-container"></div>
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
    width: 500px;
    height: 704px;
    background-color: #3d3d3d;
    opacity: 0.9;
  }

  .message-task {
    width: 36px !important;
  }
</style>
