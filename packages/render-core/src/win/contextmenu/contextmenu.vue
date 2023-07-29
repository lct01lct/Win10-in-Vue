<script lang="ts" setup>
  import { getViewPort } from 'utils';
  import { ContextMenuProps } from '.';
  import { onClickOutside } from '@vueuse/core';
  import { contextmenuZIndex } from 'model-core';
  import { CSSProperties } from 'vue';

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

  const onOptionItemClick = (fn?: Function) => {
    fn?.();
    close();
  };

  onMounted(() => {
    const oContextMenu = menucontextRef.value;
    const point = props.event;
    if (oContextMenu) {
      const contextMenuRect: DOMRect = oContextMenu.getBoundingClientRect();
      const viewSize = getViewPort();
      const width = contextMenuRect.width;
      const height = contextMenuRect.height;
      const maxLeft = viewSize.width - width;
      const maxTop = viewSize.height - height;
      let x = point.clientX;
      let y = point.clientY;

      if (x < 0) {
        x = 0;
      } else if (x > maxLeft) {
        x = maxLeft;
      }

      if (y < 0) {
        y = 0;
      } else if (y > maxTop) {
        y = maxTop;
      }

      oContextMenu.style.left = `${x}px`;
      oContextMenu.style.top = `${y}px`;

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
        <div class="option-list">
          <div
            class="option-item"
            v-for="item in options"
            :key="item.name"
            @click.stop="onOptionItemClick(item?.onClick)"
            @contextmenu.stop="onOptionItemClick(item?.onClick)"
          >
            <div class="option-icon">
              <img v-if="item.icon" class="option-img" :src="item.icon" alt="" />
            </div>
            <div class="option-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .menucontext-wrapper {
    position: absolute;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    .menucontext-default {
      background-color: #eeeeee;

      .option-list {
        padding: 2px 0px;
        width: 200px;
        .option-item {
          display: flex;
          align-items: center;
          padding: 0 10px;
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          &:hover {
            background-color: #ffffff;
          }
          .option-icon {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
</style>
