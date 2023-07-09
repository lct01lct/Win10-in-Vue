<script lang="ts" setup>
  const { color, hoverColor } = defineProps({
    color: {
      type: String,
      default: 'inherit',
    },
    hoverColor: {
      type: String,
    },
  });

  const btnRef = ref<HTMLElement | null>(null);
  onMounted(() => {
    btnRef.value!.style.color = color;
  });

  const mouseenter = (e: Event) => {
    if (hoverColor) {
      (e.target as HTMLElement).style.color = hoverColor;
    }
  };

  const mouseleave = (e: Event) => {
    (e.target as HTMLElement).style.color = color;
  };
</script>

<template>
  <button @mouseenter="mouseenter" @mouseleave="mouseleave" ref="btnRef">
    <slot></slot>
  </button>
</template>

<style scoped>
  button {
    border: 0;
    background-color: transparent;
  }
</style>
