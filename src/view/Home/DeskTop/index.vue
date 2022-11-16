<script lang="ts" setup>
  import Test from './test.vue';
  import { message, Message } from '@/components';

  let mess: Message;
  const onClick = () => {
    mess = message(h(Test), {
      click() {
        console.log(1);
      },
    });
  };
  const onClose = async () => {
    (await mess)!.close();
  };
</script>

<template>
  <div class="deskTop-wrapper">
    loading...
    <button @click="onClick">btn</button>
    <button @click="onClose">close</button>
  </div>
</template>

<style scoped></style>
