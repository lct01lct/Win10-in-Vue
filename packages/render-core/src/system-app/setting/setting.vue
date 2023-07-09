<script lang="ts" setup>
  import { Base } from '@/app';
  import { settingAppName } from '.';
  import SettingBody from './setting-body.vue';
  import { isRenderPage, setPageRoute } from './route';

  const goBack = () => {
    setPageRoute();
  };
</script>

<template>
  <Base :appName="isRenderPage ? undefined : settingAppName">
    <template v-if="isRenderPage" #header>
      <div class="setting-app__header">
        <div class="iconfont icon-jiantou_xiangzuo" @click="goBack"></div>
        <div class="setting-app__name">设置</div>
      </div>
    </template>
    <template #body>
      <SettingBody></SettingBody>
    </template>
  </Base>
</template>

<style scoped lang="scss">
  .setting-app__header {
    display: flex;
    width: 300px;
    height: 32px;
    background-color: #eef0f2;

    .iconfont {
      width: 40px;
      height: 32px;
      text-align: center;
      line-height: 32px;

      &:hover {
        color: #fff;
        background-color: #1985da;
      }
    }

    .setting-app__name {
      margin-left: 20px;
      font-size: 12px;
      line-height: 32px;
    }
  }
</style>
