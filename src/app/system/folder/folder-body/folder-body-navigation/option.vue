<script lang="ts" setup>
  import {
    backBtnIsActive,
    frontBtnIsActive,
    historyBtnIsActive,
    moveupBtnIsActive,
  } from './../body';
</script>

<template>
  <div class="option-list-wrappper">
    <span
      class="back iconfont icon-jiantou_xiangzuo"
      :class="[backBtnIsActive ? 'isActive' : '']"
    ></span>
    <span
      class="front iconfont icon-jiantou_xiangyou"
      :class="[frontBtnIsActive ? 'isActive' : '']"
    ></span>
    <span
      class="history iconfont icon-xiangxia"
      :class="[historyBtnIsActive ? 'isActive' : '']"
    ></span>
    <span
      class="move-up iconfont icon-jiantou_xiangshang"
      :class="[moveupBtnIsActive ? 'isActive' : '']"
    ></span>
  </div>
</template>

<style scoped lang="scss">
  .option-list-wrappper {
    display: flex;

    .iconfont.isActive {
      color: #808080;
    }

    .iconfont {
      width: 25px;
      font-size: 18px;
      line-height: 24.6px;
      text-align: center;
      border: 1px solid transparent;
      color: #dfdfdf;
    }

    .history {
      font-size: 14px;
      font-weight: 700;
    }

    .move-up.isActive {
      &:hover {
        border: 1px solid #cce8ff;
        background-color: #e5f3ff;
      }
    }
    .back.isActive,
    .front.isActive,
    .history.isActive {
      &:hover {
        color: #3298fe;
      }
    }
  }
</style>
