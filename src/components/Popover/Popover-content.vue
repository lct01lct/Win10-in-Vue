<script lang="ts" setup>
  const props = defineProps({
    triggerRef: { type: Object },
    setVisible: {
      type: Function,
      default: () => {},
    },
    triggerType: {
      type: String,
      default: 'click',
    },
  });

  const { setVisible } = props;

  const contentRef = ref<HTMLElement | null>(null);

  const hideContent = (e: Event) => {
    const tar = e.target as HTMLElement;
    const res =
      (props.triggerRef && props.triggerRef!.contains(tar)) ||
      (contentRef.value && contentRef.value!.contains(tar));

    console.log(contentRef.value);
    if (res) {
      e.stopPropagation();
    } else {
      setVisible(false);
    }
  };

  onMounted(() => {
    document.addEventListener('click', hideContent);
    document.addEventListener('contextmenu', hideContent);
  });

  onUnmounted(() => {
    document.removeEventListener('click', hideContent);
    document.removeEventListener('contextmenu', hideContent);
  });
</script>

<template>
  <div ref="contentRef">
    <slot></slot>
  </div>
</template>

<style scoped></style>
