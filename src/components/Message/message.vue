<script lang="ts" setup>
  const { content } = defineProps({
    content: {
      type: [String, Object],
      require: true,
      default: '',
    },
  });

  const ContentView = () => {
    if (typeof content === 'string') {
      return h('div', { innerHTML: content, class: 'message-content' });
    } else {
      return h(content!);
    }
  };

  const messageRef = ref<HTMLElement>();

  defineExpose({
    messageRef,
  });
</script>

<template>
  <div class="message-wrapper" ref="messageRef">
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
