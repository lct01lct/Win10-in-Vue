<script lang="ts" setup>
  import { Popover, Icon } from '@/components';
</script>

<template>
  <Popover animation-dir="top">
    <div class="task-bg-item power-task">power</div>
    <template #reference>
      <div class="system-task task-bg-item">
        <Icon :width="18" :height="18">
          <img src="@/assets/images/homePage/taskBar-img/sougou.png" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped lang="scss"></style>
