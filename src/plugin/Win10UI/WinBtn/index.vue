<script lang="ts" setup></script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  button {
    box-sizing: border-box;
    height: 34px;
    border: 2px solid #e6e6e6;
    background-color: #99977e;
    cursor: pointer;
    color: #fff;
  }
</style>
