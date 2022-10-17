<script lang="ts" setup>
  defineProps({
    className: {
      type: String,
      default: 'icon',
    },
    width: {
      type: Number,
      default: 25,
    },
    height: {
      type: Number,
      default: 25,
    },
  });
</script>

<template>
  <div alt="" :class="className + ' system-icon'" :style="`width: ${width}px; height: ${height}px`">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .system-icon {
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
