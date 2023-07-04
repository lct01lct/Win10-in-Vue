<script lang="ts" setup>
  import { Base } from '../..';
  import { settingAppName, settingIcon } from '.';
  import SettingBody from './setting-body.vue';
</script>

<template>
  <Base :appName="settingAppName" :appLogo="settingIcon">
    <template #body>
      <SettingBody></SettingBody>
    </template>
  </Base>
</template>

<style scoped></style>
