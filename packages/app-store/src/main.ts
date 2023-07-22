import 'win/dist/style.css';
import 'element-plus/dist/index.css';
import Template from './template.vue';
import { createApp } from 'vue';
import { WinApp, WinAppConstructorOpt } from 'win';
const customApps = import.meta.glob<{ default: WinAppConstructorOpt }>('./*/index.ts', {
  eager: true,
});

const appPools: WinApp[] = [];
for (const app in customApps) {
  appPools.push(new WinApp(customApps[app].default));
}

const app = createApp(Template, {
  apps: appPools,
});
app.mount('#app');
