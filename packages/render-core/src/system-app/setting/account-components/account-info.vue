<script lang="ts" setup>
  import { useUserStore } from 'model-core';
  import { User, Role, Role_CN } from 'model-core';
  import CompTitle from '../components/comp-title.vue';
  import CardItem from '../components/card-item.vue';
  import CameraIcon from './img/camera.png';
  import WhiteBoardIcon from './img/whiteboard.png';
  import { cameraApp } from '@/system-app';

  const userStore = useUserStore();
  const user: User = userStore.user!;
  const role = user.role === Role.Admin ? Role_CN.Admin : Role.User;
  const fileIptRef = shallowRef<HTMLInputElement>();

  const onCameraClick = () => {
    cameraApp.open({
      width: 400,
      height: 400,
      minWidth: 400,
      minHeight: 400,
    });
  };

  const onBoardClick = () => {
    const oFile = fileIptRef.value;

    if (oFile) {
      oFile.click();
    }
  };

  const onFileIptChange = () => {
    const oFile = fileIptRef.value;

    if (oFile) {
      const wallpaper = oFile.files?.[0];
    }
  };
</script>

<template>
  <div class="account-info">
    <div class="account-info__avatar">
      <img class="avatar-img" :src="user.avatar" />
    </div>
    <div class="account-info__username">{{ user.username }}</div>
    <div class="account-info__email">{{ user.email }}</div>
    <div class="account-info__role">{{ role }}</div>
  </div>

  <CompTitle title="创建头像"></CompTitle>
  <CardItem :icon="CameraIcon" name="摄像头" @click="onCameraClick"></CardItem>
  <CardItem :icon="WhiteBoardIcon" name="从现有图片选择" @click="onBoardClick"></CardItem>
  <input
    type="file"
    ref="fileIptRef"
    style="display: none"
    @change="onFileIptChange"
    accept=".png,.jpg,jpeg,svg"
  />
</template>

<style scoped lang="scss">
  .account-info__avatar {
    .avatar-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }

  .account-info__username {
    font-size: 24px;
    font-weight: 700;
  }

  .account-info__email,
  .account-info__role {
    font-size: 14px;
    color: #7b7b7b;
    margin-top: 4px;
  }
</style>
