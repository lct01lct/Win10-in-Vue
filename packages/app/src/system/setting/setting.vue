<script lang="ts" setup>
  import { Base } from '../..';
  import { settingAppName } from '.';
  import SettingBody from './setting-body.vue';
</script>

<template>
  <Base :appName="settingAppName">
    <template #body>
      <SettingBody></SettingBody>
    </template>
  </Base>
</template>

<style scoped></style>
