<script lang="ts" setup>
  import { messageList, resolveMessageContent, removeMessageByPublicTime } from './messages';
  import anime from 'animejs';

  const closeBtnVisible = ref<boolean>(false);
  const titleBtnVisible = ref<boolean>(false);

  const onCloseBtnClick = (publicTime: string, dom: HTMLElement) => {
    anime({
      targets: dom,
      translateX: 400,
      duration: 300,
      loop: false,
      direction: 'alternate',
      easing: 'easeInCubic',
      complete() {
        removeMessageByPublicTime(publicTime);
      },
    });
  };
</script>

<template>
  <div class="message-list empty" v-if="!messageList.length">没有新通知</div>

  <div class="message-list" v-else>
    <div
      class="message-item"
      v-for="item in messageList"
      :key="item.option.publicTime"
      :ref="el =>item.dom = (el as HTMLElement)"
    >
      <div
        class="message-item-title"
        v-if="item.title"
        @mouseenter="titleBtnVisible = !titleBtnVisible"
        @mouseleave="titleBtnVisible = !titleBtnVisible"
      >
        {{ item.title.text }}
        <div
          class="close-btn"
          v-if="titleBtnVisible"
          @click="onCloseBtnClick(item.option.publicTime, item.dom)"
        >
          <i class="iconfont icon-cuowuguanbiquxiao"></i>
        </div>
      </div>
      <div
        class="message-item-content"
        v-if="item.content"
        @mouseenter="closeBtnVisible = !closeBtnVisible"
        @mouseleave="closeBtnVisible = !closeBtnVisible"
      >
        <component :is="resolveMessageContent(item.content)"></component>
      </div>
      <div
        class="message-item-option"
        @mouseenter="closeBtnVisible = !closeBtnVisible"
        @mouseleave="closeBtnVisible = !closeBtnVisible"
      >
        <span class="option-tip" v-if="item.option.tip">{{ item.option.tip }}</span>
        <span class="option-todo" v-if="item.option.todo">{{ item.option.todo }}</span>
        <span class="option-time">{{ item.option.time }}</span>
        <div
          class="close-btn"
          v-if="closeBtnVisible"
          @click="onCloseBtnClick(item.option.publicTime, item.dom)"
        >
          <i class="iconfont icon-cuowuguanbiquxiao"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .message-list {
    height: 300px;
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
    .message-item {
      padding: 0 20px;
      .message-item-title {
        position: relative;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        &:hover {
          background-color: #373838;
        }
        .close-btn {
          top: 0px;
        }
      }
      .message-item-content {
        height: 140px;
      }
      .message-item-content:hover + .message-item-option {
        background-color: #323232;
      }
      .message-item-option {
        position: relative;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        padding: 20px;
        > span {
          display: inline-block;
        }
        .option-tip {
          font-weight: 700;
          height: 18px;
        }
        .option-todo {
          color: #9f9f9f;
          height: 25px;
        }
        .option-time {
          height: 12px;
          font-size: 12px;
          color: #9f9f9f;
        }
        &:hover {
          background-color: #323232;
        }
      }
    }
  }
  .message-list.empty {
    line-height: 300px;
    text-align: center;
    font-weight: 700;
    color: #9f9f9f;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #9f9f9f;
    &:hover {
      color: #fff;
    }
  }
</style>
