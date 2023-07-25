<script lang="ts" setup>
  import { Base } from '@/app';
  import { microsoftStoreName, MicrosoftStoreIcon } from '.';
  import { R_getAllApplications, ApplicationDesc } from 'model-core';

  const apps = reactive<ApplicationDesc[]>([]);
  const getApps = async () => {
    const res = await R_getAllApplications();
    if (res?.status === 'success') {
      apps.length = 0;
      apps.push(...res?.data?.apps!);
    }
  };

  getApps();

  console.log(apps);
</script>

<template>
  <Base :app-logo="MicrosoftStoreIcon" :app-name="microsoftStoreName">
    <template #body></template>
  </Base>
</template>

<style scoped></style>
