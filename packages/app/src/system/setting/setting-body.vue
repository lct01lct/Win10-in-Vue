<script lang="ts" setup>
  import { getAppInstance } from '../../';
  import { pageRoute, setPageRoute, pageOptions } from './route';
  import SettingPage from './setting-page.vue';
  import SettingOverview from './setting-overview.vue';
  import { SettingApp } from '.';

  setPageRoute(getAppInstance<SettingApp>().infoByOpened?.route);
</script>

<template>
  <div>
    <SettingPage v-if="pageRoute && pageOptions?.length" :pageOptions="pageOptions!"></SettingPage>
    <SettingOverview v-else></SettingOverview>
  </div>
</template>

<style scoped></style>
