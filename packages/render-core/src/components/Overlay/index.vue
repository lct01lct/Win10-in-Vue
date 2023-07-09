<script lang="ts" setup>
  import { sleep, useDebounce } from 'utils';
  import { OverlayProps, setPos } from './overlay';

  const props = withDefaults(defineProps<OverlayProps>(), {
    type: 'click',
    leftMargin: 0,
    topMargin: 0,
    pos: 'bottom',
  });

  const visible = ref<boolean>(false);
  const overlayRef = shallowRef<HTMLElement>();
  const show = async (e: Event) => {
    visible.value = true;

    await nextTick();
    const oTrigger = e.currentTarget as HTMLElement;
    const oOverlay = overlayRef.value;

    if (oOverlay) {
      setPos(oOverlay, oTrigger, props.pos, props.leftMargin, props.topMargin, props.animateDir);
    }
  };
  const hide = () => {
    visible.value = false;
  };
  const toggle = (e: Event) => {
    if (visible.value === true) hide();
    else show(e);
  };

  const hover = async (trigger: HTMLElement) => {
    let isClose = true;
    const onTriggerMouseenter = async (e: Event) => {
      e.stopPropagation();
      show({ currentTarget: trigger } as unknown as Event);

      await nextTick();

      const overlay = overlayRef.value;

      if (overlay) {
        await sleep(100);
        overlay.addEventListener('mouseenter', () => {
          isClose = false;
        });
        overlay.addEventListener('mouseleave', async () => {
          isClose = true;
          hide();
        });
      }
    };

    const { debounced } = useDebounce(() => {
      if (trigger && isClose) {
        hide();
      }
    }, 200);

    const onTriggerMouseleave = (e: Event) => {
      e.stopPropagation();

      debounced();
    };

    trigger.addEventListener('mouseenter', onTriggerMouseenter);
    trigger.addEventListener('mouseleave', onTriggerMouseleave);
  };

  watch(visible, () => {});

  defineExpose({
    show,
    hide,
    toggle,
    hover,
    visible,
  });
</script>

<template>
  <Teleport to="body">
    <div class="overlay-wrapper" v-if="visible" ref="overlayRef">
      <slot name="default"></slot>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .overlay-wrapper {
    position: absolute;
    z-index: 9999;
  }
</style>
