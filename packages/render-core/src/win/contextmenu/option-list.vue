<script lang="ts" setup>
  import { getDeskTopPort } from 'utils';
  import { ContextMenuOptionItem } from '.';

  const props = defineProps<{ options: ContextMenuOptionItem[]; close?: () => void }>();

  const onOptionItemClick = (item: ContextMenuOptionItem) => {
    const fn = item.onClick;
    fn?.();
    if (!item.subOptions) {
      props.close?.();
    }
  };

  const setSubList = async (el: HTMLElement | undefined) => {
    await nextTick();
    if (el) {
      const oParent = el?.parentNode;
      const distance = 3;
      if (oParent) {
        const oItem = oParent as HTMLElement;
        const parentDomRect = oItem.getBoundingClientRect();
        const elDomRect = el.getBoundingClientRect();
        const desktopPort = getDeskTopPort();

        let x = parentDomRect.width - distance;
        let y = -distance;
        const maxX = desktopPort.width - elDomRect.width;
        const maxY = desktopPort.height - elDomRect.height;

        if (x > maxX) {
          x = -elDomRect.width + distance;
        }

        if (y > maxY) {
          y = -elDomRect.height + distance;
        }

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      }
    }
  };
</script>

<template>
  <div class="option-list">
    <div
      class="option-item"
      v-for="item in options"
      :key="item.name"
      @click.stop="onOptionItemClick(item)"
      @contextmenu.stop="onOptionItemClick(item)"
    >
      <div class="option-icon">
        <img v-if="item.icon" class="option-img" :src="item.icon" alt="" />
      </div>
      <div class="option-name">{{ item.name }}</div>
      <span v-if="item.subOptions" class="option-more iconfont icon-xiangyou"></span>
      <div
        class="sub-option-wrapper"
        v-if="item.subOptions"
        :ref="(el) => setSubList(el as Element as HTMLElement)"
      >
        <slot name="default" :subOptions="item.subOptions"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .option-list {
    padding: 2px 0px;
    width: 200px;
    background-color: #eeeeee;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    .option-item {
      position: relative;
      justify-content: flex-start;
      display: flex;
      align-items: center;
      padding: 2px 10px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      &:hover {
        background-color: #ffffff;
      }
      .option-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        .option-img {
          width: 100%;
          height: 100%;
        }
      }

      .option-more {
        margin-left: auto;
        color: #390000;
        font-size: 14px;
      }

      &:hover .sub-option-wrapper {
        display: block;
      }
    }
  }

  .sub-option-wrapper {
    position: absolute;
    display: none;
  }
</style>
