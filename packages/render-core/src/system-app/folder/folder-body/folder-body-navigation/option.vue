<script lang="ts" setup>
  import { Ref } from 'vue';
  import { Popover } from '@/components';
  import { Pointer } from '../../types';

  const backward = inject<() => void>('backward');
  const forward = inject<() => void>('forward');
  const visitedList = inject<Pointer[]>('visitedList');
  const currPointer = inject<Ref<Pointer>>('currPointer');
  const setCurrPointer = inject<(pointer: Pointer) => void>('setCurrPointer');
  const step = inject<(index: number) => void>('step');
  const popoverRef = ref<InstanceType<typeof Popover>>();
  const currIdxInVisitList = inject<Ref<number>>('currIdxInVisitList');

  const isBackwardIconClick = computed(() => {
    if (!currIdxInVisitList) return false;
    return currIdxInVisitList.value > 0;
  });
  const isForwardIconClick = computed(() => {
    if (!currIdxInVisitList || !visitedList) return false;
    return currIdxInVisitList.value < visitedList.length - 1;
  });

  const isMoveupIconClick = computed(() => {
    if (currPointer?.value.parent) {
      return true;
    }
    return false;
  });

  const onBackwardIconClick = () => {
    if (isBackwardIconClick) backward?.();
  };

  const onForwardIconClick = () => {
    if (isBackwardIconClick) forward?.();
  };

  const onHistoryItemClick = (index: number) => {
    if (index === currIdxInVisitList?.value) return;
    step?.(index);
    popoverRef?.value?.close();
  };

  const onMoveupIconClick = () => {
    if (currPointer?.value.parent) {
      setCurrPointer?.(currPointer?.value.parent);
    }
  };
</script>

<template>
  <div class="option-list-wrappper">
    <span
      class="back iconfont icon-jiantou_xiangzuo"
      @click="onBackwardIconClick"
      :class="isBackwardIconClick || 'disabled'"
    ></span>
    <span
      class="front iconfont icon-jiantou_xiangyou"
      :class="isForwardIconClick || 'disabled'"
      @click="onForwardIconClick"
    ></span>
    <Popover pos="bottom" ref="popoverRef">
      <template #default>
        <div class="history-wrapper">
          <div
            class="history-item"
            :class="[index === currIdxInVisitList && 'selected']"
            v-for="(item, index) in visitedList"
            :key="item.path"
            @click="onHistoryItemClick(index)"
          >
            <span
              class="iconfont"
              :class="[index === currIdxInVisitList ? 'icon-duigou' : 'icon-jiantou_xiangzuo']"
            ></span>
            {{ item.name }}
          </div>
        </div>
      </template>
      <template #reference>
        <span class="history iconfont icon-xiangxia"></span>
      </template>
    </Popover>
    <span
      class="move-up iconfont icon-jiantou_xiangshang"
      :class="isMoveupIconClick || 'disabled'"
      @click="onMoveupIconClick"
    ></span>
  </div>
</template>

<style scoped lang="scss">
  .option-list-wrappper {
    display: flex;

    .iconfont {
      color: #808080;
    }

    .iconfont.disabled {
      color: #dfdfdf;
      &:hover {
        color: #dfdfdf;
        background-color: transparent;
        border-color: transparent;
      }
    }

    .iconfont {
      width: 25px;
      font-size: 18px;
      line-height: 24.6px;
      text-align: center;
      border: 1px solid transparent;
    }

    .history {
      font-size: 14px;
      font-weight: 700;
    }

    .move-up {
      &:hover {
        border: 1px solid #cce8ff;
        background-color: #e5f3ff;
      }
    }
    .back,
    .front,
    .history {
      &:hover {
        color: #3298fe;
      }
    }
  }

  .history-wrapper {
    background-color: #f2f2f2;
    min-width: 120px;
    padding: 2px 1px;
    .history-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      &:hover {
        background-color: #91c9f7;
      }
    }

    .iconfont {
      width: 12px;
      height: 12px;
      line-height: 12px;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 12px;
      color: #000;
      font-weight: 700;
    }

    .selected {
      background-color: #91c9f7;
      font-weight: 700;
    }
  }
</style>
