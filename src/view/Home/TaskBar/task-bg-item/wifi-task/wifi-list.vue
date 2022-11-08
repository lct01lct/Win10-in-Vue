<script lang="ts" setup>
  import { Icon } from '@/components';
  import { wifiInfo } from './wifi-task';
</script>

<template>
  <div class="wifi-list-wrapper">
    <div class="wifi-list-item" v-for="item in wifiInfo" :key="item.name">
      <Icon>
        <img v-if="item.type === '开放式'" src="@/assets/images/homePage/taskBar-img/wifi.png" />
        <img v-else src="@/assets/images/homePage/taskBar-img/wifi-lock.png" />
      </Icon>
      <div class="wifi-item-info">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wifi-list-wrapper {
    height: 450px;
    .wifi-list-item {
      height: 70px;
    }
  }
</style>
