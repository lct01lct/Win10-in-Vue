<script lang="ts" setup>
  import { Icon } from '@/components';
  import { wifiInfo, waitWifiInfo, wifiStatus } from './wifi-task';
  import './animate.scss';
  import anime from 'animejs';

  const currWLAN = ref('Nuc-Student');
  const curFocus = ref('Nuc-Student');

  const onItemClick = (name: string) => {
    curFocus.value = name;
  };

  const autoFullWifiInfo = () => {
    wifiInfo.length = 1;
    let waitIndex = 0;
    let waitLen = waitWifiInfo.length;
    let timer = setInterval(() => {
      if (waitIndex === waitLen) {
        clearInterval(timer);
        observer.disconnect();
      } else {
        wifiInfo.push(waitWifiInfo[waitIndex++]);
      }
    }, 500);
  };
  autoFullWifiInfo();

  const listRef = ref<HTMLElement | null>(null);

  let observer: MutationObserver;
  onMounted(() => {
    observer = new MutationObserver((mutationRecord) => {
      const currRecord = mutationRecord[mutationRecord.length - 1]; // 最新的记录
      const newNode = currRecord.addedNodes[currRecord.addedNodes.length - 1] as HTMLElement; // 新添加的节点

      if (newNode?.classList?.contains('wifi-list-item')) {
        anime({
          targets: newNode,
          opacity: ['.5', '1'],
          translateX: [20, 0],
          duration: 300,
          loop: false,
          direction: 'alternate',
          easing: 'easeInCubic',
        });
      }
    });

    observer.observe(listRef.value!, {
      subtree: true,
      childList: true,
    });
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  watch(wifiStatus, (val) => {
    if (val) {
      observer.observe(listRef.value!, {
        subtree: true,
        childList: true,
      });
      autoFullWifiInfo();
    }
  });
</script>

<template>
  <div class="wifi-list-wrapper" ref="listRef">
    <div
      class="wifi-list-item wifi-open"
      v-for="item in wifiInfo"
      :key="item.name"
      :class="[curFocus === item.name ? 'focus' : '']"
      @click="onItemClick(item.name)"
      v-if="wifiStatus"
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
    <div class="wifi-list-item wifi-close" v-else>
      <Icon>
        <img src="@/assets/images/homePage/taskBar-img/wifi.png" />
      </Icon>
      <div class="wifi-item-info">WLAN</div>
      <div class="wifi-type">
        <span>已关闭</span>
      </div>
      <div class="wifi-close-tip">需要重新打开 Wi-Fi</div>
    </div>
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
    }
    .wifi-open {
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

  .wifi-close {
    position: relative;
    .wifi-type {
      position: absolute;
      top: 30px;
      left: 45px;
      font-size: 14px;
      color: #9f9f9f;
    }
    .wifi-close-tip {
      position: absolute;
      top: 70px;
      left: 15px;
    }
  }
</style>
