<script lang="ts" setup>
  import { Ref } from 'vue';
  import { Pointer } from '../types';

  const currPointer = inject<Ref<Pointer>>('currPointer');
  const projectCount = computed(() => {
    if (!currPointer) {
      return null;
    } else {
      return currPointer.value.children.length;
    }
  });
</script>

<template>
  <div class="guide-wrapper">{{ Number(projectCount) }}个项目</div>
</template>

<style scoped>
  .guide-wrapper {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 13px;
  }
</style>
