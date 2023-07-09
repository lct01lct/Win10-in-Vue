<script lang="ts" setup>
  import { Icon } from '@/components';
  const closeBtnIsActive = ref(false);
</script>

<script lang="ts"></script>

<template>
  <div
    class="win-close-btn-wrapper close-btn"
    @mouseenter="closeBtnIsActive = !closeBtnIsActive"
    @mouseleave="closeBtnIsActive = !closeBtnIsActive"
    @mousedown.stop
    @mousemove.stop
  >
    <Icon :height="12" :width="12">
      <img v-if="!closeBtnIsActive" src="@/assets/images/base-components/close.png" alt="" />
      <img v-else src="@/assets/images/base-components/close-active.png" alt="" />
    </Icon>
  </div>
</template>

<style scoped lang="scss">
  .win-close-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    &:hover {
      background-color: #e5e5e5;
    }
  }
  .win-close-btn-wrapper.close-btn {
    &:hover {
      background-color: #e81123;
    }
  }
</style>
