<script lang="ts" setup>
  import { getAppInstance } from '../../';
  import { pageRoute, setPageRoute, pageOptions } from './route';
  import SettingPage from './setting-page.vue';
  import SettingOverview from './setting-overview.vue';

  setPageRoute(getAppInstance().infoByOpened?.route);
</script>

<template>
  <div>
    <SettingOverview v-if="!pageRoute"></SettingOverview>
    <SettingPage v-else :pageOptions="pageOptions"></SettingPage>
  </div>
</template>

<style scoped></style>
