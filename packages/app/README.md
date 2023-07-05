### getAppInstance

获取当前 App 实例

- 类型

```ts
const getAppInstance: <T = WinApp>() => NonNullable<T>;
```



### winApp.open

打开一个 App 窗口

- 类型

```ts
interface WinApp {
  open(info?: InfoByOpened): void;
}
```

- 详细信息

  接受一个参数用来传递给 `WinApp` 实例，其中包括初始化 App 渲染的参数

- 扩展 `infoByOpened` 类型

  当需要传入自定义参数的时候，可以扩展 `class WinApp`，提供更好的类型提示

```ts
import { InfoByOpened, WinApp } from 'app';

class CustomApp extends WinApp {
  declare infoByOpened: InfoByOpened & { props: object };

  constructor(opt: WinAppConstructorOpt) {
    super(opt);
  }
}

new CustomApp().infoByOpened.props; // object
```
