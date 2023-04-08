<script lang="ts" setup>
  import { opacity } from '.';
</script>

<template>
  <div class="modal-box-wrapper" :style="{ opacity: opacity }"></div>
</template>

<style scoped lang="scss">
  .modal-box-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 753px;
    background-color: #000;
    z-index: 9999;
    pointer-events: none;
  }
</style>
