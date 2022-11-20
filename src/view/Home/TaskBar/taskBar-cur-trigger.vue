<script lang="ts" setup>
  import { PropType } from 'vue';
  import { Icon } from '@/components';
  import { getWinAppScope, WinApp } from '@/app';

  const { name, winApp } = defineProps({
    iconPath: {
      type: String,
      required: true,
    },
    winApp: {
      type: Object as PropType<WinApp>,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
  });

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
      winApp.hide();
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
