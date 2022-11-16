<script lang="ts" setup>
  import { sleep } from '@/utils/async';
  import anime from 'animejs';
  import { SCOPE } from './message';
  import type { MessageEL } from './message';
  import { removeMessageByPublicTime } from '@/share/win';

  const { content, click } = defineProps({
    content: {
      type: [String, Object],
      require: true,
      default: '',
    },
    click: {
      type: Function,
    },
  });

  const ContentView = () => {
    if (typeof content === 'string') {
      return h('div', { innerHTML: content, class: 'message-content' });
    } else {
      return h(content!);
    }
  };

  const messageRef = ref<MessageEL>();

  const openMessageTask = () => {
    anime({
      targets: messageRef.value,
      duration: 200,
      scale: [1, 0.9],
      opacity: [1, 0.5],
      loop: false,
      direction: 'alternate',
      easing: 'easeInCubic',
      async complete() {
        const publicTime = messageRef.value![SCOPE].publicTime;
        messageRef.value![SCOPE].messageInstance.destroy();
        await sleep(300);
        if (click) {
          removeMessageByPublicTime(publicTime);

          click();
        } else {
          (document.querySelector('.message-task')! as HTMLElement).click();
        }
      },
    });
  };

  defineExpose({
    messageRef,
  });
</script>

<template>
  <div class="message-wrapper" ref="messageRef" @click.stop="openMessageTask">
    <ContentView></ContentView>
  </div>
</template>

<style scoped lang="scss">
  .message-wrapper {
    position: absolute;
    width: 300px;
    height: 200px;
    bottom: 70px;
    right: -300px;
    color: #fff;
    background-color: #1e1e1e;
  }
</style>
