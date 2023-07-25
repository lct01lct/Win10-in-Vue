<script lang="ts" setup>
  import { Base } from '@/app';
  import { microsoftStoreName, MicrosoftStoreIcon } from '.';
  import StoreBody from './store-body.vue';
</script>

<template>
  <Base :app-logo="MicrosoftStoreIcon" :app-name="microsoftStoreName">
    <template #body>
      <StoreBody></StoreBody>
    </template>
  </Base>
</template>

<style scoped></style>
