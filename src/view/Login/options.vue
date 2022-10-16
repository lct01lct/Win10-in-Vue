<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
  import { maskVisible } from './login';

  const showdown = () => {
    location.reload();
  };
</script>

<template>
  <div class="options-wrapper">
    <div class="options-btn wifi-btn">
      <Icon>
        <img src="../../assets/images/loginPage/wifi.png" alt="" />
      </Icon>
    </div>
    <div class="options-btn easy-use-btn" v-if="maskVisible">
      <Icon>
        <img src="../../assets/images/loginPage/RestartTonight_80_contrast-black.png" alt="" />
      </Icon>
    </div>
    <div class="options-btn shutdown-btn" @click="showdown">
      <Icon>
        <img src="../../assets/images/loginPage/RestartNowPower_80.png" alt="" />
      </Icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .options-wrapper {
    position: absolute;
    z-index: 2;
    right: 70px;
    bottom: 40px;
    color: #fff;

    .options-btn {
      cursor: pointer;
      float: left;
      margin-left: 40px;
    }
  }
</style>
