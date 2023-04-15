<script lang="ts" setup>
  import { Ref } from 'vue';

  import { Pointer } from '@/system/folder/types';
  const currPointer = inject<Ref<Pointer>>('currPointer');
</script>

<template>
  <div class="guide-wrapper">{{ currPointer?.children.length }}个项目</div>
</template>

<style scoped>
  .guide-wrapper {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 13px;
  }
</style>
