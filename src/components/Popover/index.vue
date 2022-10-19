<script lang="ts" setup>
  import PopoverContent from './Popover-content.vue';
  import { whenTrigger, usePopoverProps } from './trigger';
  import type { TriggerType } from './trigger';

  const props = defineProps(usePopoverProps);

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
  provide('animationDir', props.animationDir);
  provide('left-margin', props.leftMargin);
  provide('top-margin', props.topMargin);
</script>

<template>
  <div class="popover-wrapper">
    <PopoverContent
      :setVisible="setVisible"
      v-if="visible"
      :triggerRef="triggerRef!"
      :triggerType="triggerType"
    >
      <slot></slot>
    </PopoverContent>

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
    .reference-container {
      position: absolute;
      top: -40px;
      left: 10px;
    }
  }
</style>
