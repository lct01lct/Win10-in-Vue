<script lang="ts" setup>
  import DocIcon from '@/assets/images/homePage/taskBar-img/doc.png';
  import SettingIcon from '@/assets/images/homePage/taskBar-img/setting.png';
  import PictureIcon from '@/assets/images/homePage/taskBar-img/picture.png';
  import ShutdownIcon from '@/assets/images/loginPage/RestartNowPower_80.png';
  import { useUserStore, router } from 'model-core';

  import { R_logout } from 'model-core';
  import { folderApp, settingApp } from '@/system-app';
  import { Popover } from '@/components';
  import { sleep } from 'utils';

  const userStore = useUserStore();
  const triggerRef = ref<HTMLElement>();
  const popoverRef = inject<InstanceType<typeof Popover>>('popoverRef');

  const waitPopoverClose = async () => {
    if (popoverRef) {
      popoverRef.close();
      await sleep(0);
    }
  };

  const openFolder = async (folderName: string) => {
    await waitPopoverClose();

    folderApp.open({
      folderName,
    });
  };

  const bottomBar = [
    {
      icon: userStore.user?.avatar!,
      name: userStore.user?.username,
    },
    {
      icon: DocIcon,
      name: '文档',
      onClick: () => openFolder('Video'),
    },
    { icon: PictureIcon, name: '图片', onClick: () => openFolder('Music') },
    {
      icon: SettingIcon,
      name: '设置',
      onClick: async () => {
        await waitPopoverClose();
        settingApp.open({
          width: 1000,
          height: 600,
        });
      },
    },
    {
      icon: ShutdownIcon,
      name: '电源',
      async onClick() {
        await R_logout();
        userStore.setToken('loggedout');
        userStore.user = null;
        router.push('/');
      },
    },
  ];
</script>

<template>
  <div class="setting-task-bar" ref="triggerRef">
    <div class="setting-task-bar__icon">
      <div class="setting-task-bar__top setting-task-bar__section">
        <div class="item-wrapper">
          <img class="item-img" src="@/assets/images/homePage/taskBar-img/menu.png" alt="" />
          <span class="item-text">开始</span>
        </div>
      </div>
      <div class="setting-task-bar__bottom setting-task-bar__section">
        <div
          class="item-wrapper"
          v-for="(item, index) in bottomBar"
          :key="item.name"
          @click="item?.onClick"
        >
          <img
            class="item-img"
            :src="item.icon"
            alt=""
            :style="{ borderRadius: index ? '0%' : '50%' }"
          />
          <span class="item-text">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .setting-task-bar {
    position: relative;
    height: 100%;
    width: 50px;
  }

  .setting-task-bar__section {
    display: flex;
    flex-direction: column;
  }

  .item-wrapper {
    display: flex;
    align-items: center;
    width: 250px;
    height: 50px;
    &:hover {
      background-color: #5f5d5b;
    }

    .item-img {
      width: 20px;
      padding: 15px;
      height: 20px;
    }
  }

  .setting-task-bar__icon {
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 50px;
    top: 0;
    left: 0;

    &:hover {
      width: 250px;
      background-color: #2c2c2b;
      opacity: 1;
      animation: drawer 0.3s ease;
    }
  }

  @keyframes drawer {
    0% {
      width: 50px;
    }

    100% {
      width: 250px;
    }
  }
</style>
