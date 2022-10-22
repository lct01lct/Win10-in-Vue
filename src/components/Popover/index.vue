<script lang="ts" setup>
  import PopoverContent from './Popover-content.vue';
  import { whenTrigger, PopoverProps, PopoverEmits, animQueue } from './trigger';
  import type { TriggerType } from './trigger';
  import './slide-animation.scss';

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

  const beforeEnter = () => {
    emits('onBeforeEnter');

    if (animQueue.length) {
    }

    if (props.animationDir) {
      animQueue.push(true);
    }
  };

  const afterEnter = () => {
    emits('onAfterEnter');
  };

  const beforeLeave = () => {
    emits('onBeforeEnter');
  };

  const afterLeave = () => {
    emits('onAfterLeave');
  };
</script>

<template>
  <div class="popover-wrapper">
    <Transition
      :name="props.animationDir ? `slide-${animationDir}` : 'none'"
      @beforeEnter="beforeEnter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @afterLeave="afterLeave"
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
