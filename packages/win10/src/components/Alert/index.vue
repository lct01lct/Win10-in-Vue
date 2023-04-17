<script lang="ts" setup>
  import ErrorIcon from '@/assets/images/base-components/state-error.png';
  import { AlertType } from '.';

  const props = withDefaults(
    defineProps<{
      type?: AlertType;
    }>(),
    {
      type: 'error',
    }
  );

  const imgMap: Record<AlertType, string> = {
    error: ErrorIcon,
  };

  const imgSrc = computed<string>(() => imgMap[props.type]);
</script>

<template>
  <div class="alert-wrapper">
    <img :src="imgSrc" alt="" class="alert-img" />
    <span class="alert-content">
      <slot name="default"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
  .alert-wrapper {
    display: flex;
    align-items: center;
    font-size: 13px;
    .alert-img {
      width: 30px;
      height: 30px;
    }

    .alert-content {
      margin-left: 10px;
    }
  }
</style>
