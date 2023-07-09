<script lang="ts" setup>
  import { getAppInstance } from '@/app';
  import { isRenderPage, setPageRoute, pageOptions, pageRoute } from './route';
  import SettingPage from './setting-page.vue';
  import SettingOverview from './setting-overview.vue';
  import { SettingApp } from '.';

  setPageRoute(getAppInstance<SettingApp>().infoByOpened?.route);
</script>

<template>
  <SettingPage v-if="isRenderPage" :pageOptions="pageOptions!" :title="pageRoute!"></SettingPage>
  <SettingOverview v-else></SettingOverview>
</template>

<style scoped></style>
