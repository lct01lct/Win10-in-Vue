<script lang="ts" setup>
  import { Popover, Icon } from '@/components';
</script>

<template>
  <Popover animation-dir="top">
    <div class="task-bg-item power-task">power</div>
    <template #reference>
      <div class="system-task task-bg-item">
        <Icon :width="18" :height="18">
          <img src="@/assets/images/homePage/taskBar-img/power.png" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss">
  .power-task {
    height: 300px !important;
    width: 400px !important;
    background-color: #1e1e1e;
    opacity: 0.9;
  }
</style>
