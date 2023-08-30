# 1. 介绍

`win10-in-vue` 是一个运行在 **浏览器** 上的 **win10 系统**

体验地址：https://lct01lct.github.io/Win10-in-Vue

win-10-vue 面向开发者提供了完整的 `api` 可以轻松集成 `app` 级别的应用

# 2. 快速制作 app

### 2.1 安装 win-app

```
# 选择一个你喜欢的包管理器

# NPM
$ npm install win-app --save

# Yarn
$ yarn add win-app

# pnpm
$ pnpm install win-app
```

### 2.2 快速开始

```ts
import { WinApp } from 'win-app';
import 'win-app/dist/style.css';
import WinAppComponent from './custom-app.vue';

const app = new WinApp({
  comp: WinAppComponent,
  icon: 'custom-icon',
  name: 'custom-app',
});

app.open();
```

简单的组件示例： custom-app.vue

```xml
<script lang="ts" setup>
import { Base } from 'win-app';
</script>

<template>
  <Base app-icon="custom-icon" app-name="custom-name">
    <template #body>custom-app...</template>
  </Base>
</template>
```

### 2.3 集成 app

如果你想让 `Win10-in-Vue` 集成你的自定义 `application`，参见下面的示例：

packages/render-core

```ts
import { WinApp, AppOrigin } from '@/app';

const appOrigin: AppOrigin = {
  comp: WinAppComponent,
  icon: 'custom-icon',
  name: 'custom-app',
};

const app = WinApp.install(appOrigin);

// 创建桌面上的快捷方式
app.createShortcut('icon', 'shortcut-name');
```
