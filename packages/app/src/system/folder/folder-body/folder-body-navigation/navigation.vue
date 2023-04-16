<script lang="ts" setup>
  import type { SubscribeResizeMovingType, AppViewSizeOpt } from '../../../../';
  import { Icon } from 'win10/src/components';
  import { Ref, ComputedRef } from 'vue';
  import { navigationItemMap } from '.';
  import { onClickOutside } from '@vueuse/core';
  import { Popover } from 'win10/src/components';
  import { Folder, Desc } from 'win10/src/share/file';

  const subscribeResizeMoving = inject<SubscribeResizeMovingType>('subscribeResizeMoving')!;

  subscribeResizeMoving(({ width, height, top, left }: Required<AppViewSizeOpt>) => {
    let reWidth: number = 0;
    if (width - 300 < 200) {
      reWidth = 200;
    } else {
      reWidth = width - 300;
    }

    iptWidth.value = reWidth;
  });

  const iptWidth = ref<number>(500);
  const isActive = ref<boolean>(false);
  const currPath = inject<ComputedRef<string | undefined>>('currPath')!;
  const setCurrPointer = inject<(currPointer: Folder | Desc) => void>('setCurrPointer');

  const currPointer = inject<Ref<Folder | Desc>>('currPointer');
  const pathItems = computed(() => {
    if (!currPath.value) return '';
    const items = currPath.value
      .slice(3)
      .split('\\')
      .filter((item) => item);

    items.forEach((item, index) => {
      const replaceItem = navigationItemMap.get(item.toLowerCase());
      if (replaceItem) {
        items[index] = replaceItem;
      }
    });

    const descName = currPath.value.slice(0, 1);
    let firstItem = '';
    if (descName.toUpperCase() === 'D') firstItem = 'Data (D:)';
    if (descName.toUpperCase() === 'C') firstItem = 'Windows (C:)';
    if (firstItem) {
      items.unshift(firstItem);
    }

    return items;
  });

  const iptRef = ref<HTMLInputElement>();
  const isFocus = ref(false);
  const onIptWrapperClick = async () => {
    isFocus.value = true;
    if (isFocus.value) {
      await nextTick();
      iptRef.value?.select();
    }
  };

  onMounted(() => {
    onClickOutside(iptRef, () => {
      isFocus.value = false;
    });
  });

  const onItemClick = (index: number) => {
    if (currPointer && setCurrPointer) {
      let forwardCount = pathItems.value.length - 1 - index;
      let _currPointer = currPointer.value;

      while (forwardCount--) {
        _currPointer = _currPointer.parent;
      }
      setCurrPointer(_currPointer);
    }
  };

  const iptVal = ref(currPath.value);
  watch(currPath, (val) => {
    iptVal.value = val;
  });
</script>

<template>
  <div class="navigation-wrapper">
    <div class="prepend-icon">
      <Icon :width="20" :height="20">
        <img src="../../../../assets/images/appPage/system-app/folder-app/file-full.png" />
      </Icon>
    </div>
    <div
      type="text"
      class="navigation-ipt-wrapper"
      :style="{ width: iptWidth + 'px' }"
      @click="onIptWrapperClick"
    >
      <input
        v-if="isFocus"
        type="text"
        v-model="iptVal"
        class="navigation-ipt"
        ref="iptRef"
        @click.stop
      />
      <div v-else class="navigation-list" @click.stop>
        <div v-for="(item, index) in pathItems" class="navigation-item">
          <div class="item-inner" @click.stop="onItemClick(index)">
            {{ item }}
            <Popover pos="bottom" trigger-type="click">
              TODO:
              <template #reference>
                <span class="iconfont" :class="['icon-xiangyou']" @click.stop></span>
              </template>
            </Popover>
          </div>
        </div>
      </div>
    </div>
    <button class="append-icon" @click="isActive = true" :class="[isActive ? 'isActive' : '']">
      <span class="iconfont icon-xiangxia"></span>
    </button>
    <button class="reload-icon">
      <span class="iconfont icon-shuaxin"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .navigation-wrapper {
    position: relative;
    .prepend-icon {
      position: absolute;
      top: 5px;
      left: 5px;
    }

    .navigation-ipt-wrapper {
      display: flex;
      align-items: center;
      height: 25px;
      padding-left: 24px;
      border: 1px solid #ccc;

      font-size: 12px;
      &:focus {
        border: 1px solid #0078d7;
      }

      .navigation-ipt {
        width: calc(100% - 26px);
        outline: none;
        border: 0;
      }

      .navigation-list {
        display: flex;
        height: 100%;
        .navigation-item {
          display: flex;
          align-items: center;
          padding: 0 2px;
          .item-inner {
            display: flex;
            align-items: center;
            height: 25px;
          }

          &:hover {
            background-color: #e5f3ff;
          }

          .iconfont {
            padding: 0 4px;
            font-size: 12px;
          }
        }
      }
    }

    .append-icon,
    .reload-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      width: 25px;
      height: 27px;
      border: 1px solid transparent;
      background-color: transparent;
    }

    .append-icon:focus,
    .append-icon:hover {
      border: 1px solid #005499;
      background-color: #cce4f7;
    }

    .append-icon:active {
      border: 1px solid #005499;
      background-color: #cce4f7;
    }

    .reload-icon {
      right: -30px;
      width: 30px;
      height: 29px;
      border: 1px solid #ccc;
      font-weight: 700;
      &:hover {
        border: 1px solid #005499;
        background-color: #cce4f7;
      }
    }
  }
</style>
