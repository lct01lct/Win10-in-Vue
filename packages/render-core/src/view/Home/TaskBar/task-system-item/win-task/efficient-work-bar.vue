<script lang="ts" setup>
  import {
    MicrosoftStoreIcon,
    microsoftStoreName,
    microsoftStoreApp,
    edgeAppIcon,
    edgeAppName,
    edgeApp,
  } from '@/system-app';
  import { Popover } from '@/components';

  const popoverRef = inject<InstanceType<typeof Popover>>('popoverRef');

  const blocks = [
    { icon: MicrosoftStoreIcon, name: microsoftStoreName, click: () => microsoftStoreApp.open() },
    { icon: edgeAppIcon, name: edgeAppName, click: () => edgeApp.open() },
  ];

  const wrapperBlockClick = async (fn: Function) => {
    await popoverRef?.close();
    fn();
  };
</script>

<template>
  <div class="efficient-work-bar">
    <div class="efficient-work-bar__section">
      <div class="section-title">高效工作</div>
      <div class="block-list">
        <div
          class="block-item"
          v-for="item in blocks"
          :key="item.name"
          @click="wrapperBlockClick(item.click)"
        >
          <img class="item-img" :src="item.icon" alt="" />
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .efficient-work-bar {
    height: 100%;
    width: 330px;
    padding: 20px;
    .efficient-work-bar__section {
      font-size: 12px;
      .section-title {
        margin-bottom: 10px;
      }
      .block-list {
        display: flex;
        flex-wrap: wrap;

        .block-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          margin-bottom: 5px;
          width: 100px;
          height: 100px;
          background-color: #454545;
          border: 3px solid transparent;
          &:hover {
            border-color: #b1b1b1;
          }

          .item-img {
            width: 45px;
            height: 45px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
</style>
