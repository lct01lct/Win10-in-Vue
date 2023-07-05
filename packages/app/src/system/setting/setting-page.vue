<script lang="ts" setup>
  import { setPageRoute } from './route';
  import { SettingPageOptionItem } from './setting-page';

  const props = defineProps<{ pageOptions: SettingPageOptionItem[] }>();

  const goBack = () => {
    setPageRoute();
  };
</script>

<template>
  <div>
    <div @click="goBack">返回</div>
    <div v-for="item in pageOptions">1</div>
  </div>
</template>

<style scoped></style>
