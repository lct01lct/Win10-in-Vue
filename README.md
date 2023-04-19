# Win10-in-Vue

体验地址：https://lct01lct.github.io/Win10-in-Vue

# 开发者使用

### 1. 集成 app

##### 1.1 Base

packages `app` 提供一个 `<Base />`，将这个组件包裹在你的 app 应用上，就可以 `Win10` 获取到你的 app 应用的信息

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

##### 1.2 WinApp

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

注意 `win10` 项目是根据 vite 创建出来的，如果 `icon` 不生效，很可能是 `icon` 并不是静态资源，你需要通过 `vite` 的方式进行额外处理

```ts
import Logo from './assets/logo.png';
```

引用: [静态资源处理 | Vite (vitejs.net)](https://www.vitejs.net/guide/assets.html)

##### 1.3 创建在桌面

```ts
import Logo from './assets/logo.png';
const name = '应用名称';

app.createShortcut(Logo, name);
```

### 2. 设置 app 头部

##### 默认的设置

`win10` 会将 `WinApp` 的配置作为 `app-header` 中的 **name** 和 **logo**

##### 通过 props 修改

`<Base />` 组件提供了两个 `props`：`appName` 和 `appIcon`，以便默认可以直接覆盖掉默认 **app** 的 **name** 和 **logo**

##### 通过插槽修改

`<Base />` 组件如果使用了 `#header slot` 将不开放 `appName` 和 `appIcon` 这两个 `props`
