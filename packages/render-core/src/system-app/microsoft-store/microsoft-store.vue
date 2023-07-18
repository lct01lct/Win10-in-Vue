<script lang="ts" setup>
  import { Base } from '@/app';
  import { microsoftStoreName, MicrosoftStoreIcon } from '.';
</script>

<template>
  <Base :app-logo="MicrosoftStoreIcon" :app-name="microsoftStoreName">
    <template #body>Microsoft-store</template>
  </Base>
</template>

<style scoped></style>
