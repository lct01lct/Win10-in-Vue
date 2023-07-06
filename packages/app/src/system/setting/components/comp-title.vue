<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="comp-title">{{ title }}</div>
</template>

<style scoped>
  .comp-title {
    margin-top: 40px;
    padding: 20px 0;
    font-size: 22px;
  }
</style>
