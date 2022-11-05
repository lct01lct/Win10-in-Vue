<script lang="ts" setup>
  import { Popover, Icon, Progess } from '@/components';

  enum PowerStatus {
    '节点模式',
    '最长的续航',
    '更好的性能',
    '最佳性能',
  }

  const powerStatus = ['节点模式', '最长的续航', '更好的性能', '最佳性能'];
</script>

<template>
  <Popover animation-dir="top" :left-margin="-165">
    <div class="task-bg-detail power-task">
      power
      <Progess :steps="powerStatus" :show-text="true"></Progess>
    </div>
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
    width: 365px !important;
    height: 250px !important;
    background-color: #1e1e1e !important;
    opacity: 0.9;
  }
</style>
