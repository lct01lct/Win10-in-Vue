<script lang="ts" setup>
  import DeskTop from './DeskTop/index.vue';
  import TaskBar from './TaskBar/index.vue';
  import Modal from './Modal/index.vue';
  import { R_getMe, useUserStore } from 'model-core';

  const userStore = useUserStore();
  const checkIsLogin = async () => {
    const res = await R_getMe();
    if (res?.status === 'failed') {
      userStore.user = null;
    } else {
      userStore.setUser(res!.data!.user);
    }
  };

  checkIsLogin();
</script>

<template>
  <div class="home-wrapper">
    <Modal></Modal>
    <DeskTop></DeskTop>
    <TaskBar></TaskBar>
  </div>
</template>

<style scoped></style>
