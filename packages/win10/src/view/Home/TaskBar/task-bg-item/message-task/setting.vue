<script lang="ts" setup>
  import { Progess, Icon } from '@/components';
  import { settingList, SettingItem, progessVal } from './setting';
  import { setBrightnessVal } from '@/view/Home/Modal';
  import anime from 'animejs';

  const onItemClick = (item: SettingItem) => {
    if (item.onTrigger) {
      item.onTrigger();
    } else {
      item.isFocus = !item.isFocus;
    }
  };

  const onProgessMove = (val: number) => {
    setBrightnessVal(val);
  };

  const isShowFlod = ref<boolean>(true);
  const settingWrapperRef = ref<HTMLElement>();

  const foldSettingWrapper = () => {
    const height = [280, 280 + 280];
    if (isShowFlod.value) {
      height[0] = 280;
      height[1] = 280 + 280;
    } else {
      height[1] = 280;
      height[0] = 280 + 280;
    }
    anime({
      targets: document.querySelector('.message-list')!,
      duration: 300,
      height,
      loop: false,
      direction: 'alternate',
      easing: 'easeInCubic',
    });
    isShowFlod.value = !isShowFlod.value;
  };
</script>

<template>
  <div class="setting-wrapper" ref="settingWrapperRef">
    <div class="setting-header" @click="foldSettingWrapper">{{ isShowFlod ? '折叠' : '展开' }}</div>
    <div class="setting-list">
      <div
        class="setting-item"
        :class="[item.isFocus ? 'focus' : '']"
        v-for="item in settingList"
        :key="item.name"
        @click="onItemClick(item)"
      >
        <Icon :width="18" :height="18">
          <img :src="item.icon" alt="" />
        </Icon>
        <span class="setting-item-name">{{ item.name }}</span>
      </div>
      <div
        class="setting-item"
        v-for="item in settingList.length % 4 ? 4 - (settingList.length % 4) : 0"
        style="opacity: 0"
      >
        {{ item }}
      </div>
    </div>
    <div class="setting-brightness">
      <Icon :width="20" :height="20">
        <img src="@/assets/images/homePage/taskBar-img/nightmode.png" alt="" />
      </Icon>
      <Progess v-model="progessVal" type="percent" :width="250" @move="onProgessMove"></Progess>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .setting-wrapper {
    padding: 0 20px;
    cursor: default;
    .setting-header {
      color: #99c6e9;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      &:hover {
        color: #fff;
      }
    }
    .setting-list {
      height: 260px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;

      .setting-item {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 84px;
        height: 61px;
        padding: 5px;
        background-color: #4f4f4f;
        .setting-item-name {
          font-size: 12px;
          margin-top: 20px;
        }
      }
    }
    .setting-item.focus {
      background-color: #0078d7;
    }
    .setting-brightness {
      padding: 15px 20px;
      display: flex;
      align-items: center;
    }
  }
</style>
