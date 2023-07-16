<script lang="ts" setup>
  import { WinApp } from '@/app';
  import { Popover } from '@/components';

  const apps = WinApp.registeredAppList;
  const popoverRef = inject<InstanceType<typeof Popover>>('popoverRef');

  interface AppGroup {
    firstChar: string;
    apps: WinApp[];
  }
  const appgroups = computed(() => {
    const firstCharMap = new Map<string, WinApp[]>();

    for (const app of apps) {
      if (!app.isFromSystem) {
        const firstChar = app.pinyin_name[0];
        const appArr = firstCharMap.get(firstChar) || [];
        appArr.push(app);
        firstCharMap.set(firstChar, appArr);
      }
    }

    return Array.from(firstCharMap)
      .reduce<AppGroup[]>((arr, item) => {
        arr.push({ firstChar: item[0], apps: item[1] });
        return arr;
      }, [])
      .sort((a, b) => (a.firstChar < b.firstChar ? -1 : 1));
  });

  const onAppClick = (app: WinApp) => {
    popoverRef?.close();
    app.open();
  };
</script>

<template>
  <div class="application-bar">
    <div class="application-group" v-for="item in appgroups" :key="item.firstChar">
      <div class="first-char">{{ item.firstChar }}</div>
      <div class="app-list">
        <div class="app-item" v-for="app in item.apps" @click="onAppClick(app)">
          <img class="img-icon" :src="app._logo" alt="" />
          <span>{{ app.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .application-bar {
    flex: 1;
    height: 100%;
    padding-top: 10px;
    font-size: 12px;
  }
  .first-char {
    padding-left: 20px;
    height: 35px;
    line-height: 35px;
  }
  .app-item {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 35px;
    .img-icon {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }
    &:hover {
      background-color: #4f5050;
    }
  }
</style>
