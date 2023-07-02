<script lang="ts" setup>
  import DocIcon from '@/assets/images/homePage/taskBar-img/doc.png';
  import SettingIcon from '@/assets/images/homePage/taskBar-img/setting.png';
  import PictureIcon from '@/assets/images/homePage/taskBar-img/picture.png';
  import ShutdownIcon from '@/assets/images/loginPage/RestartNowPower_80.png';
  import useUserStore from '@/store/user';
  import { handleBackendPath, sleep } from 'utils';
  import { Overlay } from '@/components';
  import noop from 'lodash/fp/noop';

  const userStore = useUserStore();
  const opRef = ref<InstanceType<typeof Overlay>>();
  const triggerRef = ref<HTMLElement>();

  const bottomBar = [
    {
      icon: handleBackendPath(userStore.user?.avatar!),
      name: userStore.user?.username,
    },
    { icon: DocIcon, name: '文档' },
    { icon: PictureIcon, name: '图片' },
    { icon: SettingIcon, name: '设置' },
    { icon: ShutdownIcon, name: '电源' },
  ];

  const subscribePopoverEnter = inject('subscribePopoverEnter', noop);

  subscribePopoverEnter(async () => {
    await sleep(500);
    const oTrigger = triggerRef.value;
    if (oTrigger) {
      opRef.value?.hover(oTrigger);
    }
  });
</script>

<template>
  <div class="setting-task-bar" ref="triggerRef">
    <div class="setting-task-bar__top">
      <div class="img-wrapper">
        <img class="item-img" src="@/assets/images/homePage/taskBar-img/menu.png" alt="" />
      </div>
    </div>
    <div class="setting-task-bar__bottom">
      <div class="img-wrapper" v-for="item in bottomBar" :key="item.name">
        <img class="item-img" :src="item.icon" alt="" />
      </div>
    </div>
  </div>

  <Overlay ref="opRef" pos="right" animate-dir="left">
    <div class="setting-overlay">
      <div class="setting-overlay__top">
        <div class="setting-name">开始</div>
      </div>
      <div class="setting-overlay__bottom">
        <div class="setting-name" v-for="{ name } in bottomBar" :key="name">
          {{ name }}
        </div>
      </div>
    </div>
  </Overlay>
</template>

<style scoped lang="scss">
  .setting-task-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 50px;

    .setting-task-bar-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    &:hover {
      background-color: #5f5d5b;
    }

    .item-img {
      border-radius: 40%;
      width: 20px;
      height: 20px;
    }
  }

  .setting-overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    height: 600px;
    background-color: #1e1e1e;
    opacity: 1;
    color: #fff;
    border-right: 1px solid #000;
    .setting-name {
      height: 50px;
      line-height: 50px;
      padding-left: 30px;
      &:hover {
        background-color: #5f5d5b;
      }
    }
  }
</style>
