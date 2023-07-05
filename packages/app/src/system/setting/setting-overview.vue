<script lang="ts" setup>
  import { setPageRoute } from './route';
  import { SettingPageOpenRoute, settingPageInfo } from './setting-page';
  import SearchInput from './components/search-input.vue';

  const onPageBlockClick = (route: SettingPageOpenRoute) => {
    setPageRoute(route);
  };
</script>

<template>
  <div class="setting-app__overview-page">
    <div class="overview-page__header">
      <div class="title">Windows 设置</div>
      <SearchInput :width="250" placeholder="查找设置" autofocus></SearchInput>
    </div>
    <div class="page-list">
      <div class="page-list-inner">
        <div class="page-item" v-for="item in settingPageInfo" @click="onPageBlockClick(item.name)">
          <img class="item-img" :src="item.icon" alt="" />
          <div class="text">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-desc">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .overview-page__header {
    display: flex;
    flex-direction: column;
    font-size: 25px;
    font-weight: lighter;
    align-items: center;
    margin-top: 20px;
    .title {
      margin-bottom: 20px;
    }
  }

  .page-list {
    margin-top: 20px;
    padding: 10px 40px;
    display: flex;
    justify-content: center;
    .page-list-inner {
      display: inline-flex;
      flex-wrap: wrap;
    }
    .page-item {
      display: flex;
      width: 180px;
      height: 40px;
      padding: 20px;
      border: 3px solid transparent;
      &:hover {
        border: 3px solid #e1e1e1;
      }

      .item-img {
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }

      .text {
        display: flex;
        flex-direction: column;
        .item-name {
          font-size: 14px;
        }
        .item-desc {
          font-size: 12px;
          color: #666666;
        }
      }
    }
  }
</style>
