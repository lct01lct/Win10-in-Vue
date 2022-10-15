import { App } from 'vue';

const componentFile = import.meta.glob('./**/index.vue', { eager: true }) as Record<string, any>;

const componentsPool: any[] = [];

for (const comp in componentFile) {
  componentsPool.push(componentFile[comp].default);
}

export default {
  install(app: App, options: any) {
    // 按需加载
    if (options && options.components) {
      options.components.forEach((compName: any) => {
        componentsPool.forEach((comp) => {
          if (compName === comp.name) {
            app.component(comp.name, comp);
          }
        });
      });
    } else {
      componentsPool.forEach((comp) => {
        app.component(comp.name, comp);
      });
    }
  },
};
