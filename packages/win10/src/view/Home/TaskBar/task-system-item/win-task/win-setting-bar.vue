<script lang="ts" setup>
  import DocIcon from '@/assets/images/homePage/taskBar-img/doc.png';
  import SettingIcon from '@/assets/images/homePage/taskBar-img/setting.png';
  import PictureIcon from '@/assets/images/homePage/taskBar-img/picture.png';
  import ShutdownIcon from '@/assets/images/loginPage/RestartNowPower_80.png';
  import useUserStore from '@/store/user';
  import { handleBackendPath } from 'utils';

  const userStore = useUserStore();

  const userItem = {
    icon: handleBackendPath(userStore.user?.avatar!),
    name: userStore.user?.username,
  };

  const bottomBar = [
    userItem,
    { icon: DocIcon, name: '文档' },
    { icon: PictureIcon, name: '图片' },
    { icon: SettingIcon, name: '设置' },
    { icon: ShutdownIcon, name: '电源' },
  ];
</script>

<template>
  <div class="setting-task-bar">
    <div class="setting-task-bar__top">
      <img src="" alt="" />
    </div>
    <div class="setting-task-bar__bottom">
      <div class="bottom__item" v-for="item in bottomBar" :key="item.name">
        <img class="item-img" :src="item.icon" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .setting-task-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 50px;
    .setting-task-bar__top {
    }
    .setting-task-bar__bottom {
      .bottom__item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        &:hover {
          background-color: #5f5d5b;
        }
        .item-img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
