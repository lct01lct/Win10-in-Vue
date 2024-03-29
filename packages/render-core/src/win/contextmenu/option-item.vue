<script lang="ts" setup>
  import { getDeskTopPort, isTwoArray } from 'utils';
  import { ContextMenuOptionItem } from '.';
  import OptionList from './option-list.vue';
  import SelectIcon from './img/black-circle.png';
  import HookIcon from './img/hook.png';

  const childVisible = ref(false);
  const props = defineProps<{
    option: ContextMenuOptionItem;
    close: () => void;
    deep: number;
  }>();

  const onOptionItemClick = (item: ContextMenuOptionItem) => {
    if (!item.disabled) {
      const fn = item.onClick;
      fn?.();
      if (!item.subOptions) {
        props.close?.();
      }
    }
  };

  const optionListVue = ref<InstanceType<typeof OptionList>>();

  const setSubList = async (el: HTMLElement | undefined) => {
    await nextTick();
    if (el) {
      const oParent = el?.parentNode;
      const distance = 3;
      const oList = optionListVue.value?.optionListRef;

      if (oParent && oList) {
        const oItem = oParent as HTMLElement;
        const parentDomRect = oItem.getBoundingClientRect();
        const elStyles = window.getComputedStyle(el);

        const desktopPort = getDeskTopPort();
        const listDomRect = (oList as HTMLElement).getBoundingClientRect();

        let x = parentDomRect.width - distance;
        let y = -distance;
        const maxX = desktopPort.width - parseInt(elStyles.width);
        const maxY = desktopPort.height - parseInt(elStyles.height);

        if (x + listDomRect.x >= maxX - distance) {
          x = -parseInt(elStyles.width) + distance;
        }

        if (y + listDomRect.y >= maxY - distance) {
          y = -parseInt(elStyles.height) + distance;
        }

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      }
    }
  };

  watch(
    childVisible,
    (val) => {
      const oChildList = optionListVue.value?.optionListRef;
      if (val && oChildList) {
        setSubList(oChildList);
      }
    },
    {
      flush: 'post',
    }
  );

  const subOptions = computed(() => {
    const subOptions = props.option.subOptions;

    if (!subOptions) {
      return undefined;
    } else {
      return isTwoArray(subOptions) ? subOptions : [subOptions];
    }
  });
</script>

<template>
  <div
    class="option-item"
    :class="[option.disabled && 'disabled']"
    :key="option.name"
    @click.stop="onOptionItemClick(option)"
    @contextmenu.stop="onOptionItemClick(option)"
    @mouseenter="childVisible = true"
    @mouseleave="childVisible = false"
  >
    <div class="option-icon">
      <img
        v-if="option.icon || option.select || option.tick"
        class="option-img"
        :src="option.icon || (option.select && SelectIcon) || (option.tick && HookIcon)"
        alt=""
      />
    </div>
    <div class="option-name" :class="[option.bold && 'bolder']">{{ option.name }}</div>
    <span v-if="subOptions?.length" class="option-more iconfont icon-xiangyou"></span>
    <template v-if="subOptions?.length && childVisible">
      <OptionList
        :close="close"
        :options="subOptions"
        :deep="deep + 1"
        ref="optionListVue"
      ></OptionList>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .option-item {
    position: relative;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    padding: 2px 10px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    &:not(.disabled):hover {
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

    .option-name.bolder {
      font-weight: 700;
    }

    .option-more {
      margin-left: auto;
      color: #390000;
      font-size: 14px;
    }

    &.disabled {
      color: #a0a0a0;
    }
  }
</style>
