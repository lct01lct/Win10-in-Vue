<script lang="ts" setup>
  import { Popover, Icon } from '@/components';
  import Container from './container.vue';
</script>

<template>
  <Popover animation-dir="top" :left-margin="-118">
    <Container></Container>
    <template #reference>
      <div class="system-task task-bg-item">
        <Icon :width="18" :height="18">
          <img src="@/assets/images/homePage/taskBar-img/wifi.png" />
        </Icon>
      </div>
    </template>
  </Popover>
</template>

<style scoped></style>
