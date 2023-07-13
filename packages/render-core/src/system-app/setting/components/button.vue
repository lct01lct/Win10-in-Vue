<script lang="ts" setup></script>

<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .button {
    display: inline-block;
    padding: 5px 30px;
    border: 3px solid transparent;
    background-color: #cccccc;
    font-size: 14px;

    &:hover {
      border: 3px solid #7a7a7a;
    }
  }
</style>
