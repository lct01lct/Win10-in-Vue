<script lang="ts" setup>
  import { R_getAllApplications, ApplicationDesc } from 'model-core';

  const apps = reactive<ApplicationDesc[]>([]);
  const getApps = async () => {
    const res = await R_getAllApplications();
    if (res?.status === 'success') {
      apps.length = 0;
      apps.push(...res?.data?.apps!);
    }
  };

  getApps();
</script>

<template>
  <div class="microsoft-slider"></div>
  <div class="app-list">
    <div class="app-block__title">
      热门免费应用
      <i class="iconfont icon-xiangyou"></i>
    </div>
    <div class="app-item" v-for="app in apps" :key="app._id">
      <div class="app-logo">
        <img :src="app.icon" alt="" />
      </div>
      <div class="app-info">
        <div class="app-name">{{ app.name }}</div>
        <div class="desc">{{ app.icon }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

  @keyframes title-transform {
    100% {
      transform: translate(10px, 0);
    }
  }

  @keyframes app-transform {
    100% {
      transform: translate(0, 20px);
    }
  }
</style>
