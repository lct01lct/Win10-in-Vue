<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';

  const systemTaskImgList = reactive([
    {
      tp: '/src/assets/images/homePage/taskBar-img/win-logo.png',
      tp1: '/src/assets/images/homePage/taskBar-img/win-logo-active.png',
      className: 'win-logo',
      show: true,
    },
    {
      tp: '/src/assets/images/homePage/taskBar-img/search.png',
      tp1: '/src/assets/images/homePage/taskBar-img/search.png',
      className: 'search',
      show: true,
    },
    {
      tp: '/src/assets/images/homePage/taskBar-img/cortana.svg',
      tp1: '/src/assets/images/homePage/taskBar-img/cortana.svg',
      className: 'cortana',
      show: true,
    },
  ]);

  const sysytmTaskIconMouseenterHandler = (index: number) => {
    systemTaskImgList[index].show = !systemTaskImgList[index].show;
  };

  const sysytmTaskIconMouseleaveHandler = (index: number) => {
    systemTaskImgList[index].show = !systemTaskImgList[index].show;
  };
</script>

<template>
  <div class="taskBar-wrapper">
    <div class="system-task-wrapper">
      <div
        class="system-task-item"
        v-for="(item, index) in systemTaskImgList"
        :key="item.className"
        @mouseenter="sysytmTaskIconMouseenterHandler(index)"
        @mouseleave="sysytmTaskIconMouseleaveHandler(index)"
      >
        <Icon :width="20" :height="20">
          <img :src="item.tp" alt="" v-if="item.show" />
          <img :src="item.tp1" alt="" v-if="!item.show" />
        </Icon>
      </div>
    </div>
  </div>
  <div class="current-task-wrapper"></div>
  <div class="background-task-wrapper"></div>
</template>

<style scoped lang="scss">
  .taskBar-wrapper {
    display: flex;
    position: absolute;
    bottom: 0;

    width: 100%;
    background-color: #1d1f20;

    .system-task-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      .system-task-item {
        display: flex;
        width: 45px;
        height: 50px;
        > .icon {
          height: 50px;
          margin: auto;
        }

        &:hover {
          background-color: #333536;
        }

        &:nth-child(n + 1) {
          margin-left: 3px;
        }
      }
    }
  }
</style>
