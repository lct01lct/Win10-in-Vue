# 1. 介绍

`win10-in-vue` 是一个运行在 **浏览器** 上的 **win10 系统**

体验地址：https://lct01lct.github.io/Win10-in-Vue

win-10-vue 面向开发者提供了完整的 `api` 可以轻松集成 `app` 级别的应用

# 2. 快速制作 app

### 2.1 集成 app

##### 2.1.1 获取代码

首先你需要获取到本项目的代码

运行：

1. 安装 pnpm：`npm i -g pnpm`
2. 安装依赖：`pnpm install`
3. 运行项目： `pnpm dev`

创建开发根目录：

1. 方式 1：本项目使用 `monorepo 架构`，可以在 `packages/` 路径下创建一个文件夹作为你的开发根目录
2. 方式 2：`packages/app` 中拥有一个完整的 vue 项目基础，另外 `packages/app/src` 这个路径下的所有文件享受到 vite 的配置，可以不用创建那些复杂的环境

##### 2.1.2 Base

packages `app` 提供一个 `<Base />`，将这个组件包裹在你的 app 应用上，`<Base />` 暴露两个插槽，分别用于控制你的 app 不同部分的内容

```ts
import { Base } from 'app';
```

```vue
// app.vue

<template>
  <Base>
    <template #header>...app-header</template>
    <template #body>...app-body</template>
  </Base>
</template>
```

##### 2.1.3 WinApp

`win10` 需要获取你的 app 应用信息，所以还需要将 `app.vue` 应用通过 `WinApp` 创建出 app 实例

```ts
import { WinApp } from 'app';
import App from 'app.vue';

const app = new WinApp({
  name: '应用名称',
  comp: App,
  icon: '应用对应的icon',
});
```

注意 `win10` 项目是根据 vite 创建出来的，如果 `icon` 不生效，很可能是 `icon` 并不是静态资源，需要通过 `vite` 的方式进行额外处理

```ts
import Logo from './assets/logo.png';
```

引用：[静态资源处理 | Vite (vitejs.net)](https://www.vitejs.net/guide/assets.html)

##### 2.1.4 桌面上的快件方式

```ts
import Logo from './assets/logo.png';
const name = '应用名称';

app.createShortcut(Logo, name);
```

`createShortcut()` 方法可以在桌面上创建一个快捷方式

### 2.2 设置 app 头部

##### 2.2.1 默认的设置

`win10` 会将 `WinApp` 的配置作为 `app-header` 中的 **name** 和 **logo**

##### 2.2.2 通过 props 修改

`<Base />` 组件提供了两个 `props`：`appName` 和 `appIcon`，以便默认可以直接覆盖掉默认 **app** 的 **name** 和 **logo**

##### 2.2.3 通过插槽修改

`<Base />` 组件如果使用了 `#header slot` 将不开放 `appName` 和 `appIcon` 这两个 `props`
