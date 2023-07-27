<script lang="ts" setup>
  import { R_getAllApplications, ApplicationDesc, useUserStore } from 'model-core';
  import { useDownloadApp } from './download';
  const userStore = useUserStore();
  const apps = reactive<ApplicationDesc[]>([]);
  const filterAppIds = computed(() => userStore.user?.downloadedApp);
  const showApps = computed(() => apps.filter((app) => !filterAppIds.value?.includes(app._id)));

  const getApps = async () => {
    const res = await R_getAllApplications();
    if (res?.status === 'success') {
      apps.length = 0;
      apps.push(...res?.data?.apps!);
    }
  };

  getApps();

  const downloadApp = async (app: ApplicationDesc) => {
    try {
      useDownloadApp(app);
    } catch (err) {
      throw new Error('Microsoft-store: Something was wrong!');
    }
  };
</script>

<template>
  <div class="microsoft-store-body">
    <div class="microsoft-slider">
      <img class="slider-img" src="./img/lucacover.jpg" alt="" />
    </div>
    <div class="app-list">
      <div class="app-block__title">
        热门免费应用
        <i class="iconfont icon-xiangyou"></i>
      </div>
      <div class="apps-wrapper">
        <div class="app-item" v-for="app in showApps" :key="app._id">
          <div class="app-logo">
            <img class="app-icon" :src="app.icon" alt="" />
          </div>
          <div class="app-info">
            <div class="app-name">{{ app.name }}</div>
            <div class="app-desc">{{ app.rating.toFixed(1) }} {{ app.desc }}</div>
          </div>
          <div class="download-btn" @click="downloadApp(app)">点击下载</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .slider-img {
    width: 100%;
  }
  .microsoft-store-body {
    padding: 20px;
    background-color: #f9f9f9;
  }
  .app-list {
    padding: 10px;
    .app-block__title {
      font-size: 20px;
      font-weight: 700;
      .iconfont {
        font-size: 16px;
        font-weight: 400;
      }

      &:hover {
        animation: title-transform 0.3s forwards;
      }
    }
  }

  .apps-wrapper {
    padding: 20px 35px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .app-item {
      position: relative;
      width: 280px;
      margin-bottom: 12px;
      padding: 20px;
      display: flex;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 10px;
      .app-icon {
        width: 80px;
        height: 80px;
      }
      .app-info {
        margin-left: 20px;
        font-size: 14px;
        .app-name {
          font-weight: 700;
        }
        .app-desc {
          margin-top: 10px;
          color: #8c8c8c;
        }
      }
      .download-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 12px;
        background-color: #f7f7f7;
        padding: 5px 10px;
        border-radius: 5px;
      }
      &:hover {
        animation: app-transform 0.5s forwards;
      }
    }
  }

  @keyframes title-transform {
    100% {
      transform: translate(10px, 0);
    }
  }

  @keyframes app-transform {
    100% {
      transform: translate(0, -5px);
    }
  }
</style>
