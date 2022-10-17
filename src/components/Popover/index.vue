<script lang="ts" setup>
  const visible = ref<boolean>(false);

  document.addEventListener('click', () => {
    visible.value = false;
  });

  const referenceClickHandler = () => {
    visible.value = !visible.value;
  };
</script>

<template>
  <div class="popover-wrapper" @click.stop>
    <div class="target-container">
      <slot v-if="visible"></slot>
    </div>
    <div @click="referenceClickHandler" class="popover-reference">
      <template v-if="$slots.reference">
        <slot name="reference"></slot>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .popover-wrapper {
    position: relative;
    .reference-container {
      position: absolute;
      top: -40px;
      left: 10px;
    }
  }
</style>
