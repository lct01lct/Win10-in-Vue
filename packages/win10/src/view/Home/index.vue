<script lang="ts" setup>
  import DeskTop from './DeskTop/index.vue';
  import TaskBar from './TaskBar/index.vue';
  import Modal from './Modal/index.vue';
  import { request } from '@/service';

  const checkIsLogin = async () => {
    const res = await request.get('/users/me');
    console.log(res);
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
