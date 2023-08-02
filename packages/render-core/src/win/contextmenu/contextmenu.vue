<script lang="ts" setup>
  import { getDeskTopPort, limitPosition } from 'utils';
  import { ContextMenuProps } from '.';
  import { onClickOutside } from '@vueuse/core';
  import { contextmenuZIndex } from 'model-core';
  import { CSSProperties } from 'vue';
  import OptionList from './option-list.vue';

  const props = defineProps<ContextMenuProps>();

  const visible = ref(true);
  const menucontextRef = shallowRef<HTMLElement>();

  const close = () => {
    visible.value = false;
  };

  const style = computed<CSSProperties>(() => {
    return {
      zIndex: contextmenuZIndex,
    };
  });

  onMounted(() => {
    const oContextMenu = menucontextRef.value;
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

      onClickOutside(oContextMenu, () => {
        close();
      });

      document.addEventListener(
        'contextmenu',
        (e) => {
          if (!e.composedPath().includes(oContextMenu)) {
            close();
          }
        },
        true
      );
    }
  });

  defineExpose({
    visible,
    close,
  });
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="menucontext-wrapper" ref="menucontextRef" :style="style">
      <slot v-if="$slots.default"></slot>
      <div class="menucontext-default">
        <OptionList :options="options" :close="close">
          <template #default="{ subOptions }">
            <template v-if="subOptions">
              <OptionList class="sub-option-list" :options="subOptions" :close="close"></OptionList>
            </template>
          </template>
        </OptionList>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .menucontext-wrapper {
    position: absolute;

    .menucontext-default {
      background-color: #eeeeee;
    }

    &:hover {
      cursor: default;
    }
  }
</style>
