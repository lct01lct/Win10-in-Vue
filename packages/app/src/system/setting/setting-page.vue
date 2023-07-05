<script lang="ts" setup>
  import { SettingPageOptionItem } from './setting-page';
  import SearchInput from './components/search-input.vue';
  import { setPageRoute } from './route';

  const props = defineProps<{ pageOptions: SettingPageOptionItem[]; title: string }>();

  const goBack = () => setPageRoute();
  const activeIndex = ref(0);
  const activeComp = ref(props.pageOptions[0].comp);

  const changePage = (item: SettingPageOptionItem, index: number) => {
    activeIndex.value = index;
  };
</script>

<template>
  <div class="setting-page">
    <div class="setting-page__left">
      <div class="setting-page__item">
        <img class="item-img" src="./img/home.png" alt="" />
        <span class="item-text" @click="goBack">主页</span>
      </div>
      <div class="search-input-wrapper">
        <SearchInput placeholder="查找设置" autofocus></SearchInput>
      </div>
      <div class="setting-page__title">{{ title }}</div>
      <div class="setting-page__list" v-for="(item, index) in pageOptions">
        <div class="setting-page__item" @click="changePage(item, index)">
          <div class="isActive" v-if="index === activeIndex"></div>
          <img class="item-img" :src="item.icon" alt="" />
          <span class="item-text">{{ item.subName }}</span>
        </div>
      </div>
    </div>
    <div class="setting-page__right">
      <component v-if="activeComp" :is="activeComp"></component>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .setting-page {
    display: flex;
    height: 100%;
    .setting-page__left {
      width: 300px;
      background-color: #eef0f2;
      .search-input-wrapper {
        padding: 10px 20px;
      }
      .setting-page__title {
        font-weight: 700;
        font-size: 14px;
        padding: 15px 20px;
        padding-bottom: 40px;
      }

      .setting-page__item {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;
        padding: 15px 20px;
        &:hover {
          background-color: #e0e0e0;
        }
        .item-img {
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }
        .isActive {
          position: absolute;
          top: 11px;
          left: 0px;
          background-color: #1985da;
          width: 4px;
          height: 25px;
        }
      }
    }
  }

  .setting-page__right {
    flex: 1;
    height: 100%;
  }
</style>
