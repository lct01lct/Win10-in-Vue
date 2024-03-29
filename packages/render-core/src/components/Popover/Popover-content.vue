<script lang="ts" setup>
  import { Pos } from './trigger';
  import noop from 'lodash/fp/noop';

  const props = withDefaults(
    defineProps<{
      triggerRef: HTMLElement;
      setVisible: (visible: boolean) => void;
      triggerType: string;
      popoverRef: HTMLElement;
    }>(),
    { setVisible: noop, triggerType: 'click' }
  );

  const { setVisible } = props;

  const contentRef = ref<HTMLElement | null>(null);

  // 互斥原理
  const _leave = inject<Function>('_leave')!;
  let setClickCount = inject<Function>('set-click-count')!;

  const isHide = (tar: HTMLElement, e: Event) => {
    const conditions = [
      props.triggerRef && props.triggerRef.contains(tar), // 点击元素是触发器
      e.composedPath().includes(props.triggerRef! as HTMLElement), // 触发对象可能会隐藏
      e.composedPath().includes(contentRef.value!), // 解决点击元素导致自身隐藏
    ];
    return conditions.includes(true);
  };

  const hideContent = (e: Event) => {
    const tar = e.target as HTMLElement;

    if (!isHide(tar, e)) {
      _leave(() => {
        setVisible(false);
        setClickCount(0);
      });
    }
  };

  onMounted(() => {
    document.addEventListener('click', hideContent, true);
    document.addEventListener('contextmenu', hideContent);
  });

  onUnmounted(() => {
    document.removeEventListener('click', hideContent, true);
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
    const oWrap = document.createElement('div');
    const oContent = contentRef.value! as HTMLElement;
    const oTrigger = props.triggerRef! as HTMLElement;
    const computedStyledofTrigger = window.getComputedStyle(oTrigger, null);

    oTriggerWidth.value = parseInt(computedStyledofTrigger.width);
    oTriggerHeight.value = parseInt(computedStyledofTrigger.height);

    oWrap.className = 'popover-tmp-wrapper';
    oWrap.style.overflow = 'hidden';
    oWrap.style.position = 'absolute';

    oWrap.appendChild(oContent);
    props.popoverRef!.appendChild(oWrap);

    nextTick(() => {
      const computedStyleOfContent = window.getComputedStyle(oContent, null);

      oContentWidth.value = parseInt(computedStyleOfContent.width);
      oContentHeight.value = parseInt(computedStyleOfContent.height);

      oWrap.style.width = computedStyleOfContent.width;
      oWrap.style.height = computedStyleOfContent.height;
      const styles = getStyles(pos);

      oWrap.style.left = `${styles.left}px`;
      oWrap.style.top = `${styles.top}px`;
    });
  });

  const getStyles = (pos: Pos) => {
    let left: number = 0;
    let top: number = 0;

    switch (pos) {
      case 'top':
        left = leftMargin;
        top = -(oContentHeight.value + topMargin);
        break;
      case 'bottom':
        left = leftMargin;
        top = oTriggerHeight.value + topMargin;
        break;
      case 'left':
        left = oTriggerWidth.value + leftMargin;
        top = topMargin;
        break;
      case `right`:
        left = -oContentWidth.value + leftMargin;
        top = topMargin;
        break;
      default:
        break;
    }

    return {
      left,
      top,
    };
  };

  defineExpose({
    contentRef,
  });
</script>

<template>
  <div ref="contentRef" class="popover-content-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .popover-content-wrapper {
    position: absolute;
    bottom: 0px;
    z-index: 999;
  }
</style>
