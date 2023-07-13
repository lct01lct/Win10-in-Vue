<script lang="ts" setup>
  import { defineAsyncComponent } from 'vue';
  import { SettingPageOptionItem } from './setting-page';
  import SearchInput from './components/search-input.vue';
  import { setPageRoute } from './route';

  const props = defineProps<{ pageOptions: SettingPageOptionItem[]; title: string }>();

  const goBack = () => setPageRoute();
  const activeIndex = ref(0);
  const activeComp = computed(() => props.pageOptions[activeIndex.value].comp);

  const changePage = (index: number) => {
    activeIndex.value = index;
  };
</script>

<template>
  <div class="setting-page">
    <div class="setting-page__left">
      <div class="setting-page__item" @click="goBack">
        <img class="item-img" src="./img/home.png" alt="" />
        <span class="item-text">主页</span>
      </div>
      <div class="search-input-wrapper">
        <SearchInput placeholder="查找设置" autofocus></SearchInput>
      </div>
      <div class="setting-page__title">{{ title }}</div>
      <div class="setting-page__list" v-for="(item, index) in pageOptions">
        <div class="setting-page__item" @click="changePage(index)">
          <div class="isActive" v-if="index === activeIndex"></div>
          <img class="item-img" :src="item.icon" alt="" />
          <span class="item-text">{{ item.subName }}</span>
        </div>
      </div>
    </div>
    <div class="setting-page__right">
      <div class="comp-title">{{ pageOptions[activeIndex].subName }}</div>
      <component v-if="activeComp" :is="defineAsyncComponent(activeComp)"></component>
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
    overflow: auto;
    flex: 1;
    padding: 30px 20px;
    max-height: 100%;
    .comp-title {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
</style>
