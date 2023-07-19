<script lang="ts" setup>
  import { Base } from '@/app';
  import { edgeAppIcon, edgeAppName } from '.';
</script>

<template>
  <Base :app-logo="edgeAppIcon" :app-name="edgeAppName">
    <template #body>
      <iframe @mouseenter.stop class="edgeApp-iframe" src="https://bing.com"></iframe>
    </template>
  </Base>
</template>

<style scoped lang="scss">
  .edgeApp-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
