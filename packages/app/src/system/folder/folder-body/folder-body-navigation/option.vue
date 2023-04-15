<script lang="ts" setup>
  import { Ref } from 'vue';
  import { Desc, Folder } from 'win10/src/share/file';
  import { Popover } from 'win10/src/components';

  const backward = inject<() => void>('backward');
  const forward = inject<() => void>('forward');
  const visitedList = inject<(Folder | Desc)[]>('visitedList');

  const currIdxInVisitList = inject<Ref<number>>('currIdxInVisitList');
  const isBackwardIconClick = computed(() => {
    if (!currIdxInVisitList) return false;
    return currIdxInVisitList.value > 0;
  });
  const isForwardIconClick = computed(() => {
    if (!currIdxInVisitList || !visitedList) return false;
    return currIdxInVisitList.value < visitedList.length - 1;
  });

  const onBackwardIconClick = () => {
    if (isBackwardIconClick) backward?.();
  };

  const onForwardIconClick = () => {
    if (isBackwardIconClick) forward?.();
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

    <Popover pos="bottom">
      <template #default>
        <div class="history-wrapper">
          <div class="history-item" v-for="item in visitedList" :key="item.path">
            {{ item.name }}
          </div>
        </div>
      </template>
      <template #reference>
        <span class="history iconfont icon-xiangxia"></span>
      </template>
    </Popover>
    <span class="move-up iconfont icon-jiantou_xiangshang"></span>
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
    background-color: #ccc;
    min-width: 120px;
  }
</style>
