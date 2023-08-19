<script lang="ts" setup>
  import { Base } from '@/app';
  import { notepadAppName, notepadAppIcon } from '.';
</script>

<template>
  <Base :app-logo="notepadAppIcon" :app-name="notepadAppName">
    <template #body>Notepad</template>
  </Base>
</template>

<style scoped></style>
