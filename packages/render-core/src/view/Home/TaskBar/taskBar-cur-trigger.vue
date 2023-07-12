<script lang="ts" setup>
  import { Icon } from '@/components';
  import { getWinAppScope, WinApp, taskBarTriggerList, WinAppDOM } from '@/app';
  import { toggleZIndex, getOpenedAppLen } from '@/app/base/taskBar';

  const { winApp } = defineProps<{ iconPath: string; winApp: WinApp; name: string }>();

  const appIsShow = ref<boolean>(false);
  onMounted(async () => {
    await nextTick();
    const { isShow } = getWinAppScope(winApp._dom);

    watchEffect(() => {
      appIsShow.value = isShow.value;
    });
  });

  const onTriggerClick = () => {
    if (appIsShow.value) {
      const isCovered =
        taskBarTriggerList.find((item) => item.winApp === winApp)!.zIndex < getOpenedAppLen();

      if (isCovered) {
        toggleZIndex(winApp._dom);
      } else {
        winApp.hide();
      }
    } else {
      winApp.show();
    }
  };
</script>

<template>
  <div class="task-cur-trigger-item" @click="onTriggerClick" :class="[appIsShow ? 'show' : '']">
    <Icon>
      <img :src="iconPath" alt="" />
    </Icon>
  </div>
</template>

<style scoped lang="scss">
  .task-cur-trigger-item {
    position: relative;
    display: flex;
    width: 55px;
    height: 50px;
    margin-right: 5px;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #373838;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      background-color: #99c6e9;
      width: 40px;
      height: 3px;
      bottom: 0;
    }
  }

  .task-cur-trigger-item.show {
    background-color: #4d4e4f;
  }
</style>
