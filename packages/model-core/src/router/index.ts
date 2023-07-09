import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

export const createWinRouter = (pagesConfig: {
  loginComp: RouteRecordRaw['component'];
  homeComp: RouteRecordRaw['component'];
}) => {
  // @ts-ignore
  router.addRoute({ path: '/', component: pagesConfig.loginComp, name: 'Login' });
  // @ts-ignore
  router.addRoute({ path: '/home', component: pagesConfig.homeComp, name: 'Home' });

  return router;
};
