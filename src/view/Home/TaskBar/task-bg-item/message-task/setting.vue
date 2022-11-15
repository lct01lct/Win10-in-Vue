<script lang="ts" setup>
  import { Progess } from '@/components';

  const progessVal = ref(100);
</script>

<template>
  <div class="setting-wrapper">
    <div class="setting-header">折叠</div>
    <div class="setting-list"></div>
    <div class="setting-brightness">
      <!-- <Progess v-model="progessVal"></Progess> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
  .setting-wrapper {
    margin-top: 20px;
    padding: 20px;
  }
</style>
