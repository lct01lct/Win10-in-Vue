<script lang="ts" setup>
  import { Progess, Icon } from '@/components';
  import { settingList, SettingItem, progessVal } from './setting';
  import { setBrightnessVal } from '@/view/Home/Modal';

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
</script>

<template>
  <div class="setting-wrapper">
    <div class="setting-header">折叠</div>
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
    .setting-header {
      color: #99c6e9;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
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
