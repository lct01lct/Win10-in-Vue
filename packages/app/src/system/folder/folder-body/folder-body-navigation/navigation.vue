<script lang="ts" setup>
  import type { SubscribeResizeMovingType, AppViewSizeOpt } from '../../../../';
  import { Icon } from 'win10/src/components';
  import { Ref, ComputedRef } from 'vue';
  import { navigationItemMap } from '.';
  import { onClickOutside } from '@vueuse/core';
  import { Popover } from 'win10/src/components';
  import { Folder, Desc } from 'win10/src/share/file';
  import { messageBox } from 'win10/src/components';
  import { Alert } from 'win10/src/components';
  import { Pointer } from '../../types';
  import { isFolder } from 'win10/src/share/file';

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

  const findPointer = (index: number) => {
    if (currPointer) {
      let forwardCount = pathItems.value.length - 1 - index;
      let _currPointer = currPointer.value;

      while (forwardCount-- && _currPointer.parent) {
        _currPointer = _currPointer.parent;
      }

      return _currPointer;
    }
  };

  const onItemClick = (index: number) => {
    const pointer = findPointer(index);

    if (pointer && setCurrPointer) {
      setCurrPointer(pointer);
    }
  };

  const iptVal = ref(currPath.value);
  watch(currPath, (val) => {
    iptVal.value = val;
  });

  const onDocEnter = (e: KeyboardEvent) => {
    const val = iptVal.value;
    if (val && document.activeElement === iptRef.value && e.keyCode === 13) {
      const resPointer = Folder.findByPath(val);
      if (resPointer && currPointer) {
        currPointer.value = resPointer;
      } else {
        messageBox({
          title: '文件资源管理器',
          content: h(
            Alert,
            { style: { padding: '15px' } },
            { default: () => `Windows 找不到"${val}"。请检查拼写并重试。` }
          ),
          cancelBtn: false,
        }).finally(() => {
          iptVal.value = currPointer?.value.path;
        });
      }
    }
  };

  const expandItem = ref<Pointer[]>([]);
  const expandPointerParent = ref<Pointer>();

  const hasExpandList = (index: number) => {
    const pointer = findPointer(index);
    return pointer?.children.some((item) => isFolder(item));
  };

  const onExpandItemClick = (index: number) => {
    const parentFolder = findPointer(index);
    const folderPointer = parentFolder?.children.filter((item) => isFolder(item));

    if (folderPointer) {
      expandItem.value = folderPointer as Pointer[];
      if (index + 1) {
        expandPointerParent.value = findPointer(index + 1);
      }
    }
  };

  onMounted(() => document.addEventListener('keydown', onDocEnter));
  onUnmounted(() => document.removeEventListener('keydown', onDocEnter));
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
            <Popover v-if="hasExpandList(index)" pos="bottom">
              <div class="expand-list">
                <div v-for="item in expandItem" class="expand-item">
                  <Icon :width="12" :height="12">
                    <img
                      src="../../../../assets/images/appPage/system-app/folder-app/file-full.png"
                    />
                  </Icon>
                  {{ item.name }}
                </div>
              </div>
              <template #reference>
                <span
                  class="iconfont"
                  :class="['icon-xiangyou']"
                  @click="onExpandItemClick(index)"
                ></span>
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
            padding: 6px 4px;
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

  .expand-list {
    border: 1px solid #000;
    background-color: #f2f2f2;
    .expand-item {
      padding: 2px;
      padding-right: 100px;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
  }
</style>
