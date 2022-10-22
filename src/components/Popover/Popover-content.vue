<script lang="ts" setup>
  import { Pos } from './trigger';

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

  // 互斥原理
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

  // 定位原理
  const pos: Pos = inject('pos')!;
  const leftMargin = inject<number>('left-margin')!;
  const topMargin = inject<number>('top-margin')!;

  const oContentWidth = ref<number>(0);
  const oContentHeight = ref<number>(0);
  const oTriggerWidth = ref<number>(0);
  const oTriggerHeight = ref<number>(0);

  onMounted(() => {
    const oContent = contentRef.value!;
    const oTrigger = props.triggerRef! as HTMLElement;

    const computedStyleOfContent = window.getComputedStyle(oContent, null);
    const computedStyledofTrigger = window.getComputedStyle(oTrigger, null);

    oContentWidth.value = parseInt(computedStyleOfContent.width);
    oContentHeight.value = parseInt(computedStyleOfContent.height);
    oTriggerWidth.value = parseInt(computedStyledofTrigger.width);
    oTriggerHeight.value = parseInt(computedStyledofTrigger.height);
  });

  const getStyle = (pos: Pos): string => {
    let styleStr: string = '';

    switch (pos) {
      case 'top':
        styleStr = `left: ${leftMargin}px; top: -${oContentHeight.value + topMargin}px;`;
        break;
      case 'bottom':
        styleStr = `left: ${leftMargin}px; top: ${oTriggerHeight.value + topMargin}px;`;
        break;
      case 'left':
        styleStr = `left: ${oTriggerWidth.value + leftMargin}px; top: ${topMargin}px;`;
        break;
      case `right`:
        styleStr = `left: -${oContentWidth.value + leftMargin}px; top: ${topMargin}px;`;
        break;
      default:
        break;
    }
    return styleStr;
  };
</script>

<template>
  <div ref="contentRef" class="content-wrapper" :style="getStyle(pos)">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .content-wrapper {
    position: absolute;
    z-index: -1;
  }
</style>
