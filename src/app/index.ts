import Base from './base/index.vue';
import Test from './test.vue';

const compMap: {
  [key: string]: any;
} = {
  test: Test,
};

type AppName = keyof typeof compMap;

const createApplication = (name: AppName) => {
  const vueApp = createApp(compMap.test);
  const oWrapper = document.createDocumentFragment() as unknown as HTMLElement;
};

export { Base };
