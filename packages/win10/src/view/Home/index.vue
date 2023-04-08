<script lang="ts" setup>
  import DeskTop from './DeskTop/index.vue';
  import TaskBar from './TaskBar/index.vue';
  import Modal from './Modal/index.vue';
</script>

<template>
  <div class="home-wrapper">
    <Modal></Modal>
    <DeskTop></DeskTop>
    <TaskBar></TaskBar>
  </div>
</template>

<style scoped></style>
