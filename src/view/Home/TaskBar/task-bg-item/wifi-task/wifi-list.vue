<script lang="ts" setup>
  import { Icon } from '@/components';
  import { wifiInfo } from './wifi-task';
  import './animate.scss';

  const currWLAN = ref('Nuc-Student');
  const curFocus = ref('Nuc-Student');

  const onItemClick = (name: string) => {
    curFocus.value = name;
  };
</script>

<template>
  <div class="wifi-list-wrapper">
    <TransitionGroup name="fade" class="container">
      <div
        class="wifi-list-item"
        v-for="item in wifiInfo"
        :key="item.name"
        :class="[curFocus === item.name ? 'focus' : '']"
        @click="onItemClick(item.name)"
      >
        <Icon>
          <img v-if="item.type === '开放'" src="@/assets/images/homePage/taskBar-img/wifi.png" />
          <img v-else src="@/assets/images/homePage/taskBar-img/wifi-lock.png" />
        </Icon>
        <div class="wifi-item-info">{{ item.name }}</div>
        <Transition name="bounce">
          <div class="wifi-type" v-if="curFocus === item.name">
            <span>已连接</span>
            <span>，{{ item.type }}</span>
          </div>
        </Transition>
        <Transition name="bounce">
          <div class="wifi-detail" v-if="curFocus === item.name">属性</div>
        </Transition>
        <WinBtn
          v-if="curFocus === item.name"
          class="wifi-connect-btn"
          :width="120"
          :height="30"
          style="font-size: 14px"
        >
          断开连接
        </WinBtn>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
  .wifi-list-wrapper {
    height: 450px;
    padding-top: 10px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #4c4c4c;
    }
    .wifi-list-item {
      padding-top: 5px;
      display: flex;
      height: 50px;
      padding-left: 10px;
      cursor: default;
      .wifi-item-info {
        margin-left: 10px;
        margin-top: 5px;
        font-weight: 300;
      }

      &:hover {
        background-color: #3b3b3b;
      }
    }
    .wifi-list-item.focus {
      position: relative;
      height: 160px;
      background-color: #115992;

      .wifi-type {
        position: absolute;
        top: 30px;
        left: 45px;
        font-size: 14px;
        color: #93b6d1;
      }
      .wifi-detail {
        position: absolute;
        top: 70px;
        left: 45px;
        font-size: 14px;
        color: #93b6d1;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
      .wifi-connect-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
</style>
