<script lang="ts" setup>
  import PopoverContent from './Popover-content.vue';
  import { whenTrigger, PopoverProps, PopoverEmits, animQueue } from './trigger';
  import type { TriggerType } from './trigger';
  import { beforeEnterAnimeHandler, enterAnimeHandler, LeaveAnimeHandler } from './animate';

  const props = defineProps(PopoverProps);

  const triggerRef = ref<HTMLElement | null>(null);

  const onClick = (e: Event) => {
    whenTrigger(props.triggerType as TriggerType, 'click', () => {
      toggle(e);
    });
  };

  const onContextmenu = (e: Event) => {
    whenTrigger(props.triggerType as TriggerType, 'contextmenu', () => {
      toggle(e);
    });
  };

  const visible = ref<boolean>(false);

  const toggle = (e: Event) => {
    visible.value = !visible.value;
  };

  const setVisible = (isVisible: boolean) => {
    visible.value = isVisible;
  };

  provide('pos', props.pos);
  provide('left-margin', props.leftMargin);
  provide('top-margin', props.topMargin);

  const emits = defineEmits(PopoverEmits);

  const cbIsAnim = (fn: Function) => {
    props.animationDir && fn();
  };

  const beforeEnter = (el: HTMLElement) => {
    emits('onBeforeEnter');

    nextTick(() => {
      props.animationDir && beforeEnterAnimeHandler(el, props.animationDir);
    });
  };

  const enter = (el: HTMLElement, done: any) => {
    nextTick(() => {
      props.animationDir && enterAnimeHandler(el, props.animationDir, done);
    });
  };

  const afterEnter = () => {
    emits('onAfterEnter');
  };

  const beforeLeave = (el: HTMLElement) => {
    emits('onBeforeLeave');
  };

  const leave = (el: HTMLElement, done: any) => {
    if (props.animationDir) {
      LeaveAnimeHandler(el, props.animationDir, done);
    } else {
      done();
    }
  };

  const afterLeave = () => {
    emits('onAfterLeave');
  };
</script>

<template>
  <div class="popover-wrapper">
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
