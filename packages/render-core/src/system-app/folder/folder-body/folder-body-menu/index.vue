<script lang="ts" setup>
  import type { AppViewSizeOpt, SubscribeResizeMovingType, WinApp } from '@/app';

  const subscribeResizeMoving = inject<SubscribeResizeMovingType>('subscribeResizeMoving')!;

  const menuVisible = ref<boolean>(true);
  const menuFocusItem = ref<string>('');
  const appInstance = inject<WinApp>('appInstance')!;

  onMounted(async () => {
    await nextTick();

    appInstance._dom.addEventListener('click', () => {
      menuFocusItem.value = '';
    });
  });

  subscribeResizeMoving(({ width }: Required<AppViewSizeOpt>) => {
    if (width < 300) {
      menuVisible.value = false;
    } else {
      menuVisible.value = true;
    }
  });

  interface MeunItem {
    menuName: string;
    onClick?: () => void;
  }

  const menuList = [{ menuName: '主页' }, { menuName: '共享' }, { menuName: '查看' }] as MeunItem[];

  menuList.forEach((item) => {
    const originFn = item.onClick;

    item.onClick = () => {
      menuFocusItem.value = item.menuName;
      originFn && originFn();
    };
  });
</script>

<template>
  <div class="folder-body-menu-wrapper" v-if="menuVisible">
    <div class="menu-list" @click.stop>
      <div
        class="menu-item"
        style="background: #0066b4; color: #fff"
        @click="menuFocusItem = '文件'"
      >
        文件
      </div>
      <div
        class="menu-item"
        v-for="menuItem in menuList"
        :class="[menuItem.menuName === menuFocusItem ? 'focus' : '']"
        :key="menuItem.menuName"
        @click="menuItem.onClick"
      >
        {{ menuItem.menuName }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .folder-body-menu-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1px;
    border-bottom: 1px solid #ccc;

    .menu-list {
      display: flex;
      height: 20px;

      .menu-item {
        width: 60px;
        font-size: 13px;
        text-align: center;
        line-height: 20px;
        border: 1px solid transparent;
      }
      .menu-item.focus {
        background-color: #f5f6f7;
        border: 1px solid #dadbdc;
      }
    }
  }
</style>
