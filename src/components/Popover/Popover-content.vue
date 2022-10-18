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

  onMounted(() => {
    const oContent = contentRef.value!;
    const computedStyle = window.getComputedStyle(oContent, null);
    const oContentWidth = parseInt(computedStyle.width);
    const oContentHeight = parseInt(computedStyle.height);
    topPos.value = oContentHeight;
    // todo
    bottomPos.value = 1;
  });

  const topPos = ref<number>(0);
  const bottomPos = ref<number>(0);
  const leftPos = ref<number>(0);
  const rightPos = ref<number>(0);

  const pos = inject('pos');
  const animationDir = inject('animationDir');
</script>

<template>
  <div ref="contentRef" class="content-wrapper" :style="`top: -${topPos}px`">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .content-wrapper {
    position: absolute;
    // top: -50px;
  }
</style>
