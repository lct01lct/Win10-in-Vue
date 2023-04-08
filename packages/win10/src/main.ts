import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'assets/styles/index.scss';
import Win10UI from './plugin/Win10UI';
import installDirective from 'utils/vue-utils/directives';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Win10UI);

installDirective(app);

app.mount('#app');
