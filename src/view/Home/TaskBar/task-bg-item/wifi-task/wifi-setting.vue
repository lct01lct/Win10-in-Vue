<script lang="ts" setup>
  import { Icon } from '@/components';
  import { isSelectWifi, isSelectFlyMode, isSelectHotspot, NetSetType } from './wifi-task';

  const changeNetSetting = (netSetType: NetSetType) => {
    const resolveWifi = () => {
      if (!isSelectFlyMode.value) {
        isSelectWifi.value = !isSelectWifi.value;
      }
    };
    const resolveFlyMode = () => {
      isSelectFlyMode.value = !isSelectFlyMode.value;
    };
    const resolveHotspot = () => {
      if (!isSelectFlyMode.value) {
        isSelectHotspot.value = !isSelectHotspot.value;
      }
    };

    const map = new Map<NetSetType, Function>([
      ['wifi', resolveWifi],
      ['flyMode', resolveFlyMode],
      ['hotspot', resolveHotspot],
    ]);

    map.get(netSetType)!();
  };
</script>

<template>
  <div class="wifi-setting">
    <div class="network-setting-wrapper">
      <div class="nextwork-setting-btn">网络和 Internet 设置</div>
      <div class="network-setting-tip">更改设置，例如将某连接设置为按流量计费</div>
    </div>

    <div class="nextwork-type-select">
      <div
        class="select-item select-wifi"
        :class="[!isSelectFlyMode && isSelectWifi ? 'focus' : '']"
        @click="changeNetSetting('wifi')"
        ref="wifiRef"
      >
        <Icon :width="16" :height="16">
          <img src="@/assets/images/homePage/taskBar-img/wifi.png" alt="" />
        </Icon>
        <span class="select-item-desc">WLAN</span>
      </div>
      <div
        class="select-item select-flyMode"
        @click="changeNetSetting('flyMode')"
        ref="flyModeRef"
        :class="[isSelectFlyMode ? 'focus' : '']"
      >
        <Icon :width="16" :height="16">
          <img src="@/assets/images/homePage/taskBar-img/flyMode.png" alt="" />
        </Icon>
        <span class="select-item-desc">飞行模式</span>
      </div>
      <div
        class="select-item select-hotspot"
        :class="[!isSelectFlyMode && isSelectHotspot ? 'focus' : '']"
        @click="changeNetSetting('hotspot')"
        ref="hotspotRef"
      >
        <Icon :width="16" :height="16">
          <img src="@/assets/images/homePage/taskBar-img/hotspot.png" alt="" />
        </Icon>
        <span class="select-item-desc">移动热点</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wifi-setting {
    position: absolute;
    bottom: 5px;
  }
  .network-setting-wrapper {
    padding: 10px 20px;

    .nextwork-setting-btn {
      color: #99c6e9;
    }

    .network-setting-tip {
      color: #9f9f9f;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .nextwork-type-select {
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    width: 250px;

    .select-item {
      box-sizing: border-box;
      border: 1px solid transparent;
      width: 80px;
      height: 65px;
      background-color: #4f4f4f;
      padding: 5px;
      padding-top: 10px;
      .select-item-desc {
        display: block;
        margin-top: 15px;
        font-size: 12px;
      }
      &:hover {
        border: 1px solid #fff;
      }
    }
    .select-item.focus {
      background-color: #0077d7;
    }
  }
</style>
