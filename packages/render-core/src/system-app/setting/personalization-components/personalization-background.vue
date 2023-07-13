<script lang="ts" setup>
  import { useUserStore } from 'model-core';
  import { toRef } from 'vue';
  import Button from '../components/button.vue';
  import Select from '../components/select.vue';
  import { R_getAllWallpapers, R_updateMe } from 'model-core';
  import UploadFile from '../components/upload-file.vue';

  const userStore = useUserStore();
  const user = toRef(userStore, 'user');
  const bgType = ref<'图片' | '纯色'>('图片');
  const bgOptions = [
    { label: '图片', value: '图片' },
    { label: '纯色', value: '纯色' },
  ];

  const wallpapers = reactive<string[]>([]);

  (async () => {
    const res = await R_getAllWallpapers();
    if (res?.data?.wallpapers) {
      wallpapers.push(...res.data.wallpapers);
    }
  })();

  const onWallpaperClick = async (wallpaper: string) => {
    await changeWallpaper(wallpaper);
  };

  const onUploadFileChange = async (file: File) => {
    await changeWallpaper(file);
  };

  const changeWallpaper = async (wallpaper: File | string) => {
    const res = await R_updateMe({ wallpaper });
    const user = res?.data?.user;

    if (user) {
      userStore.setUser(user);
    }
  };
</script>

<template>
  <div class="preview">
    <img class="preview-img" :src="user?.wallpaper" alt="" />
    <img class="default-img" src="./img/preview-default.png" alt="" />
  </div>
  <div class="item-title">背景</div>
  <Select v-model="bgType" :options="bgOptions"></Select>

  <template v-if="bgType === '图片'">
    <div class="item-title">选择图片</div>
    <div class="wallpaper-list">
      <template v-for="wallpaper in wallpapers">
        <div
          v-if="wallpaper !== user?.wallpaper"
          class="wallpaper-item"
          @click="onWallpaperClick(wallpaper)"
        >
          <img :src="wallpaper" alt="" class="wallpaper-img" />
        </div>
      </template>
    </div>

    <UploadFile @change="onUploadFileChange" accept=".png,.jpg,jpeg,svg">
      <Button @click="">浏览</Button>
    </UploadFile>
  </template>
  <template v-else>
    <div class="item-title">选择你的背景色</div>
  </template>
</template>

<style scoped lang="scss">
  .preview {
    position: relative;
    width: 350px;
    height: calc(350px * 2400px / 3840px);
    .preview-img {
      width: 100%;
      height: 100%;
    }

    .default-img {
      bottom: 0;
      left: 0;
      width: 50%;
      height: 60%;
      position: absolute;
    }
  }

  .item-title {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .wallpaper-list {
    margin-bottom: 5px;
    .wallpaper-item {
      display: inline-block;
      margin-right: 5px;
      width: 80px;
      height: 80px;
      .wallpaper-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
