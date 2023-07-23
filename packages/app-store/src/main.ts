import 'win/dist/style.css';
import 'element-plus/dist/index.css';
import Template from './template.vue';
import { Component, createApp } from 'vue';
import { WinApp, AppOrigin, Base } from 'win';

const customApps = import.meta.glob<{
  default: AppOrigin;
}>('./*/index.ts', {
  eager: true,
});

const appPools: WinApp[] = [];
for (const app in customApps) {
  const exports = customApps[app].default;
  const slots: Record<string, () => Component> = {};

  if (exports.headerComp) slots.header = () => h(exports.headerComp!);
  if (exports.bodyComp) slots.body = () => h(exports.bodyComp!);
  const _app = h(
    Base,
    {
      appIcon: exports.icon,
      appName: exports.name,
    },
    slots
  );
  appPools.push(
    new WinApp({
      comp: _app,
      icon: exports.icon,
      name: exports.name,
    })
  );
}

const app = createApp(Template, {
  apps: appPools,
});
app.mount('#app');
