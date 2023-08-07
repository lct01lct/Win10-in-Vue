<script lang="ts" setup>
  import { getDeskTopPort, limitPosition, sleep } from 'utils';
  import { ContextMenuProps, ContextMenuOptionItem } from '.';
  import { onClickOutside } from '@vueuse/core';
  import { contextmenuZIndex } from 'model-core';
  import { CSSProperties } from 'vue';
  import OptionList from './option-list.vue';

  const visible = ref(true);
  const close = () => {
    visible.value = false;
  };

  const props = defineProps<ContextMenuProps & { options: ContextMenuOptionItem[][] }>();

  const style = computed<CSSProperties>(() => {
    return {
      zIndex: contextmenuZIndex,
    };
  });

  const optionListRefVue = ref<InstanceType<typeof OptionList>>();

  onMounted(async () => {
    const oContextMenu = optionListRefVue.value?.optionListRef;
    const point = props.event;
    if (oContextMenu) {
      const contextMenuRect: DOMRect = oContextMenu.getBoundingClientRect();
      const deskTopPort = getDeskTopPort();
      const width = contextMenuRect.width;
      const height = contextMenuRect.height;
      const maxLeft = deskTopPort.width - width;
      const maxTop = deskTopPort.height - height;
      const x = point.clientX;
      const y = point.clientY;

      limitPosition({
        target: oContextMenu,
        x,
        y,
        maxX: maxLeft,
        maxY: maxTop,
      });

      const clearup = onClickOutside(oContextMenu, () => {
        close();
        clearup?.();
      });

      const onDocContextmenu = (e: MouseEvent) => {
        if (!e.composedPath().includes(oContextMenu)) {
          close();
          document.removeEventListener('contextmenu', onDocContextmenu, true);
        }
      };

      const onDocMousedown = (e: MouseEvent) => {
        const isOnContextMenu = e
          .composedPath()
          .includes(optionListRefVue.value?.optionListRef as EventTarget);

        if (!isOnContextMenu) {
          close();
          document.removeEventListener('mousedown', onDocMousedown);
        }
      };

      document.addEventListener('contextmenu', onDocContextmenu, true);
      document.addEventListener('mousedown', onDocMousedown);
    }
  });

  defineExpose({
    visible,
    close,
  });
</script>

<template>
  <Teleport to="body">
    <slot v-if="$slots.default"></slot>
    <OptionList
      v-else
      :options="options"
      :close="close"
      v-if="visible"
      :style="style"
      ref="optionListRefVue"
    ></OptionList>
  </Teleport>
</template>

<style scoped lang="scss"></style>
