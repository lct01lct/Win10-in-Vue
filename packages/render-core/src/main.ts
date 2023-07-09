import { createApp } from 'vue';
import App from './App.vue';
import { createWinRouter } from 'model-core';
import store from '../../model-core/src/store';
import '@/assets/styles/index.scss';
import Win10UI from './plugin/Win10UI';
import installDirective from 'utils/vue-utils/directives';

const app = createApp(App);

const winRouter = createWinRouter({
  loginComp: () => import('@/view/Login/index.vue'),
  homeComp: () => import('@/view/Home/index.vue'),
});

app.use(winRouter);
app.use(store);
app.use(Win10UI);

installDirective(app);

app.mount('#app');
