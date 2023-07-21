import 'win/dist/style.css';
import 'element-plus/dist/index.css';
import Template from './template.vue';
import { createApp } from 'vue';
import { WinApp } from 'win';
const customApps = import.meta.glob<{ default: WinApp }>('./*/index.ts', { eager: true });
console.log(customApps);
const appPools: WinApp[] = [];
for (const app in customApps) {
  appPools.push(customApps[app].default);
}

const app = createApp(Template, {
  apps: appPools,
});
app.mount('#app');
