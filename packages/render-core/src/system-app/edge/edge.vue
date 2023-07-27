<script lang="ts" setup>
  import { Base } from '@/app';
  import { edgeAppIcon, edgeAppName } from '.';
</script>

<template>
  <Base :app-logo="edgeAppIcon" :app-name="edgeAppName">
    <template #body>
      <iframe class="edgeApp-iframe" @mouseenter.stop src="https://bing.com"></iframe>
    </template>
  </Base>
</template>

<style scoped lang="scss">
  .edgeApp-iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
