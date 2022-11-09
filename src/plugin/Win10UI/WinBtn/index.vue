<script lang="ts" setup>
  const { borderStyle, bgColor, opacity, width, height, color } = defineProps({
    borderStyle: {
      type: String,
      default: 'none',
    },
    bgColor: {
      type: String,
      default: '#edeaea4d',
    },
    opacity: {
      type: String,
      default: '1',
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#fff',
    },
  });

  const getStyle = () => {
    return {
      border: borderStyle,
      backgroundColor: bgColor,
      opacity,
      width: width ? width + 'px' : 'auto',
      height: height ? height + 'px' : 'auto',
      color,
    };
  };
</script>

<script lang="ts">
  export default {
    name: 'WinBtn',
  };
</script>

<template>
  <button class="btn" :style="getStyle()">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  button {
    box-sizing: border-box;
    display: block;
    cursor: pointer;
  }
</style>
