<script lang="ts" setup>
  import PopoverContent from './Popover-content.vue';
  import { whenTrigger, PopoverProps, PopoverEmits, animQueue } from './trigger';
  import type { TriggerType } from './trigger';
  import { beforeEnterAnimeHandler, enterAnimeHandler, LeaveAnimeHandler } from './animate';

  const props = defineProps(PopoverProps);

  const triggerRef = ref<HTMLElement | null>(null);

  let clickCount = 0;
  const setClickCount = (num: number) => {
    clickCount = num;
  };

  const onClick = (e: Event) => {
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

  const onContextmenu = (e: Event) => {
    whenTrigger(props.triggerType as TriggerType, 'contextmenu', () => {
      toggle();
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

  const beforeEnter = (el: HTMLElement) => {
    emits('onBeforeEnter');
    setTimeout(() => {
      props.animationDir && beforeEnterAnimeHandler(el, props.animationDir);
    });
  };

  const enter = (el: HTMLElement, done: any) => {
    setTimeout(() => {
      props.animationDir && enterAnimeHandler(el, props.animationDir);
      done();
    });
  };

  const afterEnter = () => {
    emits('onAfterEnter');
  };

  const beforeLeave = () => {
    emits('onBeforeLeave');
  };

  const leave = (el: HTMLElement, done: any) => {
    done();
  };

  const afterLeave = () => {
    emits('onAfterLeave');
    popoverRef.value!.querySelector('.popover-tmp-wrapper')!.remove();
  };

  const popoverRef = ref<HTMLElement | null>(null);
</script>

<template>
  <div class="popover-wrapper" ref="popoverRef">
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
      >
        <slot></slot>
      </PopoverContent>
    </Transition>

    <div
      @click="onClick($event)"
      class="popover-reference"
      ref="triggerRef"
      @contextmenu="onContextmenu($event)"
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
  }
</style>
