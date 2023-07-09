<script lang="ts" setup>
  import { Base } from '@/app';
  import { terminalAppName, terminalIcon } from '.';
  import TerminalBody from './terminal-body/index.vue';
</script>

<template>
  <Base :appName="terminalAppName" :appLogo="terminalIcon">
    <template #body>
      <TerminalBody></TerminalBody>
    </template>
  </Base>
</template>

<style scoped></style>
