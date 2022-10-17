<script lang="ts" setup>
  import PopoverContent from './Popover-content.vue';
  import { whenTrigger } from './trigger';
  import type { TriggerType } from './trigger';

  const props = defineProps({
    triggerType: {
      type: String,
      default: 'click',
    },
  });

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
</script>

<template>
  <div class="popover-wrapper">
    <div class="target-container">
      <PopoverContent
        :setVisible="setVisible"
        v-if="visible"
        :triggerRef="triggerRef!"
        :triggerType="triggerType"
      >
        <slot></slot>
      </PopoverContent>
    </div>
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
