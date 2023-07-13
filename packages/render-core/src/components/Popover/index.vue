<script lang="ts" setup>
  import PopoverContent from './Popover-content.vue';
  import { whenTrigger, PopoverProps, PopoverEmits } from './trigger';
  import type { TriggerType } from './trigger';
  import { beforeEnterAnimeHandler, enterAnimeHandler, LeaveAnimeHandler } from './animate';
  import { sleep } from 'utils';

  const props = defineProps(PopoverProps);

  const triggerRef = ref<HTMLElement>();
  const popoverContentVueRef = ref<InstanceType<typeof PopoverContent>>();

  let clickCount = 0;
  const setClickCount = (num: number) => {
    clickCount = num;
  };

  const onClick = () => {
    whenTrigger(props.triggerType as TriggerType, 'click', () => {
      if (clickCount % 2) {
        _leave(toggle);
      } else {
        toggle();
      }
      clickCount++;
    });
  };

  const _leave = (cb: Function) => {
    if (props.animationDir) {
      LeaveAnimeHandler(
        popoverRef.value!.querySelector('.popover-content-wrapper')!,
        props.animationDir,
        cb
      );
    } else {
      cb();
    }
  };

  const onContextmenu = () => {
    whenTrigger(props.triggerType, 'contextmenu', toggle);
  };

  const onHover = () => {
    whenTrigger(props.triggerType, 'hover', toggle);
  };

  const onMouseleave = (e: Event) => {
    whenTrigger(props.triggerType, 'hover', async () => {
      const tar = e.target as HTMLElement;
      await sleep(200);

      if (
        popoverRef.value?.contains(tar) ||
        popoverContentVueRef.value?.contentRef?.contains(tar)
      ) {
        setVisible(false);
      }
    });
  };

  const visible = ref<boolean>(false);

  const toggle = () => {
    visible.value = !visible.value;
  };

  const setVisible = (isVisible: boolean) => {
    visible.value = isVisible;
  };

  provide('pos', props.pos);
  provide('left-margin', props.leftMargin);
  provide('top-margin', props.topMargin);
  provide('_leave', _leave);
  provide('set-click-count', setClickCount);

  const emits = defineEmits(PopoverEmits);

  const beforeEnter = (el: Element) => {
    emits('onBeforeEnter');
    nextTick(() => {
      props.animationDir && beforeEnterAnimeHandler(el as HTMLElement, props.animationDir);
    });
  };

  const enter = (el: Element, done: () => void) => {
    nextTick(() => {
      props.animationDir && enterAnimeHandler(el as HTMLElement, props.animationDir);
      done();
    });
  };

  const afterEnter = () => {
    emits('onAfterEnter');
    emits('open');
  };

  const beforeLeave = () => {
    emits('onBeforeLeave');
  };

  const leave = (el: Element, done: any) => {
    done();
  };

  const afterLeave = () => {
    emits('onAfterLeave');
    popoverRef.value!.querySelector('.popover-tmp-wrapper')!.remove();
    emits('closed');
  };

  const popoverRef = ref<HTMLElement>();

  defineExpose({
    close: () => {
      setVisible(false);
      _leave(() => {
        setClickCount(0);
      });
    },
    visible,
  });
</script>

<template>
  <div class="popover-wrapper" ref="popoverRef" @click.stop>
    <Transition
      @beforeEnter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @leave="leave"
      @afterLeave="afterLeave"
      :css="false"
      appear
    >
      <PopoverContent
        :setVisible="setVisible"
        v-if="visible"
        :triggerRef="triggerRef!"
        :triggerType="triggerType"
        :popoverRef="popoverRef!"
        ref="popoverContentVueRef"
      >
        <slot></slot>
      </PopoverContent>
    </Transition>

    <div
      @click.stop="onClick"
      class="popover-reference"
      ref="triggerRef"
      @mouseenter="onHover"
      @mouseleave="onMouseleave"
      @contextmenu="onContextmenu()"
    >
      <template v-if="$slots.reference">
        <slot name="reference"></slot>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .popover-wrapper {
    position: relative;
    z-index: auto;
    overflow: visible;
    .popover-reference {
      display: flex;
      height: 100%;
    }
  }
</style>
