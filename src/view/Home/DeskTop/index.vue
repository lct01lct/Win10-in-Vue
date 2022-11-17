<script lang="ts" setup>
  import binData from '@/config/bin-data';
  import { Desc } from '@/share/file';

  const f = new Desc(binData[0] as any);
  console.log(f);
</script>

<template>
  <div class="deskTop-wrapper"></div>
</template>

<style scoped></style>
